module.exports = {
  async up(db, client) {
    return db.collection("users").createIndex({
      "name":1,
      "email":1
    },{
      unique: true,
      name: "users-index"
    })
  },

  async down(db, client) {
    return db.collection("users").dropIndex("users-index")
  }
};
