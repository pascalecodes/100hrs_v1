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

window.onload = function () {
    const parts =[];
    let mediaRecorder;
    navigator.mediaDevices.getUserMedia({audio:true, video: true}).then(stream => {
        document.getElementById('video').srcObject  = stream;
        document.getElementById('start-btn').onclick = function () {
            document.querySelector('#message').innerText='Recording in progress...';
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.start(100);
            
            mediaRecorder.ondataavailable = function (e) {
                parts.push(e.data);
            }
        }
    });

     const uploadForm = document.getElementById('uploadForm')

    document.getElementById('stop-btn').onclick = function (){
        document.querySelector('#message').innerText='Recording STOPPED, upload recording to Memwa';
        mediaRecorder.onstop = (event) => {
            console.log('Recoorder stopped:', event)
            uploadForm.style.display = 'block';
            }

        mediaRecorder.stop();
    
        let vidSave = document.getElementById('vid2')
        
        //document.getElementById("demo").innerHTML = "I have changed!";
        let blob = new Blob(parts, {
            type: 'video/webm'
        });
        //parts=[];
        const  url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        //const title= document.querySelector('#title').value
        let fileName = document.getElementById('title').value
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        //a.download = vidSave.src;
        a.download = `${fileName}.webm`;
        console.log(blob.tempFilePath)
        // 
        // a.download = fileName
        a.click();
        //vidSave.src = url;// create  a new location for file name also

    }
}
