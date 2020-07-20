const axios = require('axios');
const fs = require('fs');

//https://superheroapi.com/api/10207739716688559/id

const getHeroInfo = id => axios
    .get(`https://superheroapi.com/api/10207739716688559/${id}`)
    .then(res => res.data)
    .then(res => ({
        id: res.id,
        name: res.name,
        powerstats: res.powerstats,
        appearance: res.appearance,
        publisher: res.biography.publisher
    }));

//Iron Man, Captain America, Hulk, Thor, Black Widow, Hawkeye, Flash, Superman, Wonder Woman, Aquaman, Cyborg, Barman
const heroesIDs = [346, 149, 332, 659, 107, 313, 263, 644, 720, 38, 194, 69];

(async () => {
    const getHeroesPromises = heroesIDs.map(id => getHeroInfo(id));
    const heroes = Promise.all(getHeroesPromises);

    heroes.then(result => fs.writeFileSync('../data/heroes.json', JSON.stringify(result)));
})();
