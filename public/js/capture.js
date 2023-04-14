// let mediaRecorder;
// let recordedBlobs;

// const startButton = document.getElementById('startRecording');
// const stopButton = document.getElementById('stopRecording');
// const videoElement = document.getElementById('video');
// const uploadForm = document.getElementById('uploadForm');
// const videoBlobInput = document.getElementById('videoBlob');
// const successMessage = document.getElementById('successMessage');
// const downloadLink = document.getElementById('downloadLink');
// const doneButton = document.getElementById('done');

// startButton.addEventListener('click', startRecording);
// stopButton.addEventListener('click', stopRecording);
// uploadForm.addEventListener('submit', uploadVideo);
// doneButton.addEventListener('click', () => {
//   location.reload();
// });

// async function startRecording() {
//   startButton.disabled = true;
//   stopButton.disabled = false;

//   recordedBlobs = [];
//   const mimeType = 'video/webm;codecs=vp9,opus';
//   const options = { mimeType };
//   mediaRecorder = new MediaRecorder(await getStream(), options);

//   mediaRecorder.onstop = (event) => {
//     console.log('Recorder stopped:', event);
//   };

//   mediaRecorder.ondataavailable = handleDataAvailable;
//   mediaRecorder.start(10); // Collect 10ms of data
//   console.log('MediaRecorder started', mediaRecorder);
// }

// function stopRecording() {
//   stopButton.disabled = true;
//   mediaRecorder.stop();
//   videoElement.srcObject = null;
//   uploadForm.style.display = 'block';
// }

// function handleDataAvailable(event) {
//   if (event.data && event.data.size > 0) {
//     recordedBlobs.push(event.data);
//   }
// }

// async function getStream() {
//   const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//   videoElement.srcObject = stream;
//   return stream;
// }

// async function uploadVideo(e) {
//   e.preventDefault();

//   const blob = new Blob(recordedBlobs, { type: 'video/mp4' });
//   videoBlobInput.value = await blob.arrayBuffer();

//   const formData = new FormData(uploadForm);

//   const response = await fetch('/capture/videos', {
//     method: 'POST',
//     body: formData,
//   });

//   if (response.ok) {
//     const data = await response.json();
//     uploadForm.style.display = 'none';
//     successMessage.style.display = 'block';
//     downloadLink.href = data.videoUrl;
//   }
// }


// new

const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');
const videoElement = document.getElementById('video');
const uploadForm = document.getElementById('uploadForm');
const videoBlobInput = document.getElementById('videoBlob');
const successMessage = document.getElementById('successMessage');
const downloadLink = document.getElementById('downloadLink');
const doneButton = document.getElementById('done');

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
uploadForm.addEventListener('submit', uploadVideo);
doneButton.addEventListener('click', () => {
  location.reload();
});

async function startRecording() {
  startButton.disabled = true;
  stopButton.disabled = false;

 
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  videoElement.srcObject = stream;

  const mimeType = 'video/webm;codecs=vp9,opus';
  const options = { mimeType };
  const mediaRecorder = new MediaRecorder(stream, options);

  let recordedBlobs = [];
  mediaRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  };
  mediaRecorder.start(10); // Collect 10ms of data

  stopButton.onclick = () => {
    mediaRecorder.stop();
    videoElement.srcObject = null;
    uploadForm.style.display = 'block';

    const superBuffer = new Blob(recordedBlobs, { type: 'video/webm' });
    videoBlobInput.value = URL.createObjectURL(superBuffer);
  };
}

async function uploadVideo(e) {
  e.preventDefault();

  const formData = new FormData(uploadForm);

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    uploadForm.style.display = 'none';
    successMessage.style.display = 'block';
    downloadLink.href = data.videoUrl;
    console.log(data.videoUrl)
  }
}