// document.getElementById('record-link').onclick= function ()

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

    document.getElementById('stop-btn').onclick = function (){
        document.querySelector('#message').innerText='Recording STOPPED, upload recording to Memwa';
        mediaRecorder.stop();
        let vidSave = document.getElementById('vid2')
        document.getElementById("demo").innerHTML = "I have changed!";
        let blob = new Blob(parts, {
            type: 'video/mp4'
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
        a.download = `${fileName}.mp4`;
        // 
        // a.download = fileName
        a.click();
        vidSave.src = url;// create  a new location for file name also

    }
}
