var mongoose = require('mongoose')

var ReviewSchema = new mongoose.Schema({
	profile:{type:String},
	camp:{type:String},
	text:{type:String},    
    timestamp: {type:String, default:Date.now}
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