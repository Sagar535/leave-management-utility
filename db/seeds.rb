# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
def time_rand
  (10.years.ago.to_date...Time.zone.now.to_date).to_a.sample
end

admin = User.create({first_name: 'Subas', last_name: 'Poudel', email: 'dit.subas@gmail.com', password: 'foobar', role: 'admin', join_date: time_rand})
users = User.create([
    {first_name: 'Sagar', last_name: 'Shah', email: 'dit.sagar@gmail.com', password: 'foobar', role: 'user', join_date: time_rand},
    {first_name: 'Saga', last_name: 'Shah', email: 'dit.saga@gmail.com', password: 'foobar', role: 'user',join_date: time_rand},
    {first_name: 'Sag', last_name: 'Shah', email: 'dit.sag@gmail.com', password: 'foobar', role: 'user',join_date: time_rand},
    {first_name: 'Sa', last_name: 'Shah', email: 'dit.sa@gmail.com', password: 'foobar', role: 'user',join_date: time_rand},
])
