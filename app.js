const express = require('express');
const app = express();
const PORT = 5555;

app.get('/', (req, res) => {
	res.json({
		name: 'Tuan Lu'
	})
})

app.listen(PORT, () => {
	console.log('Server start at port: ' + PORT);
})
