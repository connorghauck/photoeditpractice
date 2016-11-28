const router = require('express').Router();
const path = require('path');
const pg = require('pg');

var config = {
  database: 'rho'
};

var pool = new pg.Pool(config);

// Get all info associated with submissions in SQL DB
router.get('/admin', function(req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
      }
      client.query('SELECT * FROM submissions;', function(err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        }
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

// Get all info associated with submissions for a specific dept.
router.get('/:deptID', function(req, res) {
  var deptID = req.params.deptID;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
      }
      client.query('SELECT * FROM submissions WHERE department_id = $1;', [deptID],function(err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        }
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

// Get all info associated with pending, approved, or returned
// submissions for a specific dept.  Can pass '%' as status to get all.
// This can also be sorted on the client side.
router.get('/:status/:deptID/', function(req, res) {
  var status = req.params.status;
  var deptID = req.params.deptID;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
      }
      client.query('SELECT * FROM submissions WHERE department_id like $1 AND status LIKE $2;', [deptID, status],function(err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        }
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

// Post submission to SQL DB.
router.post('/', function (req, res, next) {
  var savedEdit = req.body.savedEdit;
  var status = req.body.status;
  var userID = req.body.userID;
  var deptID = req.body.deptID;
  var imageID = req.body.imageID;
  var brandID = req.body.brandID;
  var adminComment = req.body.adminComment;
  var userComment = req.body.userComment;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        res.sendStatus(500);
      }
      client.query('INSERT INTO submissions (saved_edit, status, user_id, '
                  + 'department_id, image_id, brand_id, admin_comment, '
                  + 'user_comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
                  [savedEdit, status, userID, deptID, imageID, brandID,
                  adminComment, userComment],
                  function (err) {
                    if (err) {
                      console.log('Error inserting into db', err);
                      return res.sendStatus(500);
                    }
                    res.sendStatus(200);
                  });
    } finally {
      done();
    }
  });
});

// Edit submission to SQL DB.
router.put('/', function (req, res, next) {
  var id = req.body.submissionID;
  var status = req.body.status;
  var savedEdit = req.body.savedEdit;
  var brandID = req.body.brandID;
  var adminComment = req.body.adminComment;
  var userComment = req.body.userComment;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        res.sendStatus(500);
      }
      client.query('UPDATE submissions SET saved_edit = $1, status = $2, '
                  + 'brand_id = $3, admin_comment = $4, user_comment = $5 '
                  + 'WHERE id = $6;',
                  [savedEdit, status, brandID, adminComment, userComment, id],
                  function (err) {
                    if (err) {
                      console.log('Error inserting into db', err);
                      return res.sendStatus(500);
                    }
                    res.sendStatus(200);
                  });
    } finally {
      done();
    }
  });
});

//deletes entries from SQL database, not S3
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting with DB: ', err);
        res.sendStatus(500);
      }

      client.query('DELETE FROM submissions WHERE id=$1;', [id],
        function (err, result) {
          if (err) {
            console.log('Error querying DB: ', err);
            return res.sendStatus(500);
          }
          res.sendStatus(204);
          });
    } finally {
      done();
    }
  });
});

module.exports = router;
