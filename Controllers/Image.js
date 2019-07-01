const Clarifai = require('clarifai');


const app = new Clarifai.App({
 apiKey: '663f402a5ed949cb89f701dbf26a0a73'
});

 const handleApiCall = (req, res) => {
  	app.models
    	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    	.then(data => {
      	res.json(data);
    	})
    .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage  = (db) => (req, res) => {
	const  {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch( err => res.status(400).json('Error with entries'));
}

module.exports = {
	handleImage,
	handleApiCall
}