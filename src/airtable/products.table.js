import config from "../config/config.js";
import airtable from "../lib/airtable.js";
import client from "./client.js";
import invalidArguments from "../helpers/invalidArguments.js";

const { products_token } = config.airtable;

async function getRecords() {
  try {
    const records = await client.getTableByName(products_token);
    const modifyedRecords = records.map((record) => {
      if (Object.keys(record).length !== 0) {
        return modifyRecord(record);
      }
    });
    return modifyedRecords;
  } catch (err) {
    throw new Error(err);
  }
}

function modifyRecord(record) {
  invalidArguments([record]);
  return {
    id: record.get("ID") || null,
    title: record.get("Title") || null,
    price: record.get("Price") || null,
    currency: record.get("Currency") || null,
    picture: airtable.getImage(record.get("Picture")) || null,
  };
}

export default {
  getRecords,
};
