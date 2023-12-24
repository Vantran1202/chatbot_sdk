# frozen_string_literal: true

module Helper
  extend ActiveSupport::Concern

  def current_user
    cookie_data = cookies.encrypted[:google_login]
    @current_user ||= User.find_by(email: cookie_data['email'])
  end

  def logged_in?
    current_user.present?
  end

  def verify_authenticate!
    return if current_user.present?

    raise Error::Unauthorized, :unauthorized
  end
end
