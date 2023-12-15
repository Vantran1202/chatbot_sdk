delete_sql = 'TRUNCATE TABLE user_counters'
ActiveRecord::Base.connection.execute(delete_sql)
ActiveRecord::Base.connection.execute('ALTER SEQUENCE user_counters_id_seq RESTART WITH 1')

Order.all.each do |order|
  UserCounter.seed do |uc|
    uc.user_id                  = order.user_id

    uc.used_character_counts    = 0
    uc.limited_character_counts = order.plan.plan_option.limited_character_counts

    uc.used_project_counts      = 0
    uc.limited_project_counts   = order.plan.plan_option.limited_project_counts

    uc.used_request_counts      = 0
    uc.limited_request_counts   = order.plan.plan_option.limited_request_counts

    uc.has_zalo                 = order.plan.plan_option.has_zalo
    uc.has_line                 = order.plan.plan_option.has_line
    uc.has_messenger            = order.plan.plan_option.has_messenger
    uc.has_chat_integraton      = order.plan.plan_option.has_chat_integraton
    uc.has_custom_interface     = order.plan.plan_option.has_custom_interface
  end
end
