const db = require('../config/connection');
const { User, Data } = require('../models');
const userSeeds = require('./userSeeds.json');
const DataSeeds = require('./DataSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Data.deleteMany({});

    await User.create(userSeeds);
    await Data.create(DataSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
