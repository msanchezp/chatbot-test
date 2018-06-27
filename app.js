require('dotenv').config();
const express = require('express');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const app = express();
const port = 3000;

const assistant = new AssistantV1({
	username: process.env.ASSISTANT_USERNAME,
	password: process.env.ASSISTANT_PASSWORD,
	url: 'https://gateway.watsonplatform.net/assistant/api',
	version: '2018-06-18'
})

app.get('/conversation/:text*?', (req, res) => {
	const { text } = req.params;

	const params = {
		input: { text },
		workspace_id: process.env.WORKSPACE_ID, 
	}

	assistant.message(params, (err, response) => {
		if (err) res.status(500).json(err);

		res.json(response);
	});
});

app.listen(port, () => console.log(`Running on port ${port}`));