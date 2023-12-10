module Projects::ApplicationHelper
  def h_plan_option(plan_option)
    ico_limited = '<i class="ti fs-6 ms-1 ti-circle-x-filled text-danger"></i>'
    ico_unlimited = '<i class="ti fs-6 ms-1 ti-circle-check-filled" style="color: forestgreen !important"></i>'

    title = plan_option[:title]
    title = ico_limited   if plan_option[:title] == 'limited'
    title = ico_unlimited if plan_option[:title] == 'unlimited'

    {
      title: title,
      desc: plan_option[:desc],
      icon: plan_option[:icon]
    }
  end
end
