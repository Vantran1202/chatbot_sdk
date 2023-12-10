# frozen_string_literal: true

class Projects::CampaignsController < ProjectsController
  # [GET] /projects/campaigns
  def index
    operator = Projects::Campaigns::IndexOperation.new(params)
    operator.call
  end
end
