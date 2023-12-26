# frozen_string_literal: true

class Webhooks::PaymentStripeStatuses::IndexOperation < ApplicationOperation
  attr_reader :order

  def call
    step_load_resources
    step_create_order { return }
    step_add_resources
  end

  private

  attr_reader :user, :plan

  def step_load_resources
    @user = User.find(params[:payload][:user_id])
    @plan = Plan.find(params[:payload][:plan_id])
  end

  def step_create_order
    return yield if params[:payload][:status] != 'success'

    paid_at = DateTime.current
    @order = user.orders.create!(plan_id: plan.id, price: plan.price, paid_at:,
                                 expired_at: paid_at + plan.day_counts.days)
  end

  def step_add_resources
    plan_option = plan.plan_option
    counter     = user.user_counter

    counter.limited_character_counts += plan_option.limited_character_counts
    counter.limited_project_counts   += plan_option.limited_project_counts
    counter.limited_request_counts   += plan_option.limited_request_counts
    counter.has_zalo                  =  plan_option.has_zalo
    counter.has_line                  =  plan_option.has_line
    counter.has_messenger             =  plan_option.has_messenger
    counter.has_chat_integraton       =  plan_option.has_chat_integraton
    counter.has_custom_interface      =  plan_option.has_custom_interface

    counter.save!
  end
end
