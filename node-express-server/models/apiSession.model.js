const apiSessionSchema = mongoose.Schema({

    authToken:{
      type:String,
      required:true,
    },
    deviceToken:{
      type:String,
      require:false
    },
    dateCreated:{
      type:Date,
      required:true
    },
    dateExpired:{
      type:Date,
      required:true
    }
    
  });

  module.exports = mongoose.model('apiSession', apiSessionSchema);