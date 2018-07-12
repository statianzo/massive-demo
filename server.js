const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const connectionString = 'postgres://YOUR__CONNECTION__STRING';

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.set('cool', 'jason');

app.get('/', (req, res) => {
  const db = req.app.get('db');
  db.getAllInjuries().then(injuries => {
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

