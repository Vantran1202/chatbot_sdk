class Plan < ActiveHash::Base
  include ActiveHash::Associations
  include Plan::Reader

  has_one :plan_option
end
