# frozen_string_literal: true

class Campaigns::Projects::IndexOperation < ApplicationOperation
  attr_reader :projects

  def call
    step_load_projects
  end

  private

  def step_load_projects
    @projects = current_user.projects
  end
end
