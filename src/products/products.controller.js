const productsService = require("./products.service");
// require the asyncErrorBoundary file:
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// VALIDATOR MIDDLEWARE //

// function productExists(req, res, next) {
//   productsService
//     .read(req.params.productId)
//     .then((product) => {
//       if (product) {
//         res.locals.product = product;
//         return next();
//       }
//       next({ status: 404, message: `Product cannot be found.` });
//     })
//     .catch(next);
// }

// modified the above to use async/await as follows:

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

// HTTP METHODS (aka ROUTE HANDLERS) //

function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

// function list(req, res, next) {
//   productsService
//     .list()
//     .then((data) => res.json({ data }))
//     .catch(next);
// }

// modified the above to use async/await as follows:

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

// add a handler for the 'listOutOfStockCount()' method you built in the service file:
async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

// handler for the 'listPriceSummary()' method in the service file:
async function listPriceSummary(req, res, next) {
  res.json({ data: await productsService.listPriceSummary() });
}

// handler for the 'listTotalWeightByProduct()' method in the service file:
async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}

// EXPORT MODULE //

// add 'asyncErrorBoundary' to the export
// add your query builer method handlers to the export
module.exports = {
  read: [asyncErrorBoundary(productExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
