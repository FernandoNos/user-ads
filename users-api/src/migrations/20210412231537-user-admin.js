const {v4} = require('uuid')

module.exports = {
  async up(db, client) {
    return db.collection("users").insert({
      "uuid":v4(),
      "name":"admin",
      "email":"admin@admin.com",
      "admin":true,
      created_at: new Date(),
      updated_at: new Date()
    })
  },

  async down(db, client) {
    return db.collection("users").deleteOne({admin:true})
  }
};
