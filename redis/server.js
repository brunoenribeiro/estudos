require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const Redis = require('redis');

const redisClient = Redis.createClient();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/photos', async (req, res) => {
  const albumId = req.query.albumId;
  const redisKey = `photos?albumId=${albumId}`;

  try {
    const photos = await getOrSetCache(redisKey, async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/photos',
        { params: { albumId } }
      );
  
      return data;
    });

    res.json(photos);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
});

app.get('/photos/:id', async (req, res) => {
  const photoId = req.params.id;
  
  const photo = await getOrSetCache(`photos:${photoId}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`
    );

    return data;
  })

  res.json(photo);
});

function getOrSetCache(key, getDataFn) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) reject(error);
      if (data != null) {
        resolve(JSON.parse(data));
        return;
      }

      const freshData = await getDataFn();
      redisClient.setex(key, process.env.REDIS_DEFAULT_EXPIRATION, JSON.stringify(freshData));
      resolve(freshData);
    })
  })
}

app.listen(3000);