# frozen_string_literal: true

class Campaigns::ProjectsController < ProjectsController
  # [GET] /campaigns/projects
  def index
    operator = Campaigns::Projects::IndexOperation.new(params)
    operator.call
  end

  # [GET] /campaigns/new
  def new
    operator = Campaigns::Projects::IndexOperation.new(params)
    operator.call
  end
end
