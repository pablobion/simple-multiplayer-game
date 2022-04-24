

export default (self) => {
    
    const characters = [
        // {
        //     id: "player",
        //     sprite: playerSprite,
        //     walkingAnimationMapping: 6,
        //     startPosition: { x: 8, y: 12 },
        // },
    ]

    const gridEngineConfig = {
        characters
      };

    const addPlayerToGridConfigMap = ({id, sprite}) => {
        characters.push({
            id,
            sprite,
            walkingAnimationMapping: 6,
            startPosition: { x: 8, y: 8 },
        })
    }

    const removePlayerFromGridConfigMap = (playerId) => {
        characters.splice(characters.findIndex(player => player.id === playerId), 1)
    }

  

    return {addPlayerToGridConfigMap, removePlayerFromGridConfigMap, gridEngineConfig}
}