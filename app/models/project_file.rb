class ProjectFile < ApplicationRecord
  acts_as_paranoid

  belongs_to :project
end
