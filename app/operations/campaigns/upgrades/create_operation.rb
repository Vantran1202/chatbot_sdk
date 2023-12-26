# frozen_string_literal: true

class Campaigns::Upgrades::CreateOperation < ApplicationOperation
  attr_reader :stripe_url

  def call
    step_load_plan
    step_create_session_stripe
  end

  private

  attr_reader :plan

  def step_load_plan
    @plan = Plan.find_by!(type: params[:plan_type])
  end

  # See: https://stripe.com/docs/api/checkout/sessions/create
  def step_create_session_stripe
    webhook_url = Rails.application.routes.url_helpers
    session = Stripe::Checkout::Session.create(
      {
        line_items: [
          {
            price: plan.price_id,
            quantity: 1
          }
        ],
        mode: 'payment',
        metadata: { **current_user.as_json.slice('id', 'email', 'fullname') },
        success_url: webhook_url.payment_stripe_statuses_url(
          payload: Plan.encrypted_payment_status(:success, user: current_user, plan:)
        ),
        cancel_url: webhook_url.payment_stripe_statuses_url(
          payload: Plan.encrypted_payment_status(:cancel, user: current_user, plan:)
        )
      }
    )

    @stripe_url = session.url
  end
end
