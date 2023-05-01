// document.getElementById('record-link').onclick= function ()

// const successMessage = document.getElementById('successMessage');
// const downloadLink = document.getElementById('downloadLink');
// const doneButton = document.getElementById('done');

// window.onload = function () {
//     const parts =[];
//     let mediaRecorder;
//     navigator.mediaDevices.getUserMedia({audio:true, video: true}).then(stream => {
//         document.getElementById('video').srcObject  = stream;
//         document.getElementById('start-btn').onclick = function () {
//             document.querySelector('#message').innerText='Recording in progress...';
//             // const mimeType = 'video/webm;codecs=vp9,opus';
//             // const options = { mimeType };
//             mediaRecorder = new MediaRecorder(stream);

//             mediaRecorder.start(100);
            
            
//             mediaRecorder.ondataavailable = function (e) {
//                 parts.push(e.data);
//             }
//         }
//     });
    
//     //const uploadForm = document.getElementById('uploadForm')
//     document.getElementById('stop-btn').onclick = function (){
//         mediaRecorder.onstop = (event) => {
//             console.log('Recoorder stopped:', event)
//         }
//         document.querySelector('#message').innerText='Recording STOPPED, upload recording to Memwa';
//         mediaRecorder.stop();
//         let vidSave = document.getElementById('vid2')
//         //document.getElementById('video').srcObject = null;
//         uploadForm.style.display = 'block';
//         //document.getElementById("demo").innerHTML = "I have changed!";
//         let blob = new Blob(parts, {
//             type: 'video/webm'
//         });
//        //document.getElementById('videoBlob').value = URL.createObjectURL(blob).data;
//        //console.log('the url', URL.createObjectURL(blob))
//         //parts=[];
//         const  url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         console.log('the url', url)
//         let fileName = $date.now()
        
//         //let fileName = document.getElementById('title').value
//         document.body.appendChild(a);
//         a.style = 'display: none';
//         a.href = url;
        
//         // //a.download = vidSave.src;
        
//         //a.download = `${fileName}.webm`;
//         a.download = `${fileName}.webm`
//         // // 
//         // // a.download = fileName
//         a.click();
//         vidSave.src = url;// create  a new location for file name also

//         // function playVideo(videoStream){ // as blob 

//         //     var video = document.querySelector('video');
           
//         //     var videoUrl=window.URL.createObjectURL(videoStream.data);// blob.data gives actual data
           
//         //     video.src = videoUrl;
//         //    }
//     }
// }

// document.getElementById('uploadForm').addEventListener('submit', uploadVideo);
// document.getElementById('done').addEventListener('click', () => {location.reload();});
    
//     async function uploadVideo(e) {
//         e.preventDefault();
      
//         const formData = new FormData(uploadForm);
      
//         const response = await fetch('/capture/upload', {
//           method: 'POST',
//           body: formData,
//         });
      
//         if (response.ok) {
//           const data = await response.json();
//           uploadForm.style.display = 'none';
//           successMessage.style.display = 'block';
//           downloadLink.href = data.videoUrl;
//         }
//       }

// **********working version of recording and file download
window.onload = function () {
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const videoBlobInput = document.getElementById('videoBlob')
const doneButton = document.getElementById('done');

doneButton.addEventListener('click', () => {location.reload();});
    let parts =[];
    let mediaRecorder;
    navigator.mediaDevices.getUserMedia({audio:true, video: true}).then(stream => {
        document.getElementById('video').srcObject  = stream;
        document.getElementById('start-btn').onclick = function () {
            document.querySelector('#message').innerText='Recording in progress...';
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start(100);
            startButton.disabled = true;
            stopButton.disabled = false;
            
            mediaRecorder.ondataavailable = function (e) {
                if(e.data && e.data.size > 0){
                    parts.push(e.data);
                }
            }
        }
    })
     let uploadForm = document.getElementById('uploadForm')
    document.getElementById('stop-btn').onclick = function (){
        document.querySelector('#message').innerText='Recording STOPPED, upload recording to Memwa';
        mediaRecorder.onstop = (event) => {
            console.log('Recoorder stopped:', event)
            // videoBlobInput.value = `${URL.createObjectURL(blob)}.webm`
            // console.log('the url', `${URL.createObjectURL(blob)}.webm`)
            uploadForm.style.display = 'block';
            document.getElementById('uploadForm').addEventListener('submit', uploadVideo)
            }
        mediaRecorder.stop(100);
        startButton.disabled = false;
        stopButton.disabled = true;
    
        let vidSave = document.getElementById('vid2')
        const a = document.createElement('a');
    //const title= document.querySelector('#title').value
    // let fileName = document.getElementById('title').value
    // console.log(fileName)
    // document.body.appendChild(a);
    // a.style = 'display: none';
    // a.href = url;
    
    // //a.download = vidSave.src;
    // a.download = `${fileName}.webm`;
    // console.log(a)
    // document.getElementById('videoBlob').value =  a.download
    //const track = new File([blob], `${fileName}.webm`, {type:'video/webm'})
    // document.getElementById('videoBlob').value = a
    //console.log('track', track)
   // console.log('file', a.download, a.href)
            //   successMessage.style.display = 'block';
            //   downloadLink.href = url;
            //   document.getElementById('downloadLink').textContent = `${fileName}.webm`;
            //   document.getElementById('downloadLink').download = `${fileName}.webm`
            //   const fileInput = document.getElementById('videoBlob');
            //     fileInput.value =url;
            //     console.log(url)
              
        
        //document.getElementById("demo").innerHTML = "I have changed!";
        // edited the blob to the uploadvideo functtion
        // let blob = new Blob(parts, {
        //     type: 'video/webm'
        // });
        // document.getElementById('videoBlob').value= blob.arrayBuffer()
        // //parts=[];
        // const  url = URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // //const title= document.querySelector('#title').value
        // let fileName = document.getElementById('title').value
        // document.body.appendChild(a);
        // a.style = 'display: none';
        // a.href = url;
        // //a.download = vidSave.src;
        // a.download = `${fileName}.webm`;
        // console.log(videoBlob)
        // // 
        // // a.download = fileName
        // a.click();
        //vidSave.src = url;// create  a new location for file name also
        async function uploadVideo(e) {
            e.preventDefault();
            const formData = new FormData(uploadForm);
            //const formData = new FormData();
            //formData.append('videoBlob', blob)
            const blob = new Blob(parts, { type: 'video/webm' });
            let fileName = document.getElementById('title').value
            console.log(fileName)
            formData.set('videoBlob', blob, `${fileName}.webm`);
            
            // Set the value of the videoBlobInput field
            videoBlobInput.value = `${fileName}.webm`;
            const  url = URL.createObjectURL(blob);
            // const formData = new FormData()
            // const response = await fetch(blobUrl);
            // const blob = await response.blob();
        
    
    // 
    // a.download = fileName
    a.click();
            const response = await fetch('/capture/createPost', {
              method: 'POST',
              body: formData,
              enctype: 'multipart/form-data',
            });
          
            if (response.ok) {
              const data = await response.json();
              uploadForm.style.display = 'none';
              successMessage.style.display = 'block';

              //not  using the url from cloudinary because it adds complexity
              //downloadLink.href = data.media.replace(".mkv", ".mp4").replace("/upload/", "/upload/f_mp4/"); // changed from data.videoUrl
              //downloadLink.href = data.media + "/video/upload/f_mp4/" + data.public_id + ".mp4"
              //const downloadUrl = data.media.replace(".mkv", ".webm").replace("/upload/", "/upload/f_webm/")
              downloadLink.href = url
              document.getElementById('downloadLink').textContent = `${fileName}.webm`;
              document.getElementById('downloadLink').download = `${fileName}.webm`
            console.log('dataURL', data.media)
          
              //const fileInput = document.getElementById('videoBlob');
                //videoBlobInput.value =url;
                console.log('fileurl', url)
                console.log('dataOutput', data)

               
                //   downloadLink.href = url;
                //   document.getElementById('downloadLink').textContent = `${fileName}.webm`;
                //   document.getElementById('downloadLink').download = `${fileName}.webm`
                //   const fileInput = document.getElementById('videoBlob');
                //     fileInput.value =url;
                //     console.log(url)
            }
          }
    }
    
    
}


// ########new testing for script
// const video = document.getElementById('video');
// const startButton = document.getElementById('start-btn');
// const stopButton = document.getElementById('stop-btn');
// //const uploadForm = document.getElemenById('uploadForm')
// let mediaRecorder;
// let recordedBlobs;

// navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//   .then(stream => {
//     video.srcObject = stream;
//     mediaRecorder = new MediaRecorder(stream);
//     recordedBlobs = [];

//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data && event.data.size > 0) {
//         recordedBlobs.push(event.data);
//       }
//     };

//     startButton.addEventListener('click', () => {
//       recordedBlobs = [];
//       mediaRecorder.start();
//       startButton.disabled = true;
//       stopButton.disabled = false;
//     });

//     stopButton.addEventListener('click', async () => {
//       mediaRecorder.stop();
//       startButton.disabled = false;
//       stopButton.disabled = true;
//       const blob = new Blob(recordedBlobs, { type: 'video/webm' });
//       console.log(blob)
//       const formData = new FormData();
//       formData.append('video', blob);
//       console.log(URL.createObjectURL(blob))
//       const a = document.createElement('a');
//       let fileName = Date.now()
//       a.style = 'display: none';
//       a.href = URL.createObjectURL(blob)
//       a.download = `${fileName}.webm`
//       a.click()
//     //   const response = await fetch('capture/upload', { method: 'POST', body: formData });
//     //   alert('Video uploaded');
//     });
//   })
//   .catch(error => console.error('getUserMedia() error', error));


