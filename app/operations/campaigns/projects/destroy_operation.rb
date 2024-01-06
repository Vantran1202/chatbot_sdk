# frozen_string_literal: true

class Campaigns::Projects::DestroyOperation < ApplicationOperation
  attr_reader :project

  def call
    ActiveRecord::Base.transaction do
      step_destroy_project
      step_recover_counter
    end
  end

  private

  def step_destroy_project
    @project = current_user.projects.find_by!(uuid: params[:uuid])
    @project.destroy!
  end

  def step_recover_counter
    counter = current_user.user_counter
    counter.used_character_counts -= project.total_character
    counter.used_project_counts -= 1
    counter.save!
  end
end
