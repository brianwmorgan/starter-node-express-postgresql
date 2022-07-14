const knex = require("../db/connection");

function read(productId) {
  return knex("products").select("*").where({ product_id: productId }).first();
}

function list() {
  return knex("products").select("*");
}

module.exports = {
  read,  
  list,
};
