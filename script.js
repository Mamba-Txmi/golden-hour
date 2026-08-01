async function findGoldenHour() {
    let searchInput = document.getElementById("location-finder").value.toLowerCase().replace(/\s/g,'');
    console.log(searchInput)
    const sunInfo = document.getElementById("sun-data");
    sunInfo.style.display ='block';
    const locationAndTime = document.getElementById("location-time");
    const sunrise= document.getElementById("sunrise-box");
    const sunset = document.getElementById("sunset-box");
    const goldenHour = document.getElementById("golden-hour");
    const apiKey = '40aac21ae9fd50b8068b88db0a8134bf';


    async function getCityLonAndLat(){
        const geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchInput)}&limit=1&appid=${apiKey}`;
        const response = await fetch(geoCodeURL);
        if (!response.ok) {
            console.log("Error fetching response", response.status);
            return;
        }

        const data = await response.json();
        if (data.length===0) {
            sunInfo.innerHTML = 
            `<h2>${searchInput} not found. </h2>
            <p>Please try again </p>`;
            return;
        }else{
            return data[0]
        }

    }

    async function getPostcodeLonAndLat(){
        const geocodeURL = `https://api.postcodes.io/postcodes/${encodeURIComponent(searchInput)}`;
        const response = await fetch(geocodeURL);
        if(!response.ok){
            console.log("There is a problem with the response", response.status);
            sunInfo.innerHTML=
            `<div>
                <h4> There seems to be an error using this Postcode.</h4>
                <p>Please try again.</p>
            </div>`
            return;
        }
        const data = await response.json();
        console.log(data);
        return data.result;
        

    }

    async function testUserInput() {
         
        if (/\d/.test(searchInput)) {
            const postcodeData = await getPostcodeLonAndLat();
            return {lon : postcodeData.longitude,lat: postcodeData.latitude};
        } else{
            const cityData = await getCityLonAndLat();
            return{lon :cityData.lon,lat: cityData.lat};
        }
    }

    async function getSunData(lat, lon){
        const sunDataURL = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&timezone=UTC&date=today`;
        const response=await fetch(sunDataURL);
        if (!response.ok){
        console.log("Bad response",response.status);
        return;
        }
        const data = await response.json();
        locationAndTime.innerHTML=
        `<div>
            <h2>Location: ${searchInput}</h2>
            <p>Date: ${data.results.date}</p>
        </div>`;
        sunrise.innerHTML=
        `<div>
            <p>Sunrise Time: ${data.results.sunrise}</p>
        </div> `;
        sunset.innerHTML=
        `<div>
            <p>Sunset Time: ${data.results.sunset}</p>
        </div>`;
        goldenHour.innerHTML=
        `<div>
            <h3>Golden Hour: ${data.results.golden_hour}</h3>
        </div>`;
    }

    const geoData= await testUserInput();
    if (!geoData) return;
    console.log(geoData);
    await getSunData(geoData.lat,geoData.lon);
    searchInput = "";
    
}
