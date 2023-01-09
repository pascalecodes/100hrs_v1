# Memwa Video web app
Website to record, watch and search for user stories. Users can login to their profile to record, edit or delete video memories. Users can search for other user stories based on common criteria like location, historical events or profession.
**Link to project:** tbd

<img src='http://i.imgur.com/580vPI2.png](https://ibb.co/bPc2QZD' height='50'></a>

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.JS, Bootstrap, mongoDB and Cloudinary

Memwa 

MVP features: 
- create an account
- add a video-upload
- add tag a video
- record a video- capture
- search for videos in database
- watch a video
- comment and rate video

## Additions & Optimizations
*(optional)*
- Add Search functionality, for user stories
- Add other social logins
- Add edit video option- tags, modify entry
- Add Watch page to watch videos in sequence
- enable privacy flag

## Lessons Learned:

1. Video Recording is HARD- When I set out to build memwa I wanted to record video, so many apps allow for video streaming and recording I thought there would be plenty of APIs I could leverage. That proved much harder than I anticipated, WebRTC is an older technology and HTML5 for video recording is not universal for all browsers. It seems like javascript is not the most popular language being used for sites like twitch, youtube etc for recording. Made it work with clientside recording looking for a more optimized server side recording streaming to a database that is reliable enough because the last thing I want is for users to record something and then find out it wasn't captured or uploaded properly. 
2. Adding Search Functionality is not for the faint at heart- All the web sites seem to have at least a search bar and adding it to my app which was using mondoDB and Cloudinary proved to be challenge still, deciding on how to store the data and what to make searchable is what led me to adding tags to the videos but other fields like title, author etc all need to be taken into consideration. Really brings to light why it's so important to plan out your DBSchema and database structures to used. Currently working on what is a better way to build my backend to make search faster and less bloated coding. 
3. All Data is not created equal- Uploading picture and text files is not the same as uploading video files, the database optimization for realtime media is paramount to keep a responsive user experience. 

## Examples:
Take a look at these couple examples that I have in my own portfolio:

**Palettable:** https://github.com/alecortega/palettable

**Twitter Battle:** https://github.com/alecortega/twitter-battle

**Patch Panel:** https://github.com/alecortega/patch-panel
# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run

`npm start`
