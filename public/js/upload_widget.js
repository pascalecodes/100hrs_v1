const cloudName = 'pascaledev' // replace with your own cloud name
const uploadPreset = "lo88fkku" // replace with your own upload preset


// Remove the comments from the code below to add
// additional functionality.
// Note that these are only a few examples, to see
// the full list of possible parameters that you
// can add see:
//   https://cloudinary.com/documentation/upload_widget_reference

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    sources: [ 
      "local",      
      "camera",
      "facebook",
      "instagram",
      "url",
      "google_drive",
      "dropbox"
    ], // restrict the upload sources to the ones listed above
    googleApiKey: "<image_search_google_api_key>", 
    cropping: false, //add a cropping step
    showAdvancedOptions: true,  //add advanced options (public_id and tag)
    multiple: true,  //restrict upload to a single file
    defaultSource: "local",
    //folder: "memwa", //upload files to the specified folder
    //tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    //theme: "purple", //change to a purple theme
    styles: {        
      palette: {            
        window: "#ffffff",            
        sourceBg: "#f4f4f5",            
        windowBorder: "#90a0b3",            
        tabIcon: "#000000",            
        inactiveTabIcon: "#555a5f",            
        menuIcons: "#555a5f",            
        link: "#0433ff",            
        action: "#339933",            
        inProgress: "#0433ff",            
        complete: "#339933",            
        error: "#cc0000",            
        textDark: "#000000",            
        textLight: "#fcfffd"        
      },        
      fonts: {            
        default: null,            
        "'Kalam', cursive": {                
          url: "https://fonts.googleapis.com/css?family=Kalam",                
          active: true            
        }        
      } 
    }   
        
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      document
        .getElementById("uploadedimage")
        .setAttribute("src", result.info.secure_url);
    }
  }
);

// document.getElementById("upload_widget").addEventListener(
//   "click",
//   function () {
//     myWidget.open();
//   },
//   false
// );
document.getElementById("upload_pop").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);
// Initialize Cloudinary HTML5 video player
// with playlist widget
// var player = cloudinary.videoPlayer('demo-player',{
//   cloud_name: cloudName ,
//   playlistWidget: {
//     direction: "horizontal",
//     total: 4
//   }});

