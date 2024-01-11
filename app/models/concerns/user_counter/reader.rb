# frozen_string_literal: true

module UserCounter::Reader
  extend ActiveSupport::Concern

  def remain_character_counts
    limited_character_counts - used_character_counts
  end

  def remain_project_counts
    limited_project_counts - used_project_counts
  end

  def remain_request_counts
    limited_request_counts - used_request_counts
  end
end
