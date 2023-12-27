# frozen_string_literal: true

module ApplicationHelper
  def error_message_for(attr, form)
    return if form.object.errors.blank?

    content_tag :p, form.object.errors.messages[attr].first, class: 'text-danger mt-1 text-xs'
  rescue StandardError
    nil
  end

  def show_alert_message
    render partial: 'layouts/shared/projects/alert'
  end
end
