# frozen_string_literal: true

class Campaigns::Projects::UpdateOperation < ApplicationOperation
  attr_reader :project, :form_interface

  def call
    step_load_project
    step_build_resource_form
    step_build_form { return }
    ActiveRecord::Base.transaction do
      step_update_project
      step_update_user_counter
    end
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
    project.update!(
      name: form.name,
      content_type: form.content_type,
      contents: form.content,
      total_character: form.total_character
    )
    project.project_files.destroy_all if swap_text_to_file?
  end

  def step_update_user_counter
    counter = current_user.user_counter
    counter.used_character_counts -= project.attribute_before_last_save(:total_character)
    counter.used_character_counts += project.total_character
    counter.save!
  end

  def swap_text_to_file?
    project.attribute_before_last_save(:content_type) == Project.content_type.file &&
      project.content_type == Project.content_type.text
  end

  def per_params
    params[:files] = params[:files]&.compact_blank
    params.permit(:name, :content, :content_type, :total_character, files: [])
  end
end
