'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${
            Object.entries(data.languages)[0][1]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.entries(data.currencies)[0][1].name
          }</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
/*
// ========== 248. Our First AJAX Call: XMLHttpRequest
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
      <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.entries(data.languages)[0][1]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.entries(data.currencies)[0][1].name
            }</p>
        </div>
      </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
// ========== 249. [OPTIONAL] How the Web Works: Requests and Responses
// 09 02 2023 THU
// ========== 250. Welcome to Callback Hell
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');

// 10 02 2023 FRI
// ========== 251. Promises and the Fetch API
// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
const request = fetch('https://restcountries.com/v3.1/name/portugal');
console.log(request);
*/
// ========== 252. Consuming Promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
const getJSON = function (url, errorMsg = 'Something when wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      // 직접 에러를 만들었다. then 안에 에러를 생성하면 이 프로미스는 reject가 된다. reject가 되었으니 아래에 생성한 .catch가 실행된다.
      throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         // 직접 에러를 만들었다. then 안에 에러를 생성하면 이 프로미스는 reject가 된다. reject가 되었으니 아래에 생성한 .catch가 실행된다.
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'dkdkdkdd';
//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     // promise가 reject된 경우. 즉, 사용자의 인터넷 연결이 끊긴 경우 발생하는 에러를 다루는 방법
//     // catch도 promise를 리턴한다.
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     // promise의 결과에 상관없이 항상 실행되게 하려면 .finally()를 사용한다.
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders;
      console.log(neighbour);
      // 여기도 이웃 국가가 없는 경우 에러를 직접 발생시켜서 catch부분을 실행하려고 함
      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    // promise가 reject된 경우. 즉, 사용자의 인터넷 연결이 끊긴 경우 발생하는 에러를 다루는 방법
    // catch도 promise를 리턴한다.
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    // promise의 결과에 상관없이 항상 실행되게 하려면 .finally()를 사용한다.
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('portugal');
});

getCountryData('australia');

// getCountryData('eieieie');

// ========== 253. Chaining Promises
// test
const getCountryDataTest = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0], 'neighbour');
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 3
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(res => res.json())
    .then(data => renderCountry(data[0], 'neighbour'));
};

// getCountryDataTest('portugal');
// 11 02 2023 SAT
// ========== 254. Handling Rejected Promises
// ========== 255. Throwing Errors Manually
// ========== 256. Coding Challenge #1
// ========== 257. Asynchronous Behind the Scenes: The Event Loop
// ========== 258. The Event Loop in Practice
// ========== 259. Building a Simple Promise
// ========== 260. Promisifying the Geolocation API
// ========== 261. Coding Challenge #2
// ========== 262. Consuming Promises with Async/Await
// ========== 263. Error Handling With try...catch
// ========== 264. Returning Values from Async Functions
// ========== 265. Running Promises in Parallel
// ========== 266. Other Promise Combinators: race, allSettled and any
// ========== 267. Coding Challenge #3
