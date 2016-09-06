'use strict'; // v1.0.0

Game.Memory.dscreeps = Game.Memory.dscreeps || {};

module.exports = () => {
  const memory = Game.Memory.dscreeps;

  removeOldCitiesData(memory);
  addNewCitiesData(memory);
};

function addNewCitiesData(memory) {
  const myRooms = _.filter(Game.rooms, room => room.controller && room.controller.my);
  _.each(myRooms, room => {
    if (memory.cities[room.name]) {
      return;
    }
    memory.cities[room.name] = getCityData(room);
  });
}

function getCityData(room) {
  const cityData = {
    exits: Game.map.describeExits(room.name),
    name: room.name
  };
  return cityData;
}

function removeOldCitiesData(memory) {
  memory.cities = _.filter(memory.cities, cityData => {
    const room = Game.rooms[cityData.name];
    return room && room.controller && room.controller.my;
  });
}
