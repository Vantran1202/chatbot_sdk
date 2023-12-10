# frozen_string_literal: true

module Projects
  module ApplicationHelper
    def h_plan_option(plan_option)
      ico_limited = '<i class="ti fs-6 ms-1 ti-circle-x-filled text-danger"></i>'
      ico_unlimited = '<i class="ti fs-6 ms-1 ti-circle-check-filled" style="color: forestgreen !important"></i>'

      title = plan_option[:title]
      title = ico_limited   if plan_option[:title] == 'limited'
      title = ico_unlimited if plan_option[:title] == 'unlimited'

      {
        title:,
        desc: plan_option[:desc],
        icon: plan_option[:icon]
      }
    end

    def h_plan_price(price)
      price = price.to_f
      html = ''
      if price == 0
        html = "<h2 class='fw-bolder fs-12 ms-2 mb-0'>Free</h2>"
      elsif
        html += "<h5 class='fw-bolder fs-6 mb-0'>$</h5>"
        html += "<h2 class='fw-bolder fs-12 ms-2 mb-0'>#{number_with_delimiter(price, delimiter: '.')}</h2>"
        html += "<span class='ms-2 fs-4 d-flex align-items-center'>/mo</span>"
      else
      end
    end
  end
end
