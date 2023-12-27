# frozen_string_literal: true

class Campaigns::UpgradesController < ProjectsController
  # [GET] /projects/upgrades
  def index
    operator = Campaigns::Upgrades::IndexOperation.new(params)
    operator.call

    @plans = operator.plans
  end

  # [POST] /projects/upgrades
  def create
    operator = Campaigns::Upgrades::CreateOperation.new(params, current_user:)
    operator.call

    redirect_to operator.stripe_url, status: :see_other, allow_other_host: true
  end
end
