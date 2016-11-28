const router = require('express').Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const multerS3 = require('multer-s3');
const knox = require('knox');
const path = require('path');
const pg = require('pg');

var config = {
  database: 'rho'
};

var pool = new pg.Pool(config);

// accessKeyID and secretAccesKey provided by Amazon S3.
AWS.config.loadFromPath('./config.json');

var s3 = new AWS.S3();

//sets the destination for multer to upload the file as s3
var uploads3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mnhs',
    // Makes file viewable to public, which makes things easier when retrieving
    // file later on.  This is optional, but helpful.
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      // creates a name for the file with the file extention
      // New name will be stored in req.file.key;
      // cb(null, 'small');
      cb(null, Date.now().toString() + path.extname(file.originalname));

    },
  }),
});


// Post request.  Need to send department_id as part of req.body from client
router.post('/', uploads3.single('file'), function (req, res) {
  // On success, send image to SQL DB to store URL.
  var url = 'https://s3.amazonaws.com/mnhs/' + req.file.key;
  var dep = 2
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('error connecting to DB', err);
        res.sendStatus(500);
      }
      client.query('INSERT INTO images (url_image, department_id) VALUES ($1, $2);',
                  [url, dep],
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

//deletes entries from S3 database, then delete from SQL
router.delete('/:key/:id', function (req, res) {
  var key = req.params.key;
  var bucket = 'mnhs';
  var params = {
    Bucket: bucket,
    Key: key,
  };
  s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data);           // successful response
      // On Success, need to delete image url from SQL database as well.
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
    }
  });
});


// Get all URL's in SQL DB for images stored in S3
router.get('/admin', function(req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
      }
      client.query('SELECT * FROM images;', function(err, result) {
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

// Get only Image URL's in SQL DB for specific user department
router.get('/:deptID', function(req, res) {
  var deptID = req.params.deptID;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
      }
      client.query('SELECT * FROM images WHERE department_id = $1;', [deptID],function(err, result) {
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

module.exports = router;
