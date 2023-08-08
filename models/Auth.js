const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true,
      require:true,
      sparse:true
    },
    password:{
        type:String,
        require:true
    },
    type:{
        type:Number,
        required:true,
        enum:[1,2,3]
    },
    socialId:{
        type:String,
        required: function () {
            return this.type === 2 || this.type === 3;
        },
    }
  });
const Auth = mongoose.model('Auth', AuthSchema);
module.exports = Auth;