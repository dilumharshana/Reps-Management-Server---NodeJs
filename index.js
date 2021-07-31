const connection = require("./connection/connection");
const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.json());
app.listen(3000);

connection.connect((err) => {
  !err
    ? console.log("connected to the service")
    : console.log("unnableto connecr !");
});

//get all reps

app.get("/reps", (req, res) => {
  connection.query("SELECT * FROM REPS", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
    if (err) {
      res.send(err);
    }
  });
});

//get dpecfic rep

app.get("/reps/:id", (req, res) => {
  connection.query(
    "Select * from REPS Where RepId = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      }

      if (err) {
        res.send(err);
      }
    }
  );
});

//delete an rep

app.delete("/reps/delete/:id", (req, res) => {
  connection.query(
    "Delete Reps from REPS where RepId = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        console.log("done");
        res.send("Rep Deleted Successfully !");
      }
      if (err) {
        res.send("unnabl to delete");
      }
    }
  );
});

//inserting reps

app.post("/reps", (req, res) => {
  rep = req.body;

  query = "SET @name = ?; SET @phone = ?; CALL insetreps(@name ,@phone);";

  connection.query(query, [rep.RepName, rep.phone], (err, rows, field) => {
    if (err) {
      res.send(err);
    }
    if (!err) {
      res.send("Added rep");
    }
  });
});

//update reps

app.put("/reps/:id", (req, res) => {
  rep = req.body;
  query = ` SET@id =? ; SET@name = ?; SET@phone = ?; CALL updatereps(@id,@name, @phone)`;

  connection.query(
    query,
    [rep.RepId, rep.RepName, rep.phone],
    (err, rows, field) => {
      if (!err) {
        res.send("updated successfully");
      }
      if (err) {
        res.send(err);
      }
    }
  );
});
