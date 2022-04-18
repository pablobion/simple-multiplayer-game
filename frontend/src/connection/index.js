import { io } from "socket.io-client";
import SocketPlayers from "./socket/players"

export default (self) => {
    //connect with backend
    self.socket = io( 'https://game-pablo.herokuapp.com' );

    SocketPlayers(self); //Players socket connection actions
  
}
