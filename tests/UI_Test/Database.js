import { createConnection } from "mysql2";

const getConnection = () => createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "weborder_db",
    insecureAuth: true
});

const connect = (connection) => new Promise((resolve, reject) => {
  connection.connect((error) => {
    if (error) return reject(error);
    console.log('Connected to the database');
    resolve();
  });
});

const queryDatabase = async (query) => {
  const connection = getConnection();
  await connect(connection);
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      connection.end();
      if (error) return reject(error);
      resolve(results);
    });
  });
};

export default { queryDatabase };