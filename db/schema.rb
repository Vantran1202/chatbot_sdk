# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_12_15_151631) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "plan_id", null: false
    t.float "price"
    t.datetime "paid_at", null: false
    t.datetime "expired_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_orders_on_plan_id", where: "(deleted_at IS NULL)"
    t.index ["user_id", "plan_id", "expired_at"], name: "index_orders_on_user_id_and_plan_id_and_expired_at", unique: true, where: "(deleted_at IS NULL)"
  end

  create_table "project_files", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.string "filename", null: false
    t.string "filetype", null: false
    t.float "filesize", default: 0.0, null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_files_on_project_id", where: "(deleted_at IS NULL)"
  end

  create_table "projects", force: :cascade do |t|
    t.uuid "uuid", null: false
    t.bigint "user_id"
    t.string "name", null: false
    t.string "content_type", default: "text"
    t.text "contents"
    t.string "cfg_interfaces"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_projects_on_user_id", where: "(deleted_at IS NULL)"
    t.index ["uuid"], name: "index_projects_on_uuid", unique: true, where: "(deleted_at IS NULL)"
  end

  create_table "user_counters", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "used_character_counts", default: 0
    t.integer "limited_character_counts", default: 0
    t.integer "used_project_counts", default: 0
    t.integer "limited_project_counts", default: 0
    t.integer "used_request_counts", default: 0
    t.integer "limited_request_counts", default: 0
    t.boolean "has_zalo", default: false
    t.boolean "has_line", default: false
    t.boolean "has_messenger", default: false
    t.boolean "has_chat_integraton", default: false
    t.boolean "has_custom_interface", default: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_counters_on_user_id", unique: true, where: "(deleted_at IS NULL)"
  end

  create_table "users", force: :cascade do |t|
    t.string "fullname"
    t.string "email"
    t.string "avatar"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true, where: "(deleted_at IS NULL)"
  end

end
