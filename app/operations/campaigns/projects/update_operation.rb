# frozen_string_literal: true

class Campaigns::Projects::UpdateOperation < ApplicationOperation
  def call
    step_load_project
    step_build_form { return }
    step_save_data
  end

  private

  attr_reader :project

  def step_load_project
    @project = Project.find_by!(uuid: params[:uuid])
  end

  def step_build_form
    @form = Campaigns::Projects::UpdateForm.new(per_params)
    yield if @form.invalid?
  end

  def step_save_data
    project.update!(
      name: form.name,
      content_type: form.content_type,
      contents: [form.content]
    )
  end

  def per_params
    params.permit(:name, :content, :content_type)
  end
end
