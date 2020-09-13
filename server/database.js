const { Pool } = require('pg');

//extablish variable to hold database url
const pg_uri = "postgres://yiiwwlvc:0C4UAcxuvQ2ITEsZzxRuCFULzmrHC-Ka@lallah.db.elephantsql.com:5432/yiiwwlvc";

//creating a new pool using database uri as connectionString
const pool = new Pool({connectionString: pg_uri});

module.exports = {
  //allows rest of our files to used db.query to call pool.query
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}