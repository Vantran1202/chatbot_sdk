class Embedding::ChunkContent
  attr_reader :project

  def initialize(project)
    @project = project
  end

  def call
    step_chunk_raw_content if project.content_type_text?
    step_chunk_file_content if project.content_type_file?
    step_update_counter
  end

  private

  def step_chunk_raw_content
    create_chunk_project_contents!(project.contents)
  end

  def step_chunk_file_content
    read_file_content
    chunk_file_content
  end

  def step_update_counter
    user_counter    = project.user.user_counter
    total_character = project.project_contents.sum { |prj| prj.contents.size }
    used_token      = user_counter.used_character_counts + total_character

    if used_token > user_counter.limited_character_counts
      conf = Project.config[:reason_failure]
      project.reason_failure.merge!({ conf[:exceed_total_character] => conf[:exceed_total_character] })
      project.save!
    else
      project.update!(total_character:)
      user_counter.increment!(:used_character_counts, total_character)
    end
  end

  def read_file_content
    project.project_files do |project_file|
      raw_content = ''
      project_file.yield_read_file do |paragraph|
        text = paragraph.text
        next if text.squish.blank?

        raw_content += "#{text}\n"
      end

      project_file.update!(contents: raw_content)
    end
  end

  def chunk_file_content
    project.project_files do |project_file|
      create_chunk_project_contents!(project_file.contents)
    end
  end

  def create_chunk_project_contents!(contents, word_limit: 1_500)
    split_contents = Gpt::TikToken.split_text_by_word_limit(contents, word_limit:)
    ActiveRecord::Base.transaction do
      split_contents.each do |chunk_content|
        project.project_contents.create!(contents: chunk_content)
      end
    end
  end
end
