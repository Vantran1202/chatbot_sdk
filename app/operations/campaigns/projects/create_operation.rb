# frozen_string_literal: true

class Campaigns::Projects::CreateOperation < ApplicationOperation
  def call
    step_build_form { return }
    ActiveRecord::Base.transaction do
      step_create_project
      step_update_user_counter
    end
    step_embedding_job
  end

  private

  attr_reader :project

  def step_build_form
    @form = Campaigns::Projects::CreateForm.new(permit_params.merge(user_counter: current_user.user_counter))
    yield if @form.invalid?
  end

  def step_create_project
    @project = current_user.projects.create!(
      name: form.name,
      content_type: form.content_type,
      contents: form.content,
      status: Project.status.creating
    )

    return if params[:files].blank?

    params[:files].compact_blank.each do |file|
      project.project_files.create!(filename: file)
    end
  end

  def step_update_user_counter
    counter = current_user.user_counter
    counter.used_project_counts += 1
    counter.save!
  end

  def step_embedding_job
    EmbeddingJob.perform_later(project.id)
  end

  def permit_params
    params[:files] = params[:files]&.compact_blank if params[:files].present?
    params.permit(:name, :content, :content_type, :total_character, files: [])
  end
end
