# frozen_string_literal: true

class Sdk::Chats::ShowOperation < ApplicationOperation
  attr_reader :project

  def call
    step_load_project
  end

  private

  def step_load_project
    @project = Project.find_by!(uuid: params[:project_uuid])
  end
end
