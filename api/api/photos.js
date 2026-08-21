    
export default async function vercel (req,res){
    const key = process.env.GOOGLE_API_KEY;
    const name = req.query.name;
    const placePhoto = `https://places.googleapis.com/v1/${name}/media?maxHeightPx=400&key=${key}`;
    const response = await fetch (placePhoto);
    const imageData = Buffer.from (await response.arrayBuffer());
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.status(200).send(imageData);
}