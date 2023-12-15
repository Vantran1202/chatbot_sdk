# frozen_string_literal: true

class Campaigns::UpgradesController < ProjectsController
  # [GET] /projects/upgrades
  def index
    operator = Campaigns::Upgrades::IndexOperation.new(params)
    operator.call

    @plans = operator.plans
  end
end
