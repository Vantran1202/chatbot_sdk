class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.belongs_to :user, index: false, null: false
      t.belongs_to :plan, index: false, null: false
      t.float :price
      t.datetime :paid_at, null: false
      t.datetime :expired_at, null: true

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :orders, %i[user_id plan_id expired_at], where: 'deleted_at IS NULL', unique: true
    add_index :orders, %i[plan_id], where: 'deleted_at IS NULL'
  end
end
