const api = require('./routes/api');
const env = require('dotenv').config();
const mongoose = require('mongoose');
// const { admin, adminBroOptions } = require('./admin');

const express = require("express");
const server = express();

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