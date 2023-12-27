class Project < ApplicationRecord
  extend Enumerize
  include Uuid

  acts_as_paranoid

  before_create :generate_uuid

  enumerize :content_type, in: %i[text file], default: :text

  # https://api.rubyonrails.org/classes/ActiveRecord/AttributeMethods/Serialization/ClassMethods.html
  serialize :cfg_interfaces, type: Hash, coder: YAML

  belongs_to :user

  has_many :project_files, dependent: :destroy
end
