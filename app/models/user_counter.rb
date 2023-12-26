class UserCounter < ApplicationRecord
  include UserCounter::Reader
  acts_as_paranoid

  belongs_to :user
end
