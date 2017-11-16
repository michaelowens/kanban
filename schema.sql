DELETE TABLE IF EXISTS projects;
CREATE TABLE IF NOT EXISTS projects (
    project_id   INTEGER PRIMARY KEY AUTO_INCREMENT,
    project_name TEXT    NOT NULL,
    user_id      INTEGER NOT NULL
);
