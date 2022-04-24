import Context from '../../context/players'

export default (self) => {
  const context = Context(self);

  const cloudCityTilemap = self.make.tilemap({ key: "cloud-city-map" });
  cloudCityTilemap.addTilesetImage("Cloud City", "tiles");

  const createMap = () => {
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap
        .createLayer(i, "Cloud City", 100, 100)
      layer.setDepth(i);
      layer.scale = 3;
    }
  }

  console.log(context.gridEngineConfig)

  //self.gridEngine.create(cloudCityTilemap, context.gridEngineConfig);
  
  return {createMap}

}
  