# frozen_string_literal: true

class Webhooks::PaymentStripeStatuses::IndexOperation < ApplicationOperation
  attr_reader :order

  def call
    step_load_resources
    step_create_order
  end

  private

  attr_reader :user, :plan

  def step_load_resources
    @user = User.find(params[:user_id])
    @plan = Plan.find(params[:plan_id])
  end

  def step_create_order
    @order = user.orders.create!(plan_id: plan.id, price: plan.price, paid_at: DateTime.current)
  end
end
