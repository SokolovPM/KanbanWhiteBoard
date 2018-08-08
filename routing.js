const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const indexPath = path.join(__dirname, '/public/index.html');

const db = require('./authorization-provider')

module.exports = function(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser())

  app.get('/', function(req, res) {
    res.sendFile(indexPath);
  });

  app.post('/user/auth', function(req, res){
    db.authUser({
        email: req.body.email,
        password: req.body.password
    }, (auth, user) => {
      if (auth) {
        res.cookie('auth', true, { expires: 0 })
        res.cookie('name', user.name, { expires: 0 })
        res.cookie('email', user.email, { expires: 0 })
      }
      res.json({ auth, user })
    });
  });

  app.post('/user/new', function(req, res){
    db.saveUser({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }, (auth, user) => {
      if (auth) {
        res.cookie('auth', true, { expires: 0 })
        res.cookie('name', user.name, { expires: 0 })
        res.cookie('email', user.email, { expires: 0 })
      }
      res.json({ auth, user })
    });
  });

  app.get('/projects', function(req, res) {
    res.sendFile(indexPath);
  });
  app.post('/projects', function(req, res) {
    db.allProjects(req.body.email, (projects) => {
      res.json({ projects })
    })
  });

  app.post('/project/save', (req, res) => {
    db.saveProject({
      _id: req.body._id,
      email: req.body.email,
      name: req.body.name,
      description: req.body.description
    }, (projects) => {
      res.json({ projects })
    })
  })

  app.post('/project/delete', (req, res) => {
    db.deleteProject(
      req.body._id,
      req.body.email,
      (projects) => {
        res.json({ projects })
      }
    )
  })

  app.get('/project/:name', (req, res) => {
    res.sendFile(indexPath);
  })
  app.post('/project/:name', (req, res) => {
    db.getProject(
      req.body.projectName,
      (project) => {
        res.json({ project })
      }
    )
  })
}
