# frozen_string_literal: true

module Helper
  extend ActiveSupport::Concern

  def current_user
    @current_user ||= User.find(2)
  end
end
