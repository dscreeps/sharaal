'use strict'; // v1.0.0

Game.Memory.dscreeps = Game.Memory.dscreeps || {};

module.exports = () => {
  const memory = Game.Memory.dscreeps;

  addNewSourcesData(memory);
};

function addNewSourcesData(memory) {
  _.each(Game.rooms, room => {
    if (memory.sources[room.name]) {
      return;
    }
    const sources = room.find(FIND_SOURCES);
    _.each(sources, source => {
      memory.sources[room.name][source.id] = getSourceData(source);
    });
  });
}

/*
 * const sourceData = {
 *   id: 'id',
 *   harvestPositions: 0
 * };
 */

function getSourceData(source) {
  const sourceData = { id: source.id };

  let harvestPositions = 0;
  const objects = source.room.lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1);
  _.each([source.pos.y - 1, source.pos.y, source.pos.y + 1], y => {
    _.each([source.pos.x - 1, source.pos.x, source.pos.x + 1], x => {
      if (y === source.pos.y && x === source.pos.x) {
        return;
      }
      let foundWall = false;
      _.each(objects[y][x], object => {
        if (object.type === 'terrain' && object.terrain === 'wall') {
          foundWall = true;
        }
      });
      if (!foundWall) {
        ++harvestPositions;
      }
    });
  });
  sourceData.harvestPositions = harvestPositions;

  return sourceData;
}
