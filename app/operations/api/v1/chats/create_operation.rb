# frozen_string_literal: true

class Api::V1::Chats::CreateOperation < ApplicationOperation
  def initialize(params, data = {})
    super
    @response = data[:response]
  end

  def call
    step_load_project
    step_set_header
    step_open_stream
    step_close_stream
  end

  private

  attr_reader :response, :project

  def step_load_project
    @project = Project.find_by!(uuid: params[:project_id])
  end

  def step_set_header
    response.headers['Content-Type'] = 'text/event-stream'
  end

  def step_open_stream
    Gpt::Chat.new.stream_chat(
      build_context
    ) do |chunk|
      response.stream.write(chunk.dig('choices', 0, 'delta', 'content'))
    end
  rescue ActionController::Live::ClientDisconnected
    nil
  end

  def step_close_stream
    response.stream.close
  end

  def build_context
    return @build_context if @build_context.present?

    @build_context = [{ 'role' => 'system', 'content' => system_content }]
    @build_context.push(params[:histories].as_json) if params[:histories].present?
    @build_context.push({ 'role' => 'user', 'content' => params[:question] })
    @build_context.flatten!
    @build_context
  end

  def system_content
    "Bạn là trợ lý cho hệ thống. Hãy dựa vào nội dung cung cấp bên dưới và trả lời câu hỏi cho người dùng. Nếu không biết thì hãy trả lời 'Xin lỗi, tôi không biết.'

    ***NỘI DUNG:**
    #{project[:contents]}

    #**TRẢ LỜI:**
    "
  end
end
