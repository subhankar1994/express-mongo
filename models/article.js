let mongoose = require('mongoose');


//db schema
let articleSchema = new mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	author:{
		type: String,
		required: true
	}
}, {collection: 'article'});

let Article = module.exports = mongoose.model('Article', articleSchema);