
const detailsInfo = document.getElementById('details-info');
const allPlaeyes = document.getElementById('all-Details');
document.getElementById('loading-image').style.display = 'none'

const sportsPlayers = () => {
    const inputField = document.getElementById('input-box');
    const inputText = inputField.value;
    inputField.value = '';

    if (inputText == '') {
        document.getElementById('loading-image').style.display = 'block'
        allPlaeyes.innerHTML = '';
        detailsInfo.innerHTML = '';
        image1.style.display = 'none';
        image2.style.display = 'none';
    } else {
        fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputText}`)
            .then(res => res.json())
            .then(data => displayPlayer(data.player))
    }
}
const displayPlayer = players => {
    if (players == null) {
        document.getElementById('loading-image').style.display = 'block'
        allPlaeyes.innerHTML = '';
    } else {
        allPlaeyes.innerHTML = '';
        detailsInfo.innerHTML = '';
        image1.style.display = 'none';
        image2.style.display = 'none';
        document.getElementById('loading-image').style.display = 'none'

        players.forEach(player => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.classList.add('player-style')
            div.innerHTML = `
        <img src="${player.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${player.strPlayer}</h5>
            <h5 class="card-title">${player.strNationality}</h5>
            <p class="card-text">Some quick example text to build on the card title and </p>
            <button class="btn btn-danger">Delete</button>
            <button onclick="playersInfo('${player.idPlayer}')" class="btn btn-success">Details</button>
        </div>
        `;
            allPlaeyes.appendChild(div);

        });
    }
}
const playersInfo = id => {
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`)
        .then(res => res.json())
        .then(data => detailsPlayer(data.players[0]));
}

const image1 = document.getElementById('image1');
image1.style.display = 'none';
const image2 = document.getElementById('image2');
image2.style.display = 'none';
const detailsPlayer = details => {
    if (details.strGender == "Male") {
        image1.style.display = 'block';
        image2.style.display = 'none';
    } else {
        image1.style.display = 'none';
        image2.style.display = 'block';
    }


    detailsInfo.innerHTML = `
    <div class="card">
    <img src="${details.strThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${details.strBirthLocation}</h5>
        <h5 class="card-title">${details.strTeam}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk
            of the card's content.</p>
    </div>
</div>
    `
}