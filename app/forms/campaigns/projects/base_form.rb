class Campaigns::Projects::BaseForm < ApplicationForm
  attribute :user_counter
  attribute :uuid
  attribute :name
  attribute :content_type, default: Project.content_type.text
  attribute :content
  attribute :files
  attribute :total_character, :integer, default: 0

  validates :name, presence: true
  validates :content_type, presence: true

  validate :must_content_presence
  validate :must_valid_character_counts
  validate :must_valid_filetype
  validate :must_valid_filesize

  private

  def must_content_presence
    return if content.present? || files.present?

    errors.add(:content, :blank) if content_type == Project.content_type.text
    errors.add(:files, :blank) if content_type == Project.content_type.file
  end

  def must_valid_character_counts
    total_used = user_counter.used_character_counts + total_character
    return if total_used <= user_counter.limited_character_counts

    errors.add(:base, 'Total used character counts exceeded the limit')
  end

  def must_valid_filetype
    return if files.blank?

    files.each do |file|
      next if Settings.upload_files.content_types.keys.map(&:to_s).include?(file.content_type)

      errors.add(:base, 'File must be a docx or pdf file')
      break
    end
  end

  def must_valid_filesize
    return if files.blank?

    filesize = 0
    files.each { |file| filesize += file.size }
    return if filesize <= Settings.upload_files.max_size.megabytes

    errors.add(:base, "File size must be less than #{Settings.upload_files.max_size}MB")
  end
end
