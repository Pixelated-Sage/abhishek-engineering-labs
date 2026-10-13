DROP TABLE IF EXISTS serializable_demo;

CREATE TABLE serializable_demo (
    doctor_id INTEGER PRIMARY KEY,
    on_call BOOLEAN NOT NULL
);

INSERT INTO serializable_demo (doctor_id, on_call)
VALUES
    (1, TRUE),
    (2, TRUE);