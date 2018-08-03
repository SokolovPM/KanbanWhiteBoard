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
    console.log('save', email, name, password)
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
              console.log(`user with  email <${email}> and name <${name}> inserted!`)
              callback({ success: true, message: `user with  email <${email}> and name <${name}> inserted!`})
            })
          } else {
            console.log(`user with email <${email}> and name <${name}> already exists`)
            callback({ success: false, message: `user with email <${email}> and name <${name}> already exists`})
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


}
