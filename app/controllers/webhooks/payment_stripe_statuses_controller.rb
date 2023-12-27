# frozen_string_literal: true

class Webhooks::PaymentStripeStatusesController < ApplicationController
  before_action :verify_stripe_gateway, only: %i[index]

  # [GET] webhooks/payment_stripe_statuses
  def index
    operator = Webhooks::PaymentStripeStatuses::IndexOperation.new(params, current_user:)
    operator.call

    if operator.order.present?
      redirect_to campaign_projects_path, notice: 'You have successfully registered.'
    else
      redirect_to campaign_projects_path, alert: 'You have failed to register.'
    end
  end

  private

  def verify_stripe_gateway
    decrypted = Plan.decrypted_payment_status(params[:payload])
    return raise Error::Unauthorized if decrypted.blank?

    params[:payload] = decrypted
  end
end
