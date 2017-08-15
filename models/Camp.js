var mongoose = require('mongoose')

var CampSchema = new mongoose.Schema({
    title: {type:String, defualt:''},
    description: {type:String, default:''},
    url: {type:String, default:''},    
    timestamp: {type:String, default:Date.now}
})

CampSchema.methods.summary = function(){
	var summary = {
        id: this._id,
        title: this.title,
        url: this.url,
        description: this.description,
        timestamp: this.timestamp
	}

	return summary
}

module.exports = mongoose.model('CampSchema', CampSchema)
