const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const Project = require('./models/Project');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBroOptions = new AdminBro({
  resources: [Project],
  rootPath: '/admin'
});

const admin = AdminBroExpress.buildRouter(adminBroOptions);

module.exports = { admin, adminBroOptions };
