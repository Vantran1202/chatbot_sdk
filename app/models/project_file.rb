class ProjectFile < ApplicationRecord
  acts_as_paranoid
  mount_uploader :filename, FileUploader

  # before_save :store_file_attributes
  belongs_to :project

  private

  def store_file_attributes
    return unless filename

    self.filesize = File.size(file.file)
    self.filetype = file.content_type
  end
end
