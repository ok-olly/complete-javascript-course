// 10. Values and Variables
let country = 'South Korea';
let continent = 'Asia';
let population = 50;
console.log(country);
console.log(continent);
console.log(population);

// 12. Data Types
let isIsland = false;
let language;
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

// 13. let, const and var
language = 'korean';
// const country = 'South Korea';
// const continent = 'Asia';
// const isIsland = false;

// 14. Basic Operators
// let population = 50;
console.log(population / 2);
console.log(population++);
console.log(population > 6);
console.log(population < 33);
let description = country + ' is in ' + continent + ', and its ' + population + ' million people speak ' + language;
console.log(description);

// 15. Operator Precedence
// 16. Coding Challenge #1
// 17. Strings and Template Literals
description = `${country} is in ${continent}, and its ${population} million people speak ${language}`
console.log(description);

// 18. Taking Decisions: if / else Statements
if (population >= 33) {
    console.log(`${country}'s population is above average.`)
} else {
    console.log(`${country}'s population is ${33 - population} million below average`)
}

// 19. Coding Challenge #2
// 20. Type Conversion and Coercion
4;
617;
23;
false;
117;

// 21. Truthy and Falsy Values
// 22. Equality Operators: == vs. ===
// const numNeighbours = Number(prompt('How many neighbour countries does your country have?'));

// if (numNeighbours === 1) {
//     console.log('Only 1 border!');
// } else if (numNeighbours > 1) {
//     console.log('More than 1 border');
// } else {
//     console.log('No borders');
// }

// 23. Boolean Logic
// 24. Logical Operators
if (language === 'English' && population < 50 && !isIsland) {
    console.log(`You should live in ${country} :)`)
} else {
    console.log(`${country} does not meet your criteria :(`)
}

// 25. Coding Challenge #3
// 26. The switch Statement
switch (language) {
    case 'chinese':
    case 'mandarin':
        console.log('MOST number of native speakers!');
        break;
    case 'spanish':
        console.log('2nd place in number of native speakers!');
        break;
    case 'english':
        console.log('3rd place');
        break;
    case 'hindi':
        console.log('Number 4');
        break;
    case 'arabic':
        console.log('5th most spoken language');
        break;
    default:
        console.log('Great language too :D');
}

// 27. Statements and Expressions
// 28. The Conditional (Ternary) Operator
console.log(`${country}'s population is ${population > 33 ? 'above' : 'below'} average.`);

// 29. Coding Challenge #4
// 30. JavaScript Releases: ES5, ES6+ and ESNext
