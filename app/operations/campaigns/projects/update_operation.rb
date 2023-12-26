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
      contents: form.content
    )
  end

  def step_update_user_counter
    counter = current_user.user_counter
    counter.used_character_counts += form.content_type.size
    counter.used_project_counts += 1
    counter.save!
  end

  def per_params
    params.permit(:name, :content, :content_type)
  end
end
