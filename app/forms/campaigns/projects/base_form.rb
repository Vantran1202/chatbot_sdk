class Campaigns::Projects::BaseForm < ApplicationForm
  attribute :user_counter
  attribute :uuid
  attribute :name
  attribute :content_type
  attribute :content
  attribute :files

  validates :name, presence: true
  validates :content_type, presence: true
  validates :content, presence: true

  validate :must_available_character_counts
  validate :must_available_project_counts

  private

  def must_available_character_counts
    total_used = user_counter.used_character_counts + content.size
    return if total_used <= user_counter.limited_character_counts

    errors.add(:base, 'Total used character counts exceeded the limit')
  end

  def must_available_project_counts
    total_used = user_counter.used_project_counts + 1
    return if total_used <= user_counter.limited_project_counts

    errors.add(:base, 'Total used project counts exceeded the limit')
  end
end
