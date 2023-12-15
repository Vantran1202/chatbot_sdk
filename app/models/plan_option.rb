class PlanOption < ActiveHash::Base
  include ActiveHash::Associations

  self.data = [
    {
      id: 1,
      plan_id: 1,
      limited_project_counts: 1,
      limited_character_counts: 100_000,
      limited_request_counts: 40,
      has_zalo: false,
      has_line: false,
      has_messenger: false,
      has_chat_integraton: false,
      has_custom_interface: false
    },
    {
      id: 2,
      plan_id: 2,
      limited_project_counts: 5,
      limited_character_counts: 400_000,
      limited_request_counts: 4_000,
      has_zalo: true,
      has_line: true,
      has_messenger: false,
      has_chat_integraton: false,
      has_custom_interface: false
    },
    {
      id: 3,
      plan_id: 3,
      limited_project_counts: 10,
      limited_character_counts: 1_000_000,
      limited_request_counts: 10_000,
      has_zalo: true,
      has_line: true,
      has_messenger: true,
      has_chat_integraton: true,
      has_custom_interface: true
    }
  ]

  belongs_to :plan
end
