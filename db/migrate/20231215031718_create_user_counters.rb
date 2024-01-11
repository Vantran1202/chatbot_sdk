class CreateUserCounters < ActiveRecord::Migration[7.1]
  def change
    create_table :user_counters do |t|
      t.belongs_to :user, index: false, null: false, foreign_key: true

      t.integer :used_character_counts, default: 0
      t.integer :limited_character_counts, default: 0

      t.integer :used_project_counts, default: 0
      t.integer :limited_project_counts, default: 0

      t.integer :used_request_counts, default: 0
      t.integer :limited_request_counts, default: 0

      t.boolean :has_zalo, default: false
      t.boolean :has_line, default: false
      t.boolean :has_messenger, default: false
      t.boolean :has_chat_integraton, default: false
      t.boolean :has_custom_interface, default: false

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :user_counters, %i[user_id], where: 'deleted_at IS NULL', unique: true
  end
end
