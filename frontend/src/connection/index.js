import { io } from "socket.io-client";
import SocketPlayers from "./socket/players.js"

export default (self) => {
    //connect with backend
    const prod = 'https://game-pablo.herokuapp.com';
    const dev = 'http://localhost:3000';
    self.socket = io( dev );
    
    SocketPlayers(self); //Players socket connection actions
  
}
