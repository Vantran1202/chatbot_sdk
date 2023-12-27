# frozen_string_literal: true

class Campaigns::Projects::EditOperation < ApplicationOperation
  attr_reader :project, :form_interface

  def call
    step_load_project
    step_build_form
    step_build_resource_form
  end

  private

  def step_load_project
    @project = Project.find_by!(uuid: params[:uuid])
  end

  def step_build_form
    @form              = Campaigns::Projects::EditForm.new
    @form.uuid         = project.uuid
    @form.name         = project.name
    @form.content_type = project.content_type
    @form.content      = project.contents
  end

  def step_build_resource_form
    @form_interface = Campaigns::Projects::Interfaces::NewForm.new(project:)
    @form_interface.valid?
  end
end
