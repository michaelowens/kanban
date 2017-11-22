DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name  TEXT    NOT NULL,
    last_name   TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    password    INTEGER NOT NULL,
    admin       BOOLEAN NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS projects;
CREATE TABLE IF NOT EXISTS projects (
    project_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    project_name TEXT    NOT NULL,
    user_id      INTEGER NOT NULL
);
