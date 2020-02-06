/**
 * Creates DOM lobbies
 *
 * @param {number}amount Amount of lobbies to create
 */
export function createLobbies(amount) {
    const parent = document.getElementById("lobbies");
    for (let i = 0; i < amount; i++) {
        const lobby = document.createElement("div");
        const label = document.createElement("label");
        const textarea = document.createElement("textarea");
        const buttonJoin = document.createElement("button");
        const buttonStart = document.createElement("button");

        lobby.className = "column";

        label.className = "label";
        label.htmlFor = `lobby:${i}`;
        label.innerHTML = `lobby:${i}`;

        textarea.id = `lobby:${i}`;
        textarea.readOnly = true;
        textarea.cols = 18;
        textarea.rows = 8;

        buttonJoin.className = "button";
        buttonJoin.id = `join:${i}`;
        buttonJoin.innerHTML = "Join";

        buttonStart.className = "button";
        buttonStart.id = `start:${i}`;
        buttonStart.innerHTML = "Start";

        lobby.append(label);
        lobby.append(textarea);
        lobby.append(buttonJoin);
        lobby.append(buttonStart);

        parent.append(lobby);
    }
}

/**
 *
 * @param {Array<Object>}users
 * @param {number}lobbyCount
 * @param {number}playerNr
 */
export function updateLobbyStates(users, lobbyCount, playerNr) {
    let lobbyId = 0;
    for (let i = 0; i < lobbyCount; i++) {
        let usersInLobbyCount = 0;
        const joinButton = document.getElementById(`join:${i}`);
        const startButton = document.getElementById(`start:${i}`);
        for (const user of users) {
            if (user.playerNr == playerNr) {
                lobbyId = user.lobby;
            }
            if(user.lobby == i){
                usersInLobbyCount++;
            }
        }
        if(lobbyId == i){
            joinButton.disabled = true;
            if(usersInLobbyCount >= 2)
                startButton.disabled = false;
        } else {
            joinButton.disabled = false;
            startButton.disabled = true;
        }
    }

}