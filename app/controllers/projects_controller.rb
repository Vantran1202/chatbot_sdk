# frozen_string_literal: true

class ProjectsController < ApplicationController
  layout 'projects'
  include Helper
  include Projects::ApplicationHelper

  helper_method :current_user
end
