# frozen_string_literal: true

class Campaigns::Projects::NewOperation < ApplicationOperation
  def call
    step_build_form
  end

  private

  def step_build_form
    @form = Campaigns::Projects::NewForm.new
  end
end
