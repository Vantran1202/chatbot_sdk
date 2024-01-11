class ProjectContent < ApplicationRecord
  acts_as_paranoid

  belongs_to :moduleable, polymorphic: true
end
