const api = require('./routes/api');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const express = require("express");
const server = express();


const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const resources = require('./database/resources');


const User = require('./models/User');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBroOptions = new AdminBro({
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
});

const admin = AdminBroExpress.buildAuthenticatedRouter(adminBroOptions, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email })

    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword)
      if (matched) {
        return user
      }
    }
    return false
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
});

server.use(cors());
server.use(adminBroOptions.options.rootPath, admin)
server.use('/api', api);

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await server.listen(process.env.PORT, () => console.log("Server started"));
}

run();