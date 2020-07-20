String.prototype.replaceAll = function (from, to) { return this.split(from).join(to); };
const responseToJson = response => response.json();

const filterByPublisher = publisher => arr => arr.filter(item => item.publisher === publisher);


//POWERSTATS DATAPREP
const powerstatsLabels = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];
const powerstatsAvengersGraphElement = document.getElementById('avengers-powerstats');
const powerstatsJusticeLeagueGraphElement = document.getElementById('justiceleague-powerstats');

const powerstatsDatasetTemplate = (hero, chartBackgroundColor, chartBorderColor) => {
    const obj = {
        label: hero.name,
        data: [hero.powerstats.intelligence, hero.powerstats.strength, hero.powerstats.speed, hero.powerstats.durability, hero.powerstats.power, hero.powerstats.combat],
        backgroundColor: chartBackgroundColor,
        borderColor: chartBorderColor
    };

    return obj;
};


//CREATE RADAR CHART FUNCTION 
const createRadarChart = (element, chartType, chartlabels, datasets) => {
    new Chart(element, {
        type: chartType,
        data: {
            labels: chartlabels,
            datasets: datasets
        }
    });
};


// COLORS, FETCH AND CREATE RADAR WITH POWERSTATS
const avengersBackgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(7, 0, 209, 0.2)',
    'rgba(39, 204, 0, 0.2)',
    'rgba(248, 231, 0, 0.2)',
    'rgba(112, 112, 112, 0.2)',
    'rgba(216, 101, 0, 0.2)'
];
const avengersBorderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(7, 0, 209, 1)',
    'rgba(39, 204, 0, 1)',
    'rgba(248, 231, 0, 1)',
    'rgba(112, 112, 112, 1)',
    'rgba(216, 101, 0, 1)'
];

const justiceleagueBackgroundColor = [
    'rgba(255, 0, 0, 0.2)',
    'rgba(0, 52, 157, 0.2)',
    'rgba(255, 230, 0, 0.2)',
    'rgba(14, 255, 239, 0.2)',
    'rgba(112, 112, 112, 0.2)',
    'rgba(0, 0, 0, 0.2)'
];
const justiceleagueBorderColor = [
    'rgba(255, 0, 0, 1)',
    'rgba(0, 52, 157, 1)',
    'rgba(255, 230, 0, 1)',
    'rgba(14, 255, 239, 1)',
    'rgba(112, 112, 112, 1)',
    'rgba(0, 0, 0, 1)'
];

fetch('/api/heroes')
    .then(responseToJson)
    .then(filterByPublisher('Marvel Comics'))
    .then(json => json.map((curr, index) => { return powerstatsDatasetTemplate(curr, avengersBackgroundColor[index], avengersBorderColor[index]); }))
    .then(dataset => createRadarChart(powerstatsAvengersGraphElement, 'radar', powerstatsLabels, dataset));


fetch('/api/heroes')
    .then(responseToJson)
    .then(filterByPublisher('DC Comics'))
    .then(json => json.map((curr, index) => { return powerstatsDatasetTemplate(curr, justiceleagueBackgroundColor[index], justiceleagueBorderColor[index]); }))
    .then(dataset => createRadarChart(powerstatsJusticeLeagueGraphElement, 'radar', powerstatsLabels, dataset));



//SCATTER DATAPREP
const scatterAvengersGraphElement = document.getElementById('avengers-scatter');
const scatterJusticeLeagueGraphElement = document.getElementById('justiceleague-scatter');

const scatterDatasetTemplate = (hero, chartBackgroundColor, chartBorderColor) => {
    const obj = {
        label: hero.name,
        data: [{ x: parseInt(hero.appearance.height[1].replace(/\D/g, "")), y: parseInt(hero.appearance.weight[1].replace(/\D/g, "")) }],
        backgroundColor: chartBackgroundColor,
        borderColor: chartBorderColor
    };

    return obj;
};


//CREATE RADAR CHART FUNCTION 
const createScatterChart = (element, chartType, datasets) => {
    new Chart(element, {
        type: chartType,
        data: {
            datasets: datasets
        }
    });
};

fetch('/api/heroes')
    .then(responseToJson)
    .then(filterByPublisher('Marvel Comics'))
    .then(json => json.map((curr, index) => { return scatterDatasetTemplate(curr, avengersBackgroundColor[index], avengersBorderColor[index]); }))
    .then(dataset => createScatterChart(scatterAvengersGraphElement, 'scatter', dataset));

fetch('/api/heroes')
    .then(responseToJson)
    .then(filterByPublisher('DC Comics'))
    .then(json => json.map((curr, index) => { return scatterDatasetTemplate(curr, justiceleagueBackgroundColor[index], justiceleagueBorderColor[index]); }))
    .then(dataset => createScatterChart(scatterJusticeLeagueGraphElement, 'scatter', dataset));



//GENDER DATAPREP
const genderGraphLabels = ['Female', 'Male'];
const genderAvengersGraphElement = document.getElementById('avengers-gender');
const genderJusticeLeagueGraphElement = document.getElementById('justiceleague-gender');


const barDatasetTemplate = json => {
    const females = json.filter(item => item.appearance.gender === 'Female');
    const males = json.filter(item => item.appearance.gender === 'Male');

    const obj = {
        labels: ['Female', 'Male'],
        data: [females.length, males.length],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
    };

    return obj;

};


//CREATE BAR CHART FUNCTION 
const createPieChart = (element, chartType, chartlabels, datasets) => {
    new Chart(element, {
        type: chartType,
        data: {
            labels: chartlabels,
            datasets: datasets
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};

fetch('/api/heroes')
    .then(responseToJson)
    .then(filterByPublisher('Marvel Comics'))
    .then(barDatasetTemplate)
    .then(dataset => createPieChart(genderAvengersGraphElement, 'bar', genderGraphLabels, dataset));


fetch('/api/heroes')
    .then(responseToJson)
    .then(filterByPublisher('DC Comics'))
    .then(barDatasetTemplate)
    .then(dataset => createPieChart(genderJusticeLeagueGraphElement, 'bar', genderGraphLabels, dataset));


/*

const barData = json => {
    const females = json.filter(item => item.appearance.gender === 'Female');
    const males = json.filter(item => item.appearance.gender === 'Male');

    const array = [females.length, males.length];

    return array;

};

let genderDataAvengers;

fetch('/api/heroes')
    .then(responseToJson)
    .then(filterByPublisher('Marvel Comics'))
    .then(json => genderDataAvengers = barData(json));


var myChart = new Chart(genderAvengersGraphElement, {
    type: 'bar',
    data: {
        labels: genderGraphLabels,
        datasets: [{
            label: 'Avengers per Gender',
            data: genderDataAvengers,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
*/
