# frozen_string_literal: true

class ProjectsController < ApplicationController
  layout 'projects'
  include Helper
  include Projects::ApplicationHelper

  helper_method :current_user, :logged_in?

  rescue_from Error::Unauthorized do |_exception|
    render_error_page(status: 403, text: 'Forbidden')
  end

  private

  def render_error_page(status:, text:, template: 'errors/routing')
    respond_to do |format|
      format.json { render json: { errors: [message: "#{status} #{text}"] }, status: }
      format.html { render template:, status:, layout: false }
      format.any  { head status }
    end
  end
end
