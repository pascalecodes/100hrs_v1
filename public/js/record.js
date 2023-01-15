// document.getElementById('record-link').onclick= function ()

window.onload = function () {
    let parts =[];
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

    document.getElementById('stop-btn').onclick = function (){
        document.querySelector('#message').innerText='Recording STOPPED, upload recording to Memwa';
        mediaRecorder.stop();
        let vidSave = document.getElementById('vid2')
        let blob = new Blob(parts, {
            type: 'video/webm'
        });
        parts=[];
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = vidSave.src;
        // let fileName = document.getElementById('title')
        // a.download = fileName
        a.click();
        vidSave.src = url;// create  a new location for file name also

    }
}
