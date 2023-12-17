# frozen_string_literal: true

class Campaigns::Projects::CreateOperation < ApplicationOperation
  def call
    step_build_form { return }
    step_save_data
  end

  private

  def step_build_form
    @form = Campaigns::Projects::CreateForm.new(per_params)
    yield if @form.invalid?
  end

  def step_save_data
    current_user.projects.create!(
      name: form.name,
      content_type: form.content_type,
      contents: form.content
    )
  end

  def per_params
    params.permit(:name, :content, :content_type)
  end
end
