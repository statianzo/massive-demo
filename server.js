require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
// Be sure to put DATABASE_URL in a .env file
const connectionString = process.env.DATABASE_URL;

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  const db = req.app.get('db');
  db.getAllInjuries()
    .then(injuries => {
    res.send(injuries);
  });
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;
  if (state) {
    db.getIncidentsByState({state: state}).then(incidents => {
      res.send(incidents);
    });
  }
  else {
    db.getAllIncidents().then(incidents => {
      res.send(incidents);
    });
  }
});

app.post('/incidents', (req, res) => {
  const db = req.app.get('db');
  const incident = req.body;
  db.createIncident(incident).then(result => {
    res.send(result[0]);
  });
});

massive(connectionString).then(connection => {
  app.set('db', connection);
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
});
