# arena_shooter

### About
A Web-based game where players can join by going to the address this website is hosted on
(example: http://its.teknikum.it:9000/arena_shooter/).
Players can join lobbies and play against each other. 

To attack with your figure you use the arrow keys to shoot in that direction.
To move with your figure you use the W,A,S,D keys to move in that direction.

Powered by websocket to allow for communication between backend and connected players.
Users can also chat in the game lobbies.

###Features
- List that displays all users currently connected
- Game lobbies to host multiple games at a time
- Each lobby has a chat
- List that displays all users in a lobby
- Start button in lobbies to start a game for that lobby
- Join button in lobbies to join selected lobby

#####In game
- Items to power up players during the game
- Players has hp, when it reaches 0 player dies and is removed from said game.
- Players can shoot and deal dmg to other players in order to win

###Run
- To be able to run this project on your computer just run `npm i` in the 'webapp' folder and download the declared maven dependencies 
- Backend of project is built with JavaEE 8 so it is recommended to use the same java version.
- Install an application server of your choice (wildfly 18.0.1 is tested and works).

###Documentation
JavaDoc is available under the javadoc folder if you want to read it outside of the code files