# frozen_string_literal: true

class Campaigns::Projects::InterfacesController < ApplicationController
  # [POST] /campaigns/projects/:project_uuid/interfaces
  def create
    operator = Campaigns::Projects::Interfaces::CreateOperation.new(params)
    operator.call

    redirect_to edit_campaign_project_path(params[:project_uuid], tab: 'tab-4'), notice: 'Project updated successfully'
  end
end
