# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Helper

  helper_method :current_user, :logged_in?
end
