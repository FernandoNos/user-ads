module.exports = {
  async up(db, client) {
    return db.collection("products").createIndex({
      "title":1,
      "brand":1
    },{
      unique: true,
      name: "products-title-brand-index"
    })
  },

  async down(db, client) {
    return db.collection("products").dropIndex("products-title-brand-index")
  }
};
