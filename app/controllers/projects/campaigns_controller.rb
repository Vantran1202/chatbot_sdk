# frozen_string_literal: true

module Projects
  class CampaignsController < ProjectsController
    # [GET] /projects/campaigns
    def index
      operator = Projects::Campaigns::IndexOperation.new(params)
      operator.call
    end

    # [GET] /projects/new
    def new
      operator = Projects::Campaigns::IndexOperation.new(params)
      operator.call
    end
  end
end
