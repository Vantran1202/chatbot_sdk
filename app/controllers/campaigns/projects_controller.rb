# frozen_string_literal: true

class Campaigns::ProjectsController < ProjectsController
  # [GET] /campaigns/projects
  def index
    operator = Campaigns::Projects::IndexOperation.new(params, current_user:)
    operator.call

    @projects = operator.projects
  end

  # [GET] /campaigns/projects/new
  def new
    operator = Campaigns::Projects::NewOperation.new(params)
    operator.call

    @form = operator.form
    @form_interface = operator.form_interface
  end

  # [GET] /campaigns/projects/:uuid
  def edit
    operator = Campaigns::Projects::EditOperation.new(params, current_user:)
    operator.call

    @form           = operator.form
    @form_interface = operator.form_interface
    @project        = operator.project
  end

  def create
    operator = Campaigns::Projects::CreateOperation.new(params, current_user:)
    operator.call

    @form = operator.form

    if @form.errors
      flash.now[:alert] = @form.errors[:base][0] if @form.errors[:base].present?
      render :new
    else
      redirect_to campaign_projects_path, notice: 'Project created successfully.'
    end
  end

  # [PUT] /campaigns/projects/:uuid
  def update
    operator = Campaigns::Projects::UpdateOperation.new(params, current_user:)
    operator.call

    @form = operator.form
    @project = operator.project

    if @form.errors
      flash.now[:alert] = @form.errors[:base][0] if @form.errors[:base].present?
      render :edit
    else
      redirect_to edit_campaign_project_path(params[:uuid]), notice: 'Project updated successfully.'
    end
  end

  # [DELETE] /campaigns/projects/:uuid
  def destroy
    operator = Campaigns::Projects::DestroyOperation.new(params, current_user:)
    operator.call

    if operator.project.deleted?
      render json: { message: 'Project deleted successfully.' }, status: :ok
    else
      render json: { error: 'Something went wrong' }, status: :unprocessable_entity
    end
  end
end
