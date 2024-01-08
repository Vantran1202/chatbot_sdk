class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects do |t|
      t.uuid :uuid, null: false
      t.belongs_to :user, index: false, foreign_key: true

      t.string :name, null: false
      t.string :content_type, default: 'text'
      t.integer :total_character, default: 0
      t.text :contents, limit: 10.megabytes # Maximum 100 GB
      t.string :cfg_interfaces
      t.string :status, null: false
      t.string :reason_failure, null: true, default: '{}'
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :projects, %i[uuid], where: 'deleted_at IS NULL', unique: true
    add_index :projects, %i[user_id], where: 'deleted_at IS NULL'
  end
end
