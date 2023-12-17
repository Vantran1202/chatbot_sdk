# frozen_string_literal: true

class Campaigns::Projects::DestroyOperation < ApplicationOperation
  attr_reader :project

  def call
    step_destroy_project
  end

  private

  def step_destroy_project
    @project = current_user.projects.find_by!(uuid: params[:uuid])
    @project.destroy!
  end
end
