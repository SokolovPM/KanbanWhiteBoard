const mongo = require('mongodb')
const monk = require('monk')
const dbLink = require('./config').dbLink
const db = monk(dbLink)

const crypto = require('crypto')

const handleError = function (err) {
  if(err) {
    console.log(err)
    return;
  }
}

module.exports = {
  saveUser: function({ email, name, password}, callback) {
    if (name && password && email) {
      const hex = crypto.createHash('md5').update(password).digest("hex");
      db.collection('users').find({ email }, {},
        (err, data) => {
          if(err) {
            console.log(err)
            return;
          }
          if (data.length === 0) {
            db.collection('users').insert({
              email,
              name,
              password: hex
            }, {}, (err, data) => {
              if(err) {
                console.log(err)
                return;
              }
              callback(true, { email, name })
            })
          } else {
            callback(false, {}, `the user with this email ${email} already exists`)
          }
        }
      )
    }
  },

  saveUserPhoto: function({ email, photo}, callback) {
    db.collection('users').find({ email }, {},
      (err, users) => {
        users[0].photo = photo;
        db.collection('users').update({ _id: users[0]._id}, users[0], {},
          (err, data) => {
            callback(true, { name: users[0].name, email: users[0].email, photo: users[0].photo })
          }
        )
      }
    )
  },

  authUser: function({ email, password }, callback) {
    const hex = crypto.createHash('md5').update(password).digest("hex");
    db.collection('users').find({ email }, {},
      (err, data) => {
        if (err) {
          console.log(err)
        }
        if (data.length > 0 && data[0].password === hex) {
          callback(true, { name: data[0].name, email: data[0].email, photo: data[0].photo })
        } else {
          callback(false, {})
        }
      }
    )
  },

  allUsers: function(callback) {
    db.collection('users').find({}, {}, (err, data) => {
      callback(data)
    })
  },

  saveProject: function(project, callback) {
    if (project._id) {
      this.getProjectById(project._id, (savedProject) => {
        project.tasks = savedProject.tasks || [];
        project.team = savedProject.team || [];
        db.collection('projects').update({ _id: project._id }, project, {},
          () => this.allProjects(project.email, callback)
        )
      })
    } else {
      const { name, email, description} = project
      db.collection('projects').insert( { name, email, description}, {},
        () => this.allProjects(project.email, callback)
      )
    }
  },

  saveProjectWithTask: function(project, callback) {
    db.collection('projects').update({ _id: project._id }, project, {},
      () => this.getProjectById(project._id, callback)
    )
  },

  deleteProject: function(_id, email, callback) {
    db.collection('projects').remove({ _id: _id }, {},
      () => this.allProjects(email, callback)
    )
  },

  allProjects: function(email, callback) {
    db.collection('projects')
      .find({}, '-tasks', function(err, data) {
        const result = data.filter(project => project.email === email || (project.team ? project.team.some(el => el === email) : false))
        callback(result)
      }
    )
  },

  getProject: function(projectName, callback) {
    db.collection('projects')
      .findOne({ name: projectName }, {}, function(err, project) {
        if (project.team && project.team.length > 0) {
          const team = project.team
          db.collection('users').find({ email: {$in: team}}, '-password', (err,team) => {
            callback(project, team)
          })
        } else {
          callback(project)
        }
      }
    )
  },

  getProjectById: function(projectId, callback) {
    db.collection('projects')
      .findOne({ _id: projectId }, {}, function(err, project) {
        if (project.team && project.team.length > 0) {
          const team = project.team
          db.collection('users').find({ email: {$in: team}}, '-password', (err,team) => {
            callback(project, team)
          })
        } else {
          callback(project)
        }
      }
    )
  },

  getAboutInfo: function(callback) {
    Promise.all([
      db.collection('projects').count(),
      db.collection('users').count()
    ]).then(values => {
      callback(values[0], values[1])
    });
  },

}
