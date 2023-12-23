# frozen_string_literal: true

class Campaigns::Projects::Interfaces::CreateOperation < ApplicationOperation
  attr_reader :project

  def call
    step_build_form
    step_load_project
    step_save_config
  end

  private

  def step_build_form
    @form = Campaigns::Projects::Interfaces::CreateForm.new(permit_params)
    @form.valid?
  end

  def step_load_project
    @project = Project.find_by!(uuid: params[:project_uuid])
  end

  def step_save_config
    @project.update!(cfg_interfaces: form.attributes)
  end

  def permit_params
    params.permit(:chatbot_name, :theme_color, :initial_message, :suggest_message)
  end
end
