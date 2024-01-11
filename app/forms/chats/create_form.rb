# frozen_string_literal: true

class Chats::CreateForm < ApplicationForm
  attribute :project_id
  attribute :question
  attribute :histories

  validates :project_id, presence: true
  validates :question, presence: true
end
