# frozen_string_literal: true

class ProjectsController < ApplicationController
  layout 'projects'
  include Helper
  include Error
  include Projects::ApplicationHelper

  before_action :verify_authenticate!

  helper_method :current_user, :logged_in?
end
