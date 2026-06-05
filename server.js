import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || 'birthday_website';
const collectionName = process.env.MONGODB_COLLECTION || 'wishes';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let client;
let wishesCollection;

app.use(cors());
app.use(express.json({ limit: '32kb' }));

app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ message: 'Invalid request body.' });
  }

  return next(error);
});

async function getWishesCollection() {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not configured.');
  }

  if (!client) {
    client = new MongoClient(mongoUri);
    await client.connect();
    wishesCollection = client.db(databaseName).collection(collectionName);
    await wishesCollection.createIndex({ createdAt: -1 });
  }

  return wishesCollection;
}

app.post('/api/wishes', async (req, res) => {
  try {
    const wish = typeof req.body.wish === 'string' ? req.body.wish.trim() : '';

    if (wish.length < 3) {
      return res.status(400).json({ message: 'Please write a wish first.' });
    }

    if (wish.length > 800) {
      return res.status(400).json({ message: 'Wish is too long.' });
    }

    const collection = await getWishesCollection();
    const document = {
      wish,
      createdAt: new Date(),
      source: 'birthday-website',
    };

    const result = await collection.insertOne(document);
    return res.status(201).json({ id: result.insertedId, message: 'Wish saved.' });
  } catch (error) {
    const missingMongo = error.message.includes('MONGODB_URI');
    console.error('Wish save failed:', error.message);

    return res.status(missingMongo ? 503 : 503).json({
      message: missingMongo
        ? 'MongoDB is not configured yet.'
        : 'Could not save the wish right now.',
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Birthday website server running on http://localhost:${port}`);
});
