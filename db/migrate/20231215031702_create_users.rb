class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :fullname
      t.string :email
      t.string :avatar

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :users, %i[email], where: 'deleted_at IS NULL', unique: true
  end
end
