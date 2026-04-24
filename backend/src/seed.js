import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Scheme from './models/Scheme.js';
import Medicine from './models/Medicine.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');

    const schemesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/schemes.json'), 'utf-8'));
    await Scheme.deleteMany({});
    await Scheme.insertMany(schemesData);
    console.log('✅ Schemes Seeded Successfully');

    const medicinesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/medicines.json'), 'utf-8'));
    await Medicine.deleteMany({});
    await Medicine.insertMany(medicinesData);
    console.log('Medicines Seeded Successfully');

    console.log('All Data Seeded! Press Ctrl+C to exit.');
    process.exit();
  } catch (error) {
    console.error(' Seeding Failed: ', error);
    process.exit(1);
  }
};

seedDatabase();
