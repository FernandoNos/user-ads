module.exports = {
  async up(db, client) {
    return db.collection("products").createIndex({
      "uuid":1
    },{
      unique: true,
      name: "products-index"
    })
  },

  async down(db, client) {
    return db.collection("products").dropIndex("products-index")
  }
};
