'use strict';

const dscreepsMemoryCities = require('./dscreeps-memory-cities');
const dscreepsMemoryHostileCreeps = require('./dscreeps-memory-hostile-creeps');
const dscreepsMemoryRooms = require('./dscreeps-memory-rooms');
const dscreepsMemorySources = require('./dscreeps-memory-sources');

module.exports.loop = () => {
  dscreepsMemoryCities();
  dscreepsMemoryHostileCreeps();
  dscreepsMemoryRooms();
  dscreepsMemorySources();
};
