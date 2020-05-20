// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/pintereach.db3",
    },
    migrations: {
      directory: __dirname + "/data/migrations",
    },
    seeds: {
      directory: __dirname + "/data/seeds",
    },
  },

  staging: {
    client: "sqlite3",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  },

  production: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
