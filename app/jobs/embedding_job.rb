class EmbeddingJob < ApplicationJob
  def perform(project_id)
    @project = Project.find(project_id)

    ActiveRecord::Base.transaction do
      Embedding::ChunkContent.new(@project).call
      return if @project.status == Project.status.failed

      Embedding::GenerateVector.new(@project).call
      Embedding::CreateVector.new(@project).call
    end
  rescue StandardError => e
    @project.status = Project.status.failed
    @project.reason_failure.merge!({ Project.config[:reason_failure][:internal_error] => e.message })
    @project.save!
    raise e
  end
end
