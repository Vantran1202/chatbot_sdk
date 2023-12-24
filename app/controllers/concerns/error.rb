module Error
  extend ActiveSupport::Concern

  class Unauthorized < StandardError; end

  included do
    rescue_from StandardError do |_exception|
      render_error_page(status: 500, text: 'Internal Server Error', template: 'errors/internal_server')
    end

    rescue_from Error::Unauthorized do |_exception|
      render_error_page(status: 401, text: 'Unauthorized', template: 'errors/unauthorized')
    end

    rescue_from ActiveRecord::RecordNotFound do |_exception|
      render_error_page(status: 404, text: 'Not Found', template: 'errors/not_found')
    end
  end

  private

  def render_error_page(status:, text:, template:)
    respond_to do |format|
      format.json { render json: { errors: [message: "#{status} #{text}"] }, status: }
      format.html { render template:, status:, layout: 'application' }
      format.any  { head status }
    end
  end
end
