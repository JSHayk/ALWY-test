import connect from "../db/connect.js";

export default async function checkUser(option, value) {
  try {
    const [users] = await connect.query(
      `SELECT * FROM users WHERE ${option} = ?`,
      [value]
    );
    const user = users[0];
    return user;
  } catch (err) {
    throw new Error(err);
  }
}
