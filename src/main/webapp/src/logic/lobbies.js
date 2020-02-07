/**
 * Creates DOM lobbies
 *
 * @param {number}amount Amount of lobbies to create
 */
export function createLobbies(amount) {
    const parentTab = document.getElementById("tabs");
    const parentContainer = document.getElementById("lobbies");
    for (let i = 0; i < amount; i++) {
        const tabButton = document.createElement("button");

        const lobby = document.createElement("div");
        const textAreaDiv = document.createElement("div");
        const inputDiv = document.createElement("div");
        const label = document.createElement("label");
        const areaUsers = document.createElement("textarea");
        const areaChat = document.createElement("textarea");
        const input = document.createElement("input");
        const buttonJoin = document.createElement("button");
        const buttonStart = document.createElement("button");

        tabButton.id = `tabButton:${i}`;
        tabButton.className = "button";
        tabButton.innerHTML = `Lobby #${i}`;
        tabButton.addEventListener("click", () => changeLobbyTab(i, amount));

        lobby.id = `lobbyContainer:${i}`;
        lobby.style.display = "none";

        textAreaDiv.id = "textareas";

        label.className = "label";
        label.htmlFor = `lobby:${i}`;
        label.innerHTML = `Game Lobby: ${i}`;

        areaUsers.id = `lobby:${i}`;
        areaUsers.readOnly = true;
        areaUsers.style.width = "9vw";
        areaUsers.rows = 14;

        areaChat.id = `chat:${i}`;
        areaChat.readOnly = true;
        areaChat.style.width = "20vw";
        areaChat.rows = 22;

        input.id = `input:${i}`;
        input.type = "text";
        input.style.width = "20vw";
        input.placeholder = "Say something...";

        buttonJoin.className = "button";
        buttonJoin.id = `join:${i}`;
        buttonJoin.style.width = "4.5vw";
        buttonJoin.innerHTML = "Join";

        buttonStart.className = "button";
        buttonStart.id = `start:${i}`;
        buttonStart.style.width = "4.5vw";
        buttonStart.innerHTML = "Start";

        textAreaDiv.append(areaChat);
        textAreaDiv.append(areaUsers);
        inputDiv.append(input);
        inputDiv.append(buttonJoin);
        inputDiv.append(buttonStart);

        lobby.append(label);
        lobby.append(textAreaDiv);
        lobby.append(inputDiv);

        parentTab.append(tabButton);
        parentContainer.append(lobby);
    }
}

/**
 *
 * @param {Event}e
 * @param {number}lobbyNumber
 * @param {number}lobbyCount
 */
function changeLobbyTab(lobbyNumber, lobbyCount) {
    for (let i = 0; i < lobbyCount; i++) {
        document.getElementById(`lobbyContainer:${i}`).style.display = "none";
        document.getElementById(`tabButton:${i}`).className = "button";
    }

    document.getElementById(`lobbyContainer:${lobbyNumber}`).style.display = "block";
    document.getElementById(`tabButton:${lobbyNumber}`).className += " activeTab";
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
        const inputField = document.getElementById(`input:${i}`);
        joinButton.disabled = false;
        startButton.disabled = true;
        inputField.disabled = true;
        for (const user of users) {
            if (user.playerNr == playerNr) {
                lobbyId = user.lobby;
            }
            if (user.lobby == lobbyId) {
                usersInLobbyCount++;
            }
        }
        if (lobbyId == i) {
            joinButton.disabled = true;
            inputField.disabled = false;
            if (usersInLobbyCount >= 2) {
                startButton.disabled = false;
            }
        }
    }
}

export function updateLobbyChat({lobby, sender, message}) {
    document.getElementById(`chat:${lobby}`).innerHTML += `${sender}: ${message}\n`;
}