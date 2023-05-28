// tables
import productsTable from "../airtable/products.table.js";

let products = [];

function state() {
  return {
    products,
  };
}

async function sync() {
  try {
    products = await productsTable.getRecords();
  } catch (err) {
    throw new Error(err);
  }
}

export default Object.freeze({
  sync,
  state,
});
