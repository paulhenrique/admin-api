
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const bcrypt = require('bcrypt');

const User = require('../models/User');

const resources = require('../database/resources');

AdminBro.registerAdapter(AdminBroMongoose);
const options = {
  resources: [...resources],
  locale: {
    translations: {
      labels: {
        Project: 'Projetos Desenvolvidos',
        Team: 'Membros do grupo de Pesquisa',
        University: 'Universidades Parceiras',
        Financiers: 'Instituições Financiadoras'
      }
    }
  },
  rootPath: '/admin'
};

const adminBroOptions = new AdminBro(options);

const admin = AdminBroExpress.buildAuthenticatedRouter(adminBroOptions, {
  authenticate: async (email, password) => {
    try {
      const user = await User.findOne({ email })
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedPassword)
        if (matched) {
          return user
        }
      }
      return false
    } catch (err) {
      console.log(err.message)
    }
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
});

module.exports = { admin }