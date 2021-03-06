var mongoose = require('mongoose')

var CampSchema = new mongoose.Schema({
    title: {type:String, defualt:''},
    slug:{type:String, default:''},
    description: {type:String, default:''},
    country: {type:String, default:''},
    url: {type:String, default:''},  
    image: {type:String, default:''},    
    timestamp: {type:Date, default:Date.now}
})

CampSchema.methods.summary = function(){
	var summary = {
        id: this._id,
        title: this.title,
        slug:this.slug,
        url: this.url,
        image: this.image,
        country: this.country,
        description: this.description,
        timestamp: this.timestamp
	}

	return summary
}

module.exports = mongoose.model('CampSchema', CampSchema)
