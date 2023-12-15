class Plan < ActiveHash::Base
  include ActiveHash::Associations

  self.data = [
    {
      id: 1, type: :free, name: 'Free', price: 0.0, popular: false,
      image: 'images/projects/pricing-basic.png'
    },
    {
      id: 2, type: :standard, name: 'Standard', price: 39.0, popular: true,
      image: 'images/projects/pricing-standard.png'
    },
    {
      id: 3, type: :premium, name: 'Premium', price: 99.0, popular: false,
      image: 'images/projects/pricing-premium.png', class: 'ti ti-alphabet-greek'
    }
  ]

  has_one :plan_option
end
