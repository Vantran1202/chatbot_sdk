class ProjectFile < ApplicationRecord
  include ProjectFile::Reader
  acts_as_paranoid
  mount_uploader :filename, FileUploader

  belongs_to :project

  has_many :project_contents, as: :moduleable
end
