class EmbeddingJob < ApplicationJob
  def perform(project_id)
    @project = Project.find(project_id)

    ActiveRecord::Base.transaction do
      Embedding::ChunkContent.new(project).call
      return if project.status == Project.status.failed
      if project.project_contents.count == 1 # no need to generate vector for 1 content
        project.update!(status: Project.status.done)
      else
        Embedding::GenerateVector.new(project).call
        Embedding::CreateVector.new(project).call
      end

      delete_reason_failure
    end
  rescue StandardError => e
    project.status = Project.status.failed
    project.reason_failure.merge!({ Project.config[:reason_failure][:internal_error] => e.message })
    project.save!
    raise e
  end

  private

  attr_reader :project

  def delete_reason_failure
    return if project.reason_failure.blank?

    project.update!(reason_failure: nil) unless project.status_failed?
  end
end
