# frozen_string_literal: true

class Webhooks::OnetapLoginGoogles::CreateOperation < ApplicationOperation
  attr_reader :user

  def initialize(params, data = {})
    super
    @cookies = data[:cookies]
  end

  def call
    step_decoded_token
    step_login_user
    step_set_cookies
  end

  private

  attr_reader :decoded_token, :cookies

  def step_decoded_token
    jwt_decode = JWT.decode params[:credential], nil, false
    @decoded_token = jwt_decode[0]
  end

  def step_login_user
    @user = User.find_or_create_by!(email: decoded_token['email']) do |user|
      user.fullname = decoded_token['name']
      user.avatar   = decoded_token['picture']
    end
  end

  def step_set_cookies
    cookies.encrypted[:google_login] =
      { value: { email: user.email, picture: user.avatar, fullname: user.fullname }, expires: 7.days, httponly: true }
  end
end
