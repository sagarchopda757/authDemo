module.exports = {
    commonResponse: {
        type: "object",
        properties: {
            status: {
                type: "boolean"
            },
            message: {
                type: "string"
            },
        }
    },


    customerSignup: {
        required: ["email", "password", "cpassword", "type"],
        type: "object",
        properties: {
            email: {
                type: "string"
            },
            password: {
                type: "string"
            },
            cpassword: {
                type: "string"
            },
            type: {
                type: "integer",
                enum: [1, 2, 3]

            }
        }
    },

    customerSignupResponse: {
        type: "object",
        properties: {
            status: {
                type: "boolean"
            },
            message: {
                type: "string"
            },
            data: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                    type: {
                        type: 'integer'
                    }
                }
            }
        }
    },

    login: {
        required: ["email", "password"],
        type: 'object',
        properties: {
            email: {
                type: 'string',
                format: 'email'
            },
            password: {
                type: 'string'
            }
        }
    },

    loginResponse:{
        type: "object",
        properties: {
            status: {
                type: "boolean"
            },
            message: {
                type: "string"
            },
            data: {
                type: 'string'
            }
        }
    },

    socialLogin: {
        required: ["username","social_id", "type"],
        type: "object",
        properties: {
            username: {
            type: "string"
          },
          email: {
            type: "string",
            format:'email'
          },
          socialId: {
            type: "string"
          },
          type: {
            type: "integer"
          },
        }
      },

      socialLoginResponse: {
        type: "object",
        properties: {
          status: {
            type: "boolean"
          },
          message: {
            type: "string"
          },
          data: {
            type: "string"
          }
    
        }
      },

      meResponse:{
        type: "object",
        properties: {
            status: {
                type: "boolean"
            },
            message: {
                type: "string"
            },
            data: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    },
                    socialId: {
                        type: 'string'
                    },
                    type:{
                        type: 'integer'
                    }
                }
            }
        }
      }
}