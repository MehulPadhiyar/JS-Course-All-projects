const countriesContainer = document.querySelector(".countries");
const btnCountry = document.querySelector(".btn-country");

const renderCountry = function(data,className = ''){
    const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 10000000).toFixed(2)} CR</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>`;
    countriesContainer.insertAdjacentHTML('beforeend',html);
    countriesContainer.style.opacity = 1;
}
/*
const renderCountries = function(country){
    const request = new XMLHttpRequest();
    request.open('GET',`https://restcountries.com/v2/name/${country}`);
    request.send();
    request.addEventListener('load',function(){
        let [data] = JSON.parse(this.responseText);
        console.log(data);
        renderCountry(data);
        let neighbour = data.borders?.[0];
        const request2 = new XMLHttpRequest();
        request2.open('GET',`https://restcountries.com/v2/name/${neighbour}`);
        request2.send();
        request2.addEventListener('load',function(){
            let [data2] = JSON.parse(this.responseText);
            console.log(data2);
            renderCountry(data2,'neighbour');
            let neighbour2 = data2.borders?.[0];
            const request3 = new XMLHttpRequest();
            request3.open('GET',`https://restcountries.com/v2/name/${neighbour2}`);
            request3.send();
            request3.addEventListener('load',function(){
                let [data3] = JSON.parse(this.responseText);
                console.log(data3);
                renderCountry(data3,'neighbour');
            })
        })
    });
}
*/
const renderCountries = function(country){
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function(response){
        if(!response.ok){
        console.log("error");
        throw new Error("Something went wrong! No country found!");
        }
        console.log(response);
        return response.json();
    }).then(function([data]){
        console.log(data);
        renderCountry(data);
        const neighbour = data.borders?.[0];
        return fetch(`https://restcountries.com/v2/name/${neighbour}`);
        /*.then(function(response2){
            return response2.json();
        })
        .then(function([data2]){
            renderCountry(data2,'neighbour');
        })*/
    }).then(function(response2){
        if(!response2.ok){
            console.log(response2);
            throw new Error("No Neighbour found!");

        }
        return response2.json();
    }).then(function([data2]){
        renderCountry(data2,'neighbour');
    }).catch(err => {
        countriesContainer.insertAdjacentText("beforeend",err);
        countriesContainer.style.opacity = 1;
    })
}




/*In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀*/
/*
const getCurrentPosition = function(){
    return new Promise(function(resolve,reject){
        navigator.geolocation.getCurrentPosition(resolve,reject);
    })
}

const whereAmI = function(){
    getCurrentPosition().then(pos =>{ 
        console.log(pos);
        const {latitude: lat,longitude: lng} = pos.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=39541929661788635803x119525`)
    })
    //fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=39541929661788635803x119525`)
    .then(function(response){
        console.log(response);
        if(response.status === 403)
        throw new Error("Wait For Cool Down!");
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(`You are in ${data.state}, ${data.country}`);
        renderCountries(data.country);
    })
    .catch(err => {
        console.log(err);
    })
}

btnCountry.addEventListener("click",whereAmI);
*/
const getCurrentPosition = function(){
    return new Promise(function(resolve,reject){
        navigator.geolocation.getCurrentPosition(resolve,reject);
    })
}

const whereAmI = async function(){
    const curPos = await getCurrentPosition();
    const {latitude: lat,longitude: lng} = curPos.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=39541929661788635803x119525`)
    const dataGeo = await resGeo.json();
    const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
    const [data] = await res.json();
    renderCountry(data);
}

whereAmI();