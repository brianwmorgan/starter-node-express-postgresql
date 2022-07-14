const knex = require("../db/connection");

// SERVICES FOR THE 'suppliers' TABLE //

function create(supplier) {
  return knex("suppliers")
    .insert(supplier)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(supplier_id) {
    return knex("suppliers").select("*").where({ supplier_id }).first();
  }
  
  function update(updatedSupplier) {
    return knex("suppliers")
      .select("*")
      .where({ supplier_id: updatedSupplier.supplier_id })
      .update(updatedSupplier, "*");
  }

  function destroy(supplier_id) {
    return knex("suppliers").where({ supplier_id }).del();
  }
  
// EXPORT MODULE //

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
