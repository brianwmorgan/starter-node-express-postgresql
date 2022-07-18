const knex = require("../db/connection");
// require the 'mapProperties()' function...
const mapProperties = require("../utils/map-properties");

// define the 'addCategory' configuration object...
const addCategory = mapProperties({
  category_id: "category.category_id",
  category_name: "category.category_name",
  category_description: "category.category_description",
});

// In the above configuration, the values specify the "path" of the property, where '.' is the delimiter.
// '.' is used like '/' or '\' for a path folder delimiter. If a portion of the path doesn't exist, it's created.
// Arrays are created for missing index properties while objects are created for all other missing properties.
// Any property that isn't in the configuration is left unchanged.

// Knex QUERY SERVICES //

// function read(productId) {
//   return knex("products").select("*").where({ product_id: productId }).first();
// }

// modified the above 'read()' to utilize 'join()' as follows...
// ... AND chained 'then()' to incorporate the 'category' object:

function read(product_id) {
  return knex("products as p")
    .join("products_categories as pc", "p.product_id", "pc.product_id")
    .join("categories as c", "pc.category_id", "c.category_id")
    .select("p.*", "c.*")
    .where({ "p.product_id": product_id })
    .first()
    .then(addCategory);
}

function list() {
  return knex("products").select("*");
}

// the query builder method below returns a count of all out-of-stock-products
function listOutOfStockCount() {
  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

// the query below selects the 'supplier_id' column from the 'products' table...
// and returns the min, max, and avg values of the 'product_price' column, grouped by the 'supplier_id' column
function listPriceSummary() {
  return knex("products")
    .select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id");
}

// the query below selects the 'product_sku', 'product_title', and a third special column
// the third column consists of the sum of multiplying the values from two columns...
// ('product_weight_in_lbs' and 'product_quantity_in_stock') from the 'products' table
// the result is then grouped by 'product_title' and 'product_sku'
function listTotalWeightByProduct() {
  return knex("products")
    .select(
      "product_sku",
      "product_title",
      knex.raw(
        "sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs"
      )
    )
    .groupBy("product_title", "product_sku");
}


// EXPORT MODULE

// export all the above methods for use in the controller file
module.exports = {
  read,  
  list,
  listOutOfStockCount,
  listPriceSummary,
  listTotalWeightByProduct,
};
