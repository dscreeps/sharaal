'use strict'; // v1.0.0

Game.Memory.dscreeps = Game.Memory.dscreeps || {};

module.exports = () => {
  const memory = Game.Memory.dscreeps;

  updateTicksToLive(memory);
  addNewHostileCreepData(memory);
};

function addNewHostileCreepsData(memory) {
  const hostileCreeps = _.filter(Game.creeps, creep => !creep.my);
  _.each(hostileCreeps, creep => {
    if (memory.hostileCreeps[creep.id]) {
      return;
    }
    memory.hostileCreeps[creep.id] = getHostileCreepData(creep);
  });
}

/*
 * const hostileCreepData = {
 *   body: { 'bodypart': 0, ... },
 *   id: 'id',
 *   owner: undefined || { username: 'username' },
 *   ticksToLive: 0
 * };
 */

function getHostileCreepData(creep) {
  const hostileCreepData = {
    body: transformBody(creep),
    id: creep.id,
    owner: { username: creep.owner.username },
    ticksToLive: creep.ticksToLive
  };
  return hostileCreepData;
}

function transformBody(creep) {
  const body = {};
  _.each(creep.body, bodypart => {
    body[bodypart.type] = body[bodypart.type] || 0;
    ++body[bodypart.type];
  });
  return body;
}

function updateTicksToLive(memory) {
  _.each(memory.hostileCreeps, hostileCreepData => {
    --hostileCreepData.ticksToLive;

  });
  memory.hostileCreeps = _.filter(memory.hostileCreeps, hostileCreepData => hostileCreepData.ticksToLive > 0);
}
