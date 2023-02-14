'use strict';
// 32. Activating Strict Mode
// 33. Functions
function describeCountry(country, population, capitalCity) {
    const str = `${country} has ${population} million people and its capital city is ${capitalCity}.`;
    return str;
}

let answer = describeCountry('Finland', 6, 'Helsinki');
console.log(answer);
answer = describeCountry('Korea', 50, 'Seoul');
console.log(answer);
answer = describeCountry('Ireland', 5, 'Dublin');
console.log(answer);

// 34. Function Declarations vs. Expressions
function percentageOfWorld1(population) {
    return population / 7900 * 100;
}

// const popFinland = percentageOfWorld1(6);
// const popKorea = percentageOfWorld1(50);
// const popIreland = percentageOfWorld1(5);
// console.log(popFinland, popKorea, popIreland);

const percentageOfWorld2 = function (population) {
    return population / 7900 * 100;
}

const popFinland = percentageOfWorld2(6);
const popKorea = percentageOfWorld2(50);
const popIreland = percentageOfWorld2(5);
console.log(popFinland, popKorea, popIreland);

// 35. Arrow Functions
const percentageOfWorld3 = population => population / 7900 * 100;
console.log(percentageOfWorld3(50));

// 36. Functions Calling Other Functions
function describePopulation(country, population) {
    return `${country} has ${population} million people, which is about ${percentageOfWorld1(population)}% of the world.`;
}

console.log(describePopulation('China', 1441));
console.log(describePopulation('Finland', 6));
console.log(describePopulation('Ireland', 5));

// 37. Reviewing Functions
// 38. Coding Challenge #1
// 39. Introduction to Arrays
const populations = [50, 6, 5, 1441];
console.log(populations.length === 4);

const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3])];
console.log(percentages);

// 40. Basic Array Operations (Methods)
const neighbours = ['Spain', 'Belgium', 'Germany'];
neighbours.push('Utopia');
console.log(neighbours);
neighbours.pop();
console.log(neighbours);
if (!neighbours.includes('Germany')) {
    console.log('Probably not a central European country :D');
}
neighbours[neighbours.indexOf('Spain')] = 'the Kingdom of Spain';
console.log(neighbours);

// 41. Coding Challenge #2
// 42. Introduction to Objects
// const myCountry = {
//     country: 'South Korea',
//     capital: 'Seoul',
//     language: 'Korean',
//     population: 50,
//     neighbours: ['North Korea', 'Japan', 'China']
// };

// 43. Dot vs. Bracket Notation
// console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} countries and a capital called ${myCountry.capital}.`)

// console.log(`${myCountry.population + 2} and ${myCountry['population'] - 2};`);

// 44. Object Methods
const myCountry = {
    country: 'South Korea',
    capital: 'Seoul',
    language: 'Korean',
    population: 50,
    neighbours: ['North Korea', 'Japan', 'China'],
    describe: function () {
        console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} countries and a capital called ${this.capital}.`);
    },
    checkIsIsland: function () {
        if (this.neighbours.length == 0) {
            this.Island = true;
        } else {
            this.Island = false;
        }
    }
};

myCountry.describe();
myCountry.checkIsIsland();
console.log(myCountry);

// 45. Coding Challenge #3
// 46. Iteration: The for Loop
for (let i = 1; i <= 50; i++) {
    console.log(`'Voter number ${i} is currently voting`);
}

// 47. Looping Arrays, Breaking and Continuing
const populations2 = [50, 6, 5, 1441];
const percentages2 = [];

for (let i = 0; i < populations2.length; i++) {
    percentages2.push(percentageOfWorld1(populations2[i]));
}

console.log(percentages2);

// 48. Looping Backwards and Loops in Loops
const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

for (let i = 0; i < listOfNeighbours.length; i++) {
    console.log(`======== ${listOfNeighbours[i]}`);

    for (let neighbour = 0; neighbour < listOfNeighbours[i].length; neighbour++) {
        console.log(`Neighbour: ${listOfNeighbours[i][neighbour]}`)
    }
}

// 49. The while Loop
const percentages3 = [];

let i = 0;
while (i < populations2.length) {
    percentages3.push(percentageOfWorld1(populations2[i]));
    i++;
}

console.log(percentages3);


// 50. Coding Challenge #4