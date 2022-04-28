var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8')
var sqlConfig1 = {
  // user: 'sa',
  // password: 'Abcd@@123',
  server: 'DIN0BYTE-PC\\MSSQLSERVER2',
  driver: 'msnodesqlv8',
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    // instance: 'MSSQLSERVER2',
    // database: 'School'
  },
  database: 'School'
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Student Manager', page: 'index' });
});

router.get('/api/course', async (req, res) => {
  const connection1 = new sql.ConnectionPool(sqlConfig1).connect().then((pool) => {
    return pool;
  })
  const connectionPool = await connection1;
  var queryString = `SELECT C.CourseID, C.Title, C.Credits, D.Name AS Department FROM Course AS C, Department AS D WHERE C.DepartmentID = D.DepartmentID`
  return await connectionPool.request().query(queryString, (err, data) => {
    // res.send({'data': data.recordsets[0]})
    if (err) console.log(err)
    connectionPool.close()
    // console.log(data)
    res.send(data.recordsets[0]);
  });
});

router.get('/api/course/:id', async (req, res) => {
  const connection1 = new sql.ConnectionPool(sqlConfig1).connect().then((pool) => {
    return pool;
  })
  const connectionPool = await connection1;
  var queryString = `SELECT C.CourseID, C.Title, C.Credits, D.Name AS Department, C.DepartmentID FROM Course AS C, Department AS D WHERE C.DepartmentID = D.DepartmentID AND C.CourseID = '${req.params.id}'`
  return await connectionPool.request().query(queryString, (err, data) => {
    // res.send({'data': data.recordsets[0]})
    if (err) console.log(err)
    connectionPool.close()
    // console.log(data)
    res.send(data.recordsets[0][0]);
  });
});

router.post('/api/course/', async (req, res) => {
  const connection1 = new sql.ConnectionPool(sqlConfig1).connect().then((pool) => {
    return pool;
  })
  const connectionPool = await connection1;
  // console.log(`${req.body.CourseID}, ${req.body.Title}, ${req.body.Credits}, ${req.body.DepartmentID}`)
  var queryString = `INSERT INTO Course VALUES('${req.body.CourseID}', '${req.body.Title}', '${req.body.Credits}', '${req.body.DepartmentID}')`
  return await connectionPool.request().query(queryString, (err, data) => {
    if (err) console.log(err)
    connectionPool.close()
    // res.send('success')
    res.redirect('/')
  })
});

router.put('/api/course/', async (req, res) => {
  const connection1 = new sql.ConnectionPool(sqlConfig1).connect().then((pool) => {
    return pool;
  })
  const connectionPool = await connection1;
  // console.log(`${req.body.CourseID}, ${req.body.Title}, ${req.body.Credits}, ${req.body.DepartmentID}`)
  var queryString = `UPDATE Course SET Title='${req.body.Title}', Credits='${req.body.Credits}', DepartmentID='${req.body.DepartmentID}' WHERE CourseID='${req.body.CourseID}'`
  return await connectionPool.request().query(queryString, (err, data) => {
    if (err) console.log(err)
    connectionPool.close()
    res.send('success')
    // res.redirect('/')
  })
});

router.delete('/api/course/', async (req, res) => {
  const connection1 = new sql.ConnectionPool(sqlConfig1).connect().then((pool) => {
    return pool;
  })
  const connectionPool = await connection1;
  var queryString = `DELETE FROM Course WHERE CourseID='${req.query.CourseID}'`
  return await connectionPool.request().query(queryString, (err, data) => {
    if (err) console.log(err)
    connectionPool.close()
    res.send('success')
    console.log('success')
  })
});



router.get('/api/department/', async (req, res) => {
  const connection1 = new sql.ConnectionPool(sqlConfig1).connect().then((pool) => {
    return pool;
  })
  const connectionPool = await connection1;
  var queryString = `SELECT * FROM Department`
  return await connectionPool.request().query(queryString, (err, data) => {
    if (err) console.log(err)
    connectionPool.close()
    res.send(data.recordsets[0])
  })
})





router.get('/person', function(req, res, next) {
  res.render('person', { 
    title: 'Student Manager',
    page: 'person'
  });
});

router.get('/api/person/', async (req, res) => {
  const connection1 = new sql.ConnectionPool(sqlConfig1).connect().then((pool) => {
    return pool;
  })
  const connectionPool = await connection1;
  var queryString = `SELECT * FROM Person`
  return await connectionPool.request().query(queryString, (err, data) => {
    // res.send({'data': data.recordsets[0]})
    if (err) console.log(err)
    connectionPool.close()
    // console.log(data)
    res.send(data.recordsets[0]);
  });
});

router.get('/department', function(req, res, next) {
  res.render('department', { 
    title: 'Student Manager',
    page: 'department'
  });
});

router.get('/api/department/', async (req, res) => {
  const connection1 = new sql.ConnectionPool(sqlConfig1).connect().then((pool) => {
    return pool;
  })
  const connectionPool = await connection1;
  var queryString = `SELECT * FROM Department`
  return await connectionPool.request().query(queryString, (err, data) => {
    // res.send({'data': data.recordsets[0]})
    if (err) console.log(err)
    connectionPool.close()
    // console.log(data)
    res.send(data.recordsets[0]);
  });
});

module.exports = router;
