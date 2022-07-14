const categoriesService = require("./categories.service");
// require the asyncErrorBoundary file:
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// function list(req, res, next) {
//   categoriesService
//     .list()
//     .then((data) => res.json({ data }))
//     .catch(next);
// }

// modified the above to use async/await as follows: 

// async function list(req, res) {
//   const data = await categoriesService.list();
//   res.json({ data });
// }

// further modified the above to add error handling as follows:

async function list(req, res, next) {
  try {
    const data = await categoriesService.list();
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

// MODULE EXPORT //

// add 'asyncErrorBoundary' to the export:
module.exports = {
  list: asyncErrorBoundary(list),
};
