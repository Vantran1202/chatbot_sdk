# frozen_string_literal: true

class Sdk::ChatsController < ApplicationController
  layout 'chatbot'

  # [GET] /sdk/chats/:project_uuid
  def show
    operator = Sdk::Chats::ShowOperation.new(params)
    operator.call

    @project = operator.project
  end
end
