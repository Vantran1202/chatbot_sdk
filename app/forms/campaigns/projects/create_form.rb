class Campaigns::Projects::CreateForm < Campaigns::Projects::BaseForm
  validate :must_available_project_counts

  private

  def must_available_project_counts
    total_used = user_counter.used_project_counts + 1
    return if total_used <= user_counter.limited_project_counts

    errors.add(:base, 'Total used project counts exceeded the limit')
  end
end
