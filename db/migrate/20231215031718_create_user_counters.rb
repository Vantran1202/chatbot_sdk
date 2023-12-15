class CreateUserCounters < ActiveRecord::Migration[7.1]
  def change
    create_table :user_counters do |t|
      t.belongs_to :user, index: false, null: false

      t.integer :used_character_counts, default: 0
      t.integer :limited_character_counts, default: 0

      t.integer :used_project_counts, default: 0
      t.integer :limited_project_counts, default: 0

      t.integer :used_request_counts, default: 0
      t.integer :limited_request_counts, default: 0

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :user_counters, %i[user_id], where: 'deleted_at IS NULL', unique: true
  end
end
