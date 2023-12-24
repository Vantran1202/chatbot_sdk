# frozen_string_literal: true

class Webhooks::OnetapLoginGooglesController < ApplicationController
  skip_before_action :verify_authenticity_token

  # [GET] webhooks/onetap_login_googles
  def create
    operator = Webhooks::OnetapLoginGoogles::CreateOperation.new(params, cookies:)
    operator.call

    if operator.user.present?
      redirect_to campaign_projects_path, notice: 'Logged in successfully.'
    else
      redirect_to root_path, alert: 'Login failed'
    end
  end
end
