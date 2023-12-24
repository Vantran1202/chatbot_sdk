# frozen_string_literal: true

class Campaigns::Sessions::DestroyOperation < ApplicationOperation
  def initialize(params, data = {})
    super
    @cookies = data[:cookies]
  end

  def call
    step_clear_cookies
  end

  private

  attr_reader :cookies

  def step_clear_cookies
    cookies.delete Settings.session.cookie_name
  end
end
