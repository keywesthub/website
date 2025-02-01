const users = [
    {
        "username": "Owner",
        "password": "a",
        "isStaff": true
    },
    {
        "username": "Lisandru",
        "password": "Lisandru123",
        "isStaff": true
    },
    {
        "username": "Kay",
        "password": "Kay123",
        "isStaff": true
    },
    {
        "username": "Robocop",
        "password": "Robocop123",
        "isStaff": true
    },
    {
        "username": "Loligo",
        "password": "Loligo123",
        "isStaff": true
    },
    {
        "username": "Obscurop",
        "password": "Obscurop123",
        "isStaff": true
    },
    {
        "username": "Keshmane",
        "password": "Keshmane123",
        "isStaff": true
    }
];

let joueurs = JSON.parse(localStorage.getItem('joueurs')) || [
    { username: "Adam_777", realname: "Adam Chehelaga", discordid: "1010177745290002514", email: "N/A", adress: "Paris (Ile De France)", ip: "97.112.138.7", cc: "France - Centre", notes: "N/A" },
    { username: "Aviapassion", realname: "Charlie ...", discordid: "1188794852255735841", email: "N/A", adress: "Toulon - Le Cannet Des Maures", ip: "42.771.842.9", cc: "France - Sud", notes: "N/A" },
    { username: "Redouane", realname: "Redouane Amrani", discordid: "951540870262448219", email: "N/A", adress: "Sud - Béziers", ip: "77.152.139.28", cc: "France - Sud", notes: "N/A" },
];


function savePlayers() {
    localStorage.setItem('joueurs', JSON.stringify(joueurs));
}

function populatePlayerSelect() {
    const playerSelect = document.getElementById('playerSelect');
    playerSelect.innerHTML = ''; 

    joueurs.forEach((player, index) => {
        const option = document.createElement('option');
        option.value = index; 
        option.textContent = `${player.username} (${player.realname})`;
        playerSelect.appendChild(option);
    });
}

function populatePlayersList() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    joueurs.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${player.username}</td><td>${player.realname}</td><td>${player.discordid}</td><td>${player.email}</td><td>${player.adress}</td><td>${player.ip}</td><td>${player.cc}</td><td>${player.notes}</td>`;
        playersList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('usernameDisplay')) {
        const username = localStorage.getItem('username');
        const isStaff = localStorage.getItem('isStaff');
        if (username) {
            document.getElementById('usernameDisplay').textContent = username;

            if (isStaff === 'true') {
                populatePlayersList();
                populatePlayerSelect(); 
                document.getElementById('searchInput').addEventListener('input', filterPlayers);
            }
        } else {
            window.location.href = 'index.html';
        }
    }
});

document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    users.push({ username, password, isStaff: false, igName: "" });
    alert("Inscription réussie !");
    window.location.href = 'index.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('username', user.username);
        localStorage.setItem('isStaff', user.isStaff);
        window.location.href = user.isStaff ? 'home.html' : 'index.html';
    } else {
        alert("Identifiant ou mot de passe incorrect");
    }
});

document.getElementById('logoutBtn')?.addEventListener('click', function() {
    localStorage.clear();
    window.location.href = 'index.html';
});

if (document.getElementById('usernameDisplay')) {
    const username = localStorage.getItem('username');
    const isStaff = localStorage.getItem('isStaff');
    if (username) {
        document.getElementById('usernameDisplay').textContent = username;

        if (isStaff === 'true') {
            populatePlayersList();
            document.getElementById('searchInput').addEventListener('input', filterPlayers);
        }
    } else {
        window.location.href = 'index.html';
    }
}

function populatePlayersList() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    joueurs.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${player.username}</td><td>${player.realname}</td><td>${player.discordid}</td><td>${player.email}</td><td>${player.adress}</td><td>${player.ip}</td><td>${player.cc}</td><td>${player.notes}</td>`;
        playersList.appendChild(row);
    });
}

function filterPlayers() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredPlayers = joueurs.filter(player =>
        player.username.toLowerCase().includes(searchInput) || player.username.toLowerCase().includes(searchInput)
    );

    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    filteredPlayers.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${player.username}</td><td>${player.realname}</td><td>${player.discordid}</td><td>${player.email}</td><td>${player.adress}</td><td>${player.ip}</td><td>${player.cc}</td><td>${player.notes}</td>`;
        playersList.appendChild(row);
    });
}

document.getElementById('submitNotesBtn').addEventListener('click', function() {
    const playerSelect = document.getElementById('playerSelect');
    const selectedIndex = playerSelect.value;
    const notesInput = document.getElementById('notesInput').value;

    if (selectedIndex !== "" && notesInput !== "") {
        joueurs[selectedIndex].notes = notesInput; 
        savePlayers(); 
        populatePlayersList(); 
        alert(`Notes de ${joueurs[selectedIndex].username} mises à jour !`);
    } else {
        alert("Veuillez sélectionner un joueur et entrer une note.");
    }
});

document.getElementById('searchDiscordId').addEventListener('click', function() {
    const discordIdInput = document.getElementById('discordid').value.trim();
    const resultConsole = document.getElementById('result-console');

    if (discordIdInput === "") {
        resultConsole.value = "Veuillez entrer un ID Discord.";
        return;
    }

    console.log("Recherche de l'ID Discord:", discordIdInput);

    // Appel pour charger le fichier JSON et rechercher l'ID Discord
    fetch('databases/players.json')  // Chemin vers le fichier JSON
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement du fichier JSON: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Données JSON chargées:", data);
            
            // Recherche dans les données JSON
            const player = data.find(player => player.discordId === discordIdInput);
            
            if (player) {
                resultConsole.value = `Joueur trouvé :\nUsername: ${player.username}\nNotes: ${player.notes}`;
            } else {
                resultConsole.value = "Discord ID non trouvé dans les données.";
            }
        })
        .catch(error => {
            resultConsole.value = "Erreur lors de la recherche dans les fichiers JSON.";
            console.error('Error:', error);
        });
});

