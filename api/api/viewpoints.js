export default async function vercel (req,res){
    const key = process.env.GOOGLE_API_KEY;
    const response = await fetch (`https://places.googleapis.com/v1/places:searchNearby`, {
        method: 'POST',
        headers: {
            'X-Goog-Api-Key': key,
            'content-type': 'application/json',
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.photos'
        },
        body: JSON.stringify({ 
            'includedTypes': ['scenic_spot','tourist_attraction','park','mountain_peak'],
            'locationRestriction': {
                'circle': {
                    'center': {
                        'latitude':51.5074,
                        'longitude':-0.1278,
                    },
                    'radius':5000
                }
        }
         })

    })
    
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