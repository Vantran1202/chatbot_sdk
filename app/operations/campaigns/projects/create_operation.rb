# frozen_string_literal: true

class Campaigns::Projects::CreateOperation < ApplicationOperation
  def call
    step_build_form { return }
    ActiveRecord::Base.transaction do
      step_create_project
      step_update_user_counter
    end
  end

  private

  def step_build_form
    @form = Campaigns::Projects::CreateForm.new(permit_params.merge(user_counter: current_user.user_counter))
    yield if @form.invalid?
  end

  def step_create_project
    current_user.projects.create!(
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

  def permit_params
    params.permit(:name, :content, :content_type)
  end
end
