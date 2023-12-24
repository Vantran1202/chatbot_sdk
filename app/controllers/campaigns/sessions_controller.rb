# frozen_string_literal: true

class Campaigns::SessionsController < ApplicationController
  # [DELETE] /campaigns/sessions
  def destroy
    operator = Campaigns::Sessions::DestroyOperation.new(params, cookies:)
    operator.call

    redirect_to root_path
  end
end
