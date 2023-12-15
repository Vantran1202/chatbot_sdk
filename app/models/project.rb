class Project < ApplicationRecord
  extend Enumerize

  enumerize :content_type, in: %i[text file], default: :text

  # https://api.rubyonrails.org/classes/ActiveRecord/AttributeMethods/Serialization/ClassMethods.html
  serialize :cfg_interfaces, type: Hash, coder: YAML

  belongs_to :user

  has_many :files, dependent: :destroy
end
