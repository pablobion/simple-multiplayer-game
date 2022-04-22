   const Utils = (self) => {

        const findSpritesByPlayerId = ({group, playerId}) => {
            return self[group].getChildren().find(sprite => sprite.playerId === playerId);        
        }

        const destroySpriteByPlayerId = ({group, playerId, allGroups = 'false'}) => {
            const groups = ['playersGroup', 'playersNameGroup']

            allGroups 
            ? groups.forEach(element => self[element].getChildren().find(player => player.playerId === playerId).destroy()) 
            : self[group].getChildren().find(sprite => sprite.playerId === playerId)
        }
    
        return {
            findSpritesByPlayerId,
            destroySpriteByPlayerId
        }
    }
    
    
    module.exports = Utils 
    
