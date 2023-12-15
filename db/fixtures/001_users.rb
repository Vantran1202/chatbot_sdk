delete_sql = 'TRUNCATE TABLE users'
ActiveRecord::Base.connection.execute(delete_sql)
ActiveRecord::Base.connection.execute('ALTER SEQUENCE users_id_seq RESTART WITH 1')

users = [
  {
    fullname: 'Le Van 1',
    email: 'levan1@gmail.com',
    avatar: nil
  },
  {
    fullname: 'Le Van 2',
    email: 'levan2@gmail.com',
    avatar: nil
  },
  {
    fullname: 'Le Van 3',
    email: 'levan3@gmail.com',
    avatar: nil
  }
]

users.each do |user|
  User.seed do |u|
    u.fullname = user[:fullname]
    u.email    = user[:email]
    u.avatar   = user[:avatar]
  end
end
