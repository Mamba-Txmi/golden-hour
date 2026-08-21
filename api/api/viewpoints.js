export default async function vercel (req,res){
    const key = process.env.GOOGLE_API_KEY;
    const response = await fetch (`https://places.googleapis.com/v1/places:searchText`, {
        method: 'POST',
        headers: {
            'X-Goog-Api-Key': key,
            'content-type': 'application/json',
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.photos,places.reviewSummary,places.rating'
        },
        body: JSON.stringify({ 
            'textQuery' : 'scenic overlook  lookout beautifulsunset view point',
            'locationBias': {
                'circle': {
                    'center': {
                        'latitude':Number(req.query.lat),
                        'longitude':Number(req.query.lon),
                    },
                    'radius': Number(req.query.radius)
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