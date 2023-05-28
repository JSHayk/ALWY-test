import airtable from "airtable";
import dotenv from "dotenv";
dotenv.config();

// AirTable Configuration.
const Airtable = airtable;
export const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: process.env.AIRTABLE_ENDPOINT_KEY,
}).base("appJ3eiFlMjCUBqOz");

export default Object.freeze({
  app: {
    port: process.env.PORT,
    sync_interval: process.env.SYNC_INTERVAL,
    client_url: process.env.CLIENT_URL,
  },
  airtable: {
    api_key: process.env.AIRTABLE_API_KEY,
    base_token: process.env.AIRTABLE_BASE_TOKEN,
    products_token: process.env.AIRTABLE_PRODUCTS_TOKEN,
  },
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
  },
  token: {
    secret_access_token: process.env.SECRET_ACCESS_TOKEN,
    expires_time: "1h",
  },
  storage: {
    max_age: 30 * 24 * 30 * 30 * 1000,
    httpOnly: true,
  },
});
