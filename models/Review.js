var mongoose = require('mongoose')

var ReviewSchema = new mongoose.Schema({
	profile:{type:String},
	// profile: {type:mongoose.Schema.Types.Mixed, default:{}}, 
	camp:{type:String},
	text:{type:String},    
    timestamp: {type:Date, default:Date.now}
})

ReviewSchema.methods.summary = function(){
	var summary = {
        id:this._id,
        profile:this.profile,
        camp:this.camp,
        text:this.text,
        timestamp: this.timestamp
	}

	return summary
}

module.exports = mongoose.model('ReviewSchema', ReviewSchema)