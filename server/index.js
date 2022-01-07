const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const axios = require('axios');
const API_KEY = require('../config/config.js');
const memo = {};
const outfitsMemo = {};

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});

app.get(/products/, (req, res) => {
  // console.log(req.url);
  if (memo[req.path]) {
    res.send(memo[req.path]);
  } else {
    axios({
      url: req.url,
      headers: {
        Authorization: API_KEY.Authorization,
        'Content-Type': 'application/json',
      },
      baseURL: baseURL,
    })
      .then((response) => {
        memo[req.path] = response.data;
        // console.log('API CALLED');
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.get(/qa/, (req, res) => {
  // console.log(req.path + `?product_id=${req.query.product_id}`);
  if (memo[req.path + `?product_id=${req.query.product_id}`]) {
    res.send(memo[req.path + `?product_id=${req.query.product_id}`]);
  } else {
    axios({
      url: req.url,
      headers: {
        Authorization: API_KEY.Authorization,
        'Content-Type': 'application/json',
      },
      baseURL: baseURL,
    })
      .then((response) => {
        memo[req.path + `?product_id=${req.query.product_id}`] = response.data;
        // console.log('API CALLED');
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.put(/qa/, (req, res) => {
  axios({
    url: req.url,
    body: req.body,
    method: 'PUT',
    headers: {
      Authorization: API_KEY.Authorization,
      'Content-Type': 'application/json',
    },
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp',
  })
    .then((response) => {
      axios({
        url: `/qa/questions/?product_id=${req.body.id}`,
        method: 'GET',
        headers: {
          Authorization: API_KEY.Authorization,
          'Content-Type': 'application/json',
        },
        baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp',
      })
        .then((response) => {
          memo[`/qa/questions?product_id=${req.body.id}`] = response.data;
          // console.log('API CALLED');
          res.send(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get(/reviews/, (req, res) => {
  // console.log(req.path + `?product_id=${req.query.product_id}`);
  if (memo[req.path + `?product_id=${req.query.product_id}`]) {
    res.send(memo[req.path + `?product_id=${req.query.product_id}`]);
  } else {
    axios({
      url: req.url,
      headers: {
        Authorization: API_KEY.Authorization,
        'Content-Type': 'application/json',
      },
      baseURL: baseURL,
    })
      .then((response) => {
        memo[req.path + `?product_id=${req.query.product_id}`] = response.data;
        // console.log('API CALLED');;
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.get('/outfits', (req, res) => {
  res.send(outfitsMemo);
});

app.post('/outfits', (req, res) => {
  outfitsMemo[req.body.id] = req.body.id;
  res.send(outfitsMemo);
});

app.delete('/outfits', (req, res) => {
  delete outfitsMemo[req.body.id];
  res.send(outfitsMemo);
});

app.post(/interactions/, (req, res) => {
  axios({
    method: 'post',
    url: req.url,
    headers: {
      Authorization: API_KEY.Authorization,
      'Content-Type': 'application/json',
    },
    data: req.body,
    baseURL: baseURL,
  })
    .then((response) => {
      console.log(response.data);
      res.sendStatus(201);
    })
    .catch((error) => {
      res.send(error);
    });
});
