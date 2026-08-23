export default async function vercel (req,res){
    const key = process.env.OPENWEATHER_API_KEY;
    const city= req.query.city;
    const geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${key}`;
    const response = await fetch(geoCodeURL);
    
    if (!response.ok) {
            console.log("Error fetching response", response.status);
            return;
        }
    
    const cityData = await response.json();    
    res.status(200).json(cityData);
}
