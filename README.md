# Memwa Video web app
Website to record, watch and search for user stories. Users can login to their profile to record, edit or delete video memories. Users can search for other user stories based on common criteria like location, historical events or profession.

**Link to project:** tbd

![home page screenshot](https://tinypic.host/images/2023/01/09/Screenshot-2023-01-08-at-10.12.17-PM.md.png)

## Who Can Use It:
Anyone that wants an easy way to capture videos, upload videos and watch videos from others.

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Bootstrap, mongoDB, Cloudinary, ejs, express, passport, mongoose

Node is a pretty lightweight server choice and can be spun up fairly easily. For the backend mondoDB made the most since for the simple mongoose schema creations and since each upload could vary in terms of missing field didn't want to use a SQL database here. Cloudinary waas the choice for media storage so many options for uploading and optimizing media. Down the line haveing different versions of the video based on client playing the video will come in handy. By using Express' built in middleware architecture we could cleanly write fallbacks and we can build images using an API that's very similar to the front-end canvas API. 

MVP features: 
- create an account
- add a video-upload
- add tag a video
- record a video- capture
- watch a video
- comment and rate video

## Additions & Optimizations
*(optional)*
- search for videos in database
- Add Search functionality, for user stories
- Add other social logins
- Add edit video option- tags, modify entry
- Add Watch page to watch videos in sequence
- Enable privacy flag
- Question Bank to record the answers

## Lessons Learned:

1. Video Recording is HARD- When I set out to build memwa I wanted to record video, so many apps allow for video streaming and recording I thought there would be plenty of APIs I could leverage. That proved much harder than I anticipated, WebRTC is an older technology and HTML5 for video recording is not universal for all browsers. It seems like javascript is not the most popular language being used for sites like twitch, youtube etc for recording. Made it work with clientside recording looking for a more optimized server side recording streaming to a database that is reliable enough because the last thing I want is for users to record something and then find out it wasn't captured or uploaded properly. 

2. Adding Search Functionality is not for the faint at heart- All the web sites seem to have at least a search bar and adding it to my app which was using mondoDB and Cloudinary proved to be challenge still, deciding on how to store the data and what to make searchable is what led me to adding tags to the videos but other fields like title, author etc all need to be taken into consideration. Really brings to light why it's so important to plan out your DBSchema and database structures to used. Currently working on what is a better way to build my backend to make search faster and less bloated coding. 

3. All Data is not created equal- Uploading picture and text files is not the same as uploading video files, the database optimization for realtime media is paramount to keep a responsive user experience. 


## Development Setup

### install
`npm install`

### Things to add
- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

### Run
`npm start`

