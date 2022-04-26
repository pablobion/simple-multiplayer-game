



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
        characters,
    };


    const addPlayerToGridConfigMap = ({id, sprite, x = 3, y = 6}) => {
        const player = {
            id,
            sprite,
            walkingAnimationMapping: 6,
            startPosition: { x, y },
        }
        self.gridEngine.addCharacter(player)
     
     
    }

    //update character position
    const updateCharacterPosition = ({id, x, y}) => {
        self.gridEngine.setPosition(id, {x,y})
    }

    const removePlayerFromGridConfigMap = (playerId) => {
        characters.splice(characters.findIndex(player => player.id === playerId), 1)
    }

  

    return {addPlayerToGridConfigMap, removePlayerFromGridConfigMap, updateCharacterPosition, gridEngineConfig}
}