
export default (self) => {


    const createMap = () => {
        const cloudCityTilemap = self.make.tilemap({ key: "cloud-city-map" });

        cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
        for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
          const layer = cloudCityTilemap
            .createLayer(i, "Cloud City", 100, 100)
          layer.setDepth(i);
          layer.scale = 3;
        }
    }

    const getMap = () => cloudCityTilemap
   

    return {createMap, getMap}

}
  