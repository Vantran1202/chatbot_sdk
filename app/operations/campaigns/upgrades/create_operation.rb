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

  def step_create_session_stripe
    session = Stripe::Checkout::Session.create(
      {
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: plan.name },
              unit_amount: plan.price.to_i
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        metadata: { **current_user.as_json.slice('id', 'email', 'fullname') },
        success_url: Rails.application.routes.url_helpers.payment_stripe_statuses_url(payment_statuss: 'success',
                                                                                      user_id: current_user.id,
                                                                                      plan_id: plan.id),
        cancel_url: Rails.application.routes.url_helpers.payment_stripe_statuses_url(payment_statuss: 'cancel',
                                                                                     user_id: current_user.id,
                                                                                     plan_id: plan.id)
      }
    )

    @stripe_url = session.url
  end
end
