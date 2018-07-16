const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//mongo db connection
mongoose.connect("mongodb://localhost/tutorial");
let db = mongoose.connection;


//db connection success
db.once('open', function(){
	console.log('connected to monodb');
});

//db error meesage
db.on('error', function(err){
	console.log(err);
});

//bring in model
let Article = require('./models/article');

//body parser miidlewire
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//public folder static
app.use(express.static(path.join(__dirname, 'public')));

//pug template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routing index
app.get('/', function(req, res){
	Article.find()
	.then(function(article){
		res.render('index', {
			title: 'me',
			article: article
		});
	});
});


//save data
app.post('/add', function(req, res){
	let article = new Article();
	article.title = req.body.title;
	article.author = req.body.author;
	article.save(function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect('/');
		}

	});
});


//update data
app.post('/edit/:id', function(req, res){
	let article = {};
	article.title = req.body.title;
	article.author = req.body.author;
	let query = {_id: req.params.id};
	Article.update(query, article, function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect('/');
		}

	});
});

//delete data
app.delete('/delete/:id', function(req, res){
	let query = {_id: req.params.id};
	Article.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('success');

	});


});



//add page routing
app.get('/add', function(req, res){
  res.render('add_article');
});


//view single article
app.get('/article/:id', function(req, res){
	Article.findById(req.params.id, function(err, article){
		res.render('article', {
			article: article
		});

	});

});

//edit single article
app.get('/edit/:id', function(req, res){
	Article.findById(req.params.id, function(err, article){
		res.render('edit_article', {
			article: article
		});

	});

});


//create server
app.listen(3000, function(){
	console.log('server started on por 3000...');
});