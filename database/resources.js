
const Project = require('../models/Project');
const User = require('../models/User');
const Team = require('../models/Team');
const Financiers = require('../models/Financiers');
const University = require('../models/University');

const resources = [{
  resource: Project, options: {
    properties: {
      description: { type: 'richtext', isVisible: { edit: true, list: false, show: true, filter: true } },
      shortDescription: { isVisible: { edit: true, list: false, show: true, filter: true } },
      institutions: { isVisible: { edit: true, list: false, show: true, filter: true } },
      participant: { isVisible: { edit: true, list: false, show: true, filter: true } },
      created_at: {
        isVisible: { edit: false, list: false, show: true, filter: true },
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
},
{
  resource: Team,
  options: {
    properties: {
      shortDescription: {
        type: 'string',
        isVisible: {
          list: false, edit: true, filter: true, show: false,
        },
      },
      lattesOrLinkedin: {
        type: 'string',
        isVisible: {
          list: false, edit: true, filter: false, show: false,
        },
      },
    }
  }
},
  Financiers,
  University
];


module.exports = resources;