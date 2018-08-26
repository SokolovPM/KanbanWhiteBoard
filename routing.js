const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const indexPath = path.join(__dirname, '/public/index.html');

const db = require('./authorization-provider')
const sendEmail = require('./mailer');


module.exports = function(app) {
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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
        res.cookie('foto', user.foto, {expires: 0})
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

  app.post('/user/foto', function(req, res){
    const ext = req.body.foto.split(';')[0].match(/jpeg|png|gif/)[0];
    const base64Data = req.body.foto.replace(/^data:image\/\w+;base64,/, "");
    const binaryData = new Buffer(base64Data, 'base64').toString('binary');
    const filename = `public/images/${req.body.name}-${req.body.email}-${new Date().getTime()}.${ext}`
    fs.writeFileSync(path.join(__dirname, filename), binaryData, "binary");
    db.saveUserFoto({
        email: req.body.email,
        foto: filename
    }, (auth, user) => {
      if (auth) {
        res.cookie('auth', true, { expires: 0 })
        res.cookie('name', user.name, { expires: 0 })
        res.cookie('email', user.email, { expires: 0 })
        res.cookie('foto', user.foto, {expires: 0})
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
    db.saveProject(
      req.body.project
      , (projects) => {
      res.json({ projects })
    })
  })
  app.post('/project/:name/save', (req, res) => {
    db.saveProjectWithTask(
      req.body.project,
      (project, team) => {
        res.json({ project, team })
      }
    )
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
      (project, team) => {
        res.json({ project, team })
      }
    )
  })

  app.post('/invite', (req, res) => {
    sendEmail(
      req.body.email,
      `${req.protocol}//${req.hostname}`
    );
    res.end()
  })

}
