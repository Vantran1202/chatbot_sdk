# frozen_string_literal: true

class Campaigns::SessionsController < ApplicationController
  # [DELETE] /campaigns/sessions
  def destroy
    operator = Campaigns::Sessions::DestroyOperation.new(params, cookies:)
    operator.call

    respond_to do |format|
      format.html { redirect_to root_path, status: :see_other }
    end
  end
end
