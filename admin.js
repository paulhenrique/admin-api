const api = require('./routes/api');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const { admin, adminBroOptions } = require('./admin');

const express = require("express");
const server = express();

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const Project = require('./models/Project');
const User = require('./models/User');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBroOptions = new AdminBro({
  resources: [
    {
      resource: Project, options: {
        properties: {
          description: { type: 'richtext' },
          created_at: {
            isVisible: { edit: false, list: true, show: true, filter: true }
          }
        }
      }
    },
    {
      resource: User,
      options: {
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          password: {
            type: 'string',
            isVisible: {
              list: false, edit: true, filter: false, show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                  password: undefined,
                }
              }
              return request
            },
          }
        }
      }
    }
  ],
  locale: {
    translations: {
      labels: {
        Project: 'Projetos Desenvolvidos'
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


server.use(adminBroOptions.options.rootPath, admin)
server.use('/api', api);

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await server.listen(5500, () => console.log("Server started"));
}

run();