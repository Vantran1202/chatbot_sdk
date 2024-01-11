class Embedding::GenerateVector
  attr_reader :project

  def initialize(project)
    @project = project
  end

  def call
    step_generate_vector
  end

  private

  def step_generate_vector
    ActiveRecord::Base.transaction do
      project.project_contents.each do |project_content|
        embedding    = Gpt::Embedding.create(project_content.contents)
        token_counts = embedding['usage']['total_tokens']
        vectors      = embedding['data'][0]['embedding']

        project_content.update!(token_counts:, vectors:)
      end
    end
  end
end
