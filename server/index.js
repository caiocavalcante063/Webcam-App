const imgController = require('./controllers/imgController');

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3001, () => {
  console.log(`Escutando na porta ${process.env.PORT || 3001}`);
});

app.post('/', imgController.create);

app.get('/', imgController.getAll);

app.delete('/', imgController.remove);