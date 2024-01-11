# frozen_string_literal: true

class Campaigns::Projects::UpdateOperation < ApplicationOperation
  attr_reader :project, :form_interface

  def call
    step_load_project
    step_build_resource_form
    step_build_form { return }
    step_update_project
    step_embedding_job
  end

  private

  def step_load_project
    @project = Project.find_by!(uuid: params[:uuid])
  end

  def step_build_form
    @form = Campaigns::Projects::UpdateForm.new(per_params.merge(user_counter: current_user.user_counter))
    yield if @form.invalid?
  end

  def step_build_resource_form
    @form_interface = Campaigns::Projects::Interfaces::NewForm.new(project:)
    @form_interface.valid?
  end

  def step_update_project
    ActiveRecord::Base.transaction do
      project.name         = form.name
      project.content_type = form.content_type
      project.contents     = swap_text_to_file? ? nil : form.content
      project.save!

      project.project_files.destroy_all if swap_file_to_text? || uploaded_file?
      create_project_files! if swap_text_to_file?
    end
  end

  def step_embedding_job
    return unless content_saved_change? || swap_text_to_file? || uploaded_file?

    project.update!(status: Project.status.creating)
    EmbeddingJob.perform_later(project.id)
  end

  def create_project_files!
    params[:files].each do |file|
      project.project_files.create!(filename: file)
    end
  end

  def swap_file_to_text?
    project.attribute_before_last_save(:content_type) == Project.content_type.file &&
      project.content_type == Project.content_type.text
  end

  def swap_text_to_file?
    !swap_file_to_text? && params[:files].present?
  end

  def content_saved_change?
    project.saved_change_to_contents.present?
  end

  def uploaded_file?
    params[:files].present?
  end

  def per_params
    params[:files] = params[:files]&.compact_blank if params[:files].present?
    params.permit(:name, :content, :content_type, :total_character, files: [])
  end
end
