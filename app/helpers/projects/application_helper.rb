# frozen_string_literal: true

module Projects
  module ApplicationHelper
    def h_active_sidebar_form_project(type, current_type)
      current_type ||= 'text'
      'show active' if type == current_type
    end

    def h_plan_option_for_text(used, limited)
      remain = limited - used
      class_text = remain == 0 ? 'text-danger' : 'text-info'
      html = ''
      html += "<h4 class='card-title'>"
      html += "<span class='#{class_text}'>#{number_with_delimiter(remain)}</span>"
      html += '</h4>'
      html
    end

    def h_plan_option_for_icon(is_can)
      cannot = '<i class="ti fs-6 ms-1 ti-circle-x-filled text-danger"></i>'
      can = '<i class="ti fs-6 ms-1 ti-circle-check-filled" style="color: forestgreen"></i>'
      return can if is_can

      cannot
    end

    def h_plan_price(price)
      price = price.to_f
      html = ''
      if price == 0
        html = "<h2 class='fw-bolder fs-12 ms-2 mb-0'>Free</h2>"
      elsif html += "<h5 class='fw-bolder fs-6 mb-0'>$</h5>"
        html += "<h2 class='fw-bolder fs-12 ms-2 mb-0'>#{number_with_delimiter(price, delimiter: '.')}</h2>"
        html += "<span class='ms-2 fs-4 d-flex align-items-center'>/mo</span>"
      end
    end

    def h_disable_btn_upgrade_plan(plan)
      current_plan = current_user.current_order&.plan
      if current_plan.blank?
        button_to 'Subscribe', campaign_upgrades_path(plan_type: plan.type),
                  class: 'btn btn-primary fw-bolder rounded-2 py-6 w-100 text-capitalize', data: { turbo: false }
      elsif current_plan.id == plan.id
        button_to 'In Used', campaign_upgrades_path(plan_type: plan.type),
                  class: 'btn btn-warning fw-bolder rounded-2 py-6 w-100 text-capitalize text-white disabled', data: { turbo: false }
      elsif plan.level < current_plan.level
        button_to 'Subscribe', campaign_upgrades_path(plan_type: plan.type),
                  class: 'btn btn-secondary fw-bolder rounded-2 py-6 w-100 text-capitalize text-white disabled', data: { turbo: false }
      else
        button_to 'Subscribe', campaign_upgrades_path(plan_type: plan.type),
                  class: 'btn btn-primary fw-bolder rounded-2 py-6 w-100 text-capitalize', data: { turbo: false }
      end
    end
  end
end
