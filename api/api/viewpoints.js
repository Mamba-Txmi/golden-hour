export default async function vercel (req,res){
    const key = process.env.GOOGLE_API_KEY;
    const bounds = radiusToRectangle(Number(req.query.lat), Number(req.query.lon), Number(req.query.radius));
    const response = await fetch (`https://places.googleapis.com/v1/places:searchText`, {
        method: 'POST',
        headers: {
            'X-Goog-Api-Key': key,
            'content-type': 'application/json',
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.photos,places.reviewSummary,places.rating,places.location'
        },
        body: JSON.stringify({ 
            'textQuery' : 'scenic overlook  lookout beautifulsunset view point',
            
            'locationRestriction': {
                'rectangle': {
                    'low': {
                        'latitude': bounds.low.latitude,
                        'longitude': bounds.low.longitude,
                    },
                    'high':{
                        'latitude': bounds.high.latitude,
                        'longitude': bounds.high.longitude, 
                    }
                    
                }
        }
         })


     })


    function radiusToRectangle(lat, lon, radiusinMeters) {
           
            const MetersPerDegreeLat = 111320; // Approximate meters per degree latitude
            const MetersPerDegreeLon =111320 * Math.cos(lat * (Math.PI /180)); // Approximate meters per degree longitude at given latitude

            const dLat = radiusinMeters / MetersPerDegreeLat;
            const dLon = radiusinMeters / MetersPerDegreeLon;

            return {
                low: {
                    latitude: lat - dLat,
                    longitude: lon - dLon,
                },
                high: {
                    latitude: lat + dLat,
                    longitude: lon + dLon,
                }
            }
        }
    
    if (!response.ok) {
        console.log("Error fetching response", response.status);
        const errorBody = await response.text();
        console.log(errorBody);

        res.status(502).json({ error: 'Failed to fetch data from Google Places API' });
        return;
    }
    const data = await response.json();
     res.status(200).json(data);
}