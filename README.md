# golden-hour

Golden Hour is a passion project that recommends good locations for watching the sunset, along with the approximate times of sunrise, sunset, and golden hour for any location.<br><br>
This is my first-ever coding project, and I wanted it to be something fun. Given my lack of experience, AI was a natural fit for planning a roadmap from idea to finished product.<br>I used Claude (skills) to map out key milestones, track my progress, and work through bugs when I got stuck. <br>The learning folder in this repo documents that process, including the shortcomings along the way.

<b>How it works:</b><br> Users enter any city in the world or a UK postcode, which is converted into a longitude/latitude pair. That coordinate pair is then used to retrieve sun data and nearby sunset viewing spots.<br> Alternatively, users can select "Use my location" and set a search radius to pull viewing spot data for their surroundings.

<b>APIs used</b><br>
[ OpenWeatherMap](https://openweathermap.org/) – geocoding for city names into lon/lat<br>
[Postcodes.io](https://postcodes.io/) – geocoding for UK postcodes into lon/lat<br>
[sunsetsunrise.io](https://sunrise-sunset.org/) – sunrise, sunset, and golden hour times for a given lon/lat<br>
Google Places API (New) – sunny viewpoint locations within a selected search radius
 
<b>Working with AI</b><br>
I deliberately instructed Claude not to write code for me or generate any files. The goal was to keep the learning process as immersive as possible while still hitting my goals within a two-month timeframe.

<b>Through this process, I have learnt:</b><br>
The fundamentals of HTML, CSS design, and JavaScript,<br>
How APIs work, and how to make GET/POST HTTP requests<br>
How to read documentation and debug my own code<br>
How to use a Vercel serverless proxy to keep API keys hidden<br>
How to use browser geolocation<br>
How to convert a search radius into a bounding rectangle<br> 

This project was fun and laid a strong foundation for learning web development and using AI effectively in learning.
