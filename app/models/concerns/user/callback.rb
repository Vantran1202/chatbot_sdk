# frozen_string_literal: true

module User::Callback
  extend ActiveSupport::Concern

  included do
    after_create :create_plan_resources
  end

  private

  def create_plan_resources
    plan = Plan.package_free
    create_user_counter!(
      used_character_counts: 0,
      limited_character_counts: plan.plan_option.limited_character_counts,

      used_project_counts: 0,
      limited_project_counts: plan.plan_option.limited_project_counts,

      used_request_counts: 0,
      limited_request_counts: plan.plan_option.limited_request_counts,

      has_zalo: plan.plan_option.has_zalo,
      has_line: plan.plan_option.has_line,
      has_messenger: plan.plan_option.has_messenger,
      has_chat_integraton: plan.plan_option.has_chat_integraton,
      has_custom_interface: plan.plan_option.has_custom_interface
    )
  end
end
