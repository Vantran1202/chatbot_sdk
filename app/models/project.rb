class Project < ApplicationRecord
  serialize :cfg_interfaces, Hash

  belongs_to :user

  has_many :files, dependent: :destroy
end
