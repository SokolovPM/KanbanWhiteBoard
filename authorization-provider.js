const mongo = require('mongodb')
const monk = require('monk')
const db = monk('localhost:27017/canban')

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
            callback(false, { email, name })
          }
        }
      )
    }
  },

  authUser: function({ email, password }, callback) {
    const hex = crypto.createHash('md5').update(password).digest("hex");
    db.collection('users').find({ email }, {},
      (err, data) => {
        if (err) {
          console.log(err)
        }
        if (data.length > 0 && data[0].password === hex) {
          callback(true, { name: data[0].name, email: data[0].email })
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
      () => this.getProject(project.name, callback)
    )
  },

  deleteProject: function(_id, email, callback) {
    db.collection('projects').remove({ _id: _id }, {},
      () => this.allProjects(email, callback)
    )
  },

  allProjects: function(email, callback) {
    db.collection('projects')
      .find({ email }, {}, function(err, data) {
        const result = data.map(({ name, email, description, _id }) => ({ name, email, description, _id }))
        callback(result)
      }
    )
  },

  getProject: function(projectName, callback) {
    db.collection('projects')
      .findOne({ name: projectName }, {}, function(err, project) {
        callback(project)
      }
    )
  },

  getProjectById: function(projectId, callback) {
    db.collection('projects')
      .findOne({ _id: projectId }, {}, function(err, project) {
        callback(project)
      }
    )
  },

}
