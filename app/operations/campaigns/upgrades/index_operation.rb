# frozen_string_literal: true

class Campaigns::Upgrades::IndexOperation < ApplicationOperation
  attr_reader :plans

  def call
    step_load_plans
  end

  private

  def step_load_plans
    @plans = Plan.all
  end
end
