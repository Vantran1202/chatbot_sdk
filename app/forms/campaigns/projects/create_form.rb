class Campaigns::Projects::CreateForm < Campaigns::Projects::BaseForm
  validate :must_available_project_counts
end
