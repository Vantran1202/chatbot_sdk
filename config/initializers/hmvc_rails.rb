# frozen_string_literal: true

if Rails.env.development?
  Hmvc::Rails.configure do |config|
    # The controller files's parent class of controller. Default is ApplicationController
    # config.parent_controller = "ApplicationController"

    # Method when creating the controller files. Default is %w[index show new create edit update destroy]
    # config.action = %w[index show new create edit update destroy]

    # Method when creating the view files. Default is %w[index show new edit]
    # config.view = %w[index show new edit]

    # The form files's parent class. Default is ApplicationForm
    # config.parent_form = "ApplicationForm"

    # Method when creating the form files. Default is %w[new create edit update]
    # config.form = %w[new create edit update]

    # The operation files's parent class. Default is ApplicationOperation
    # config.parent_operation = "ApplicationOperation"

    # Save author name and timestamp to file. Default is true
    config.file_traces = false
  end
end
