class User < ApplicationRecord
  has_one :user_counters, dependent: :destroy

  has_many :projects, dependent: :destroy
end
