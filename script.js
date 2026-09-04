
const sunInfo = document.getElementById("sun-data");
const locationAndTime = document.getElementById("location-time");
const sunrise= document.getElementById("sunrise-box");
const sunset = document.getElementById("sunset-box");
const goldenHour = document.getElementById("golden-hour");

const sun = document.getElementById("sun")
const sky = document.querySelector('.sky-background');


const canvas = document.getElementById("sun-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const imageArray =[] 
for(let i =1; i<=122;i++){
    const paddedNumber=String(i).padStart(3,"0");
    const frameImage = new Image()
    function addNewImage(){
        frameImage.src = `golden-hour-assets/frame_${paddedNumber}.jpg`;
        return frameImage;
    }
    imageArray.push(addNewImage())
}

function drawFrame(index){
    const scaledImage = drawImageScale(imageArray[index]);    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(imageArray[index], scaledImage.offsetX, scaledImage.offsetY,scaledImage.scaledWidth,scaledImage.scaledHeight);
}

imageArray[0].onload = () => drawFrame(0);



window.addEventListener('scroll', () =>{
    const scrollPosition = window.scrollY;
    const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / scrollableDistance);

    const pageIndex = Math.floor(scrollPercentage *(imageArray.length-1))
    drawFrame(pageIndex)

}
)

    
function drawImageScale(image) {
    xScale = window.innerWidth/image.naturalWidth;
    yScale =window.innerHeight/image.naturalHeight;
    const scaleSelect = Math.max(xScale,yScale);
    const scaledWidth = image.naturalWidth * scaleSelect;
    const scaledHeight = image.naturalHeight * scaleSelect;
    const offsetX = (canvas.width - scaledWidth)/2;
    const offsetY = (canvas.height - scaledHeight)/2;
    return {scaledWidth,scaledHeight,offsetX,offsetY};
}


async function getSunData(lat, lon,locationparam){
        const sunDataURL = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&timezone=UTC&date=today`;
        const response=await fetch(sunDataURL);
        if (!response.ok){
        console.log("Bad response",response.status);
        return;
        }
        const data = await response.json();
        locationAndTime.innerHTML=
        `<div>
            <h2>Location: ${locationparam}</h2>
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
            <h3>Golden Hour at ${data.results.golden_hour}</h3>
        </div>`;
    }


function getNearbyPlaces(lat, lon, radius) {
    const nearbySunPlace = document.getElementById("nearby-sun-place");
    nearbySunPlace.innerHTML = '';
    fetch(`/api/api/viewpoints?lat=${lat}&lon=${lon}&radius=${radius}`)
        .then(response => response.json())
        .then(viewpointsData => {
            if (viewpointsData.places && viewpointsData.places.length){
                for (let i=0; i < viewpointsData.places.length; i++){
                    placesCard(viewpointsData.places[i], "#nearby-sun-place")
                }
            }else{
                nearbySunPlace.innerHTML =
                `<div id= "no-viewpoints-message">
                <p>No nearby Sunset Viewpoints have been found in this radius</p>
                <p>Please try increasing the radius or search from a different location</p>
                </div>`
            }
        })
        .catch(error => {
            console.error('Error fetching nearby places:', error);
        });
       

}
             

function placesCard (data, id,) {
    const parent = document.querySelector(id);// Get the parent element. Its another way of using document.getElementById
    let photoHTML = '';
    if (data.photos && data.photos.length > 0) {
        photoHTML = `<img src="/api/api/photos?name=${data.photos[0].name}" alt="Place Photo" id="card-image">`;
    }else{
        photoHTML =`<p>No photo currently available</p>`
    }
    let reviewSum = ''
    if (data.reviewSummary && data.reviewSummary.text){
        reviewSum =`<p class= "review" >"${data.reviewSummary.text.text}"</p>`;
    }else{
        reviewSum =`<p class= "review">No reviews available</p>`
    }
    let cardInfo = `<div class="card">
    ${photoHTML}
    <div class="card-header"><h4 id="place-title">${data.displayName.text}</h4>
    <a  id ="direction-link" href ="https://www.google.com/maps/dir/?api=1&destination=${data.location.latitude},${data.location.longitude}" target="_blank" class="directions-btn"> Get Directions </a>
    </div>
    <p id="address">${data.formattedAddress}</p>
    ${reviewSum}
    <p>Rating: ${data.rating}</p>
    </div>`
    
    parent.innerHTML += cardInfo;

}

function getGeoLocation() {
    const userRadius = Number(document.getElementById("radius-select").value);
    navigator.geolocation.getCurrentPosition(
        async (position)=>{
            console.log("Geolocation Coordinates: ",position.coords.latitude, position.coords.longitude);
            await getSunData(position.coords.latitude, position.coords.longitude, "Your Location");
            await getNearbyPlaces(position.coords.latitude, position.coords.longitude, userRadius);

            sunInfo.style.display ='block';
        },
        (error)=>{
            console.log("Geolocation Error: ",error.message);
            sunInfo.innerHTML = 
            `<h2>Unable to find your current location. </h2>
            <p>Please grant access to Geolocation </p>`;
            sunInfo.style.display ='block';
        }
    );
    
}


async function findGoldenHour() {
    const userRadius = Number(document.getElementById("radius-select").value);
    let searchInput = document.getElementById("location-finder").value.toLowerCase().replace(/\s/g,'');
    console.log(searchInput)
    
    async function getCityLonAndLat(){
        const response = await fetch(`/api/api/geocode?city=${encodeURIComponent(searchInput)}`);
        const data = await response.json();
        if(data.length === 0){ 
            sunInfo.innerHTML = 
            `<h2>${searchInput} not found. </h2>
                <p>Please try again </p>`;
                return;
            }else{
                console.log(data);
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

    
    
    const geoData= await testUserInput();
    if (!geoData) return;
    console.log(geoData);
    await getSunData(geoData.lat,geoData.lon,searchInput);
    await getNearbyPlaces(geoData.lat, geoData.lon, userRadius);
    sunInfo.style.display ='block';
    searchInput = "";
    
}

