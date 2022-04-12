import { io } from "socket.io-client";
import SocketPlayers from "./socket/players"

export default (self) => {
    //connect with backend
    self.socket = io( 'http://localhost:3000' );

    SocketPlayers(self); //Players socket connection actions
  
}
