# frozen_string_literal: true

class Sdk::ChatsController < ApplicationController
  layout 'chatbot'
  before_action :allow_iframe_requests

  # [GET] /sdk/chats/:project_uuid
  def show
    operator = Sdk::Chats::ShowOperation.new(params)
    operator.call

    @project = operator.project
  end

  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
  end
end
