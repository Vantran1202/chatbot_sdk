# frozen_string_literal: true

class ApplicationOperation
  attr_reader :params, :current_user, :form

  def initialize(params, data = {})
    @params       = params
    @current_user = data[:current_user]
  end
end
