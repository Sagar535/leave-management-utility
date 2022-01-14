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

ActiveRecord::Schema.define(version: 2022_01_14_043951) do
ActiveRecord::Schema.define(version: 2022_01_14_050849) do
ActiveRecord::Schema.define(version: 2022_01_14_055853) do
ActiveRecord::Schema.define(version: 2022_01_14_062133) do
ActiveRecord::Schema.define(version: 2022_01_14_073738) do
ActiveRecord::Schema.define(version: 2022_01_14_105033) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "leave_requests", force: :cascade do |t|
    t.string "title"
    t.date "start_date"
    t.date "end_date"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.integer "leave_type"
    t.integer "approver_id"
  end

  create_table "replies", force: :cascade do |t|
    t.integer "leave_request_id"
    t.string "reason"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["leave_request_id"], name: "index_replies_on_leave_request_id"
  end

  create_table "salaries", force: :cascade do |t|
    t.bigint "user_id"
    t.boolean "ssf_enrolled"
    t.boolean "life_ensured"
    t.decimal "basic_salary"
    t.decimal "commitment_bonus"
    t.date "from_date"
    t.date "to_date"
    t.boolean "active"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id", "active"], name: "index_salaries_on_user_id_and_active", unique: true, where: "active"
    t.index ["user_id"], name: "index_salaries_on_user_id"
  end

  create_table "salary_settings", force: :cascade do |t|
    t.decimal "ssf_office"
    t.decimal "ssf_employee"
    t.decimal "life_insurance_max"
    t.decimal "ssf_tax_exemption_rate"
    t.decimal "ssf_tax_exemption_max"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tax_rule_items", force: :cascade do |t|
    t.bigint "tax_rule_id"
    t.decimal "amount_from"
    t.decimal "amount_to"
    t.decimal "rate"
    t.string "tax_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tax_rule_id"], name: "index_tax_rule_items_on_tax_rule_id"
  end

  create_table "tax_rules", force: :cascade do |t|
    t.bigint "salary_setting_id"
    t.date "from_date"
    t.date "to_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["salary_setting_id"], name: "index_tax_rules_on_salary_setting_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role", default: 0
    t.string "first_name"
    t.string "last_name"
    t.bigint "salary_setting_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["salary_setting_id"], name: "index_users_on_salary_setting_id"
  end

end
