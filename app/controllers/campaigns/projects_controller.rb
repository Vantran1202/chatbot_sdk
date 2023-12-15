# frozen_string_literal: true

class Campaigns::ProjectsController < ProjectsController
  # [GET] /campaigns/projects
  def index
    operator = Campaigns::Projects::IndexOperation.new(params)
    operator.call
  end

  # [GET] /campaigns/projects/new
  def new
    operator = Campaigns::Projects::NewOperation.new(params)
    operator.call

    @form = operator.form
  end

  # [POST] /campaigns/projects
  def create
    operator = Campaigns::Projects::CreateOperation.new(params)
    operator.call

    @form = operator.form

    if @form.invalid?
      render :new
    else
      redirect_to campaigns_projects_path, notice: :success
    end
  end
end
