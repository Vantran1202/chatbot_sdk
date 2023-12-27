delete_sql = 'TRUNCATE TABLE orders'
ActiveRecord::Base.connection.execute(delete_sql)
ActiveRecord::Base.connection.execute('ALTER SEQUENCE orders_id_seq RESTART WITH 1')

data = User.all.zip(Plan.all)

data.each do |datum|
  user = datum.first
  plan = datum.last
  Order.seed do |order|
    order.user_id       = user.id
    order.plan_id       = plan.id
    order.price         = plan.price
    order.payment_token = '333'
    order.paid_at       = DateTime.current
  end
end
