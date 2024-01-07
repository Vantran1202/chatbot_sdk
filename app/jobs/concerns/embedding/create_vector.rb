class Embedding::CreateVector
  attr_reader :project

  def initialize(project)
    @project = project
  end

  def call
    step_create_index
    step_create_vector
    step_update_project
  end

  private

  def step_create_index
    return project.delete_all_vector if project.describe_index.present?

    project.create_index
  end

  def step_create_vector
    project.create_vector(vectors)
  end

  def step_update_project
    project.update!(status: Project.status.done)
  end

  def vectors
    project.project_contents.map do |project_content|
      {
        id: project.id.to_s,
        metadata: { contents: project_content.contents },
        values: eval(project_content.vectors)
      }
    end
  end
end
