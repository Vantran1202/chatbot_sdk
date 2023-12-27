# frozen_string_literal: true

class Api::V1::ChatsController < ApiController
  include ActionController::Live

  # [POST] api/v1/chats
  def create
    operator = Api::V1::Chats::CreateOperation.new(params, params:, response:)
    operator.call
  end
end
