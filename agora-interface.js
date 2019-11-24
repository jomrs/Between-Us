/*
 * JS Interface for PeerJs brabos ulbra
 */
let peer = new Peer();
let myStream;
let conStream;


navigator.getUserMedia = navigator.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;

function isHidden(el) {
  return (el.offsetParent === null)
}

//chamada de video
function chamar(idReceptor){
  
  navigator.getUserMedia({ video: true, audio: true }, function (stream) {
    
  peer.call(idReceptor, stream);
    
  }, function (err) {
    console.log('Failed to get local stream', err);
  });
};

//mandar mensagens
const enviaDados = (dados) => {
  conn.send(dados);
}

// itera para o peer continuar recebendo!
peer.on('connection', function (conn) {
  conn.on('data', function (data) {
    console.log(data);
    if(data != null){
      if (data == 'video true' ){
        toggleVideoGlobal(conStream,true);
      }
      else if (data == 'video false'){
        toggleVideoGlobal(conStream,false);
      }
      else if (data == 'audio true'){
        toggleMicGlobal(conStream,true)
      }
      else if (data == 'audio false'){
        toggleMicGlobal(conStream,false);
      }
    };
  });
});

//responder chamada de video
peer.on('call', function (call) {
  
  navigator.getUserMedia({ video: true, audio: true }, function (stream) {
    call.answer(stream); // Responder a chamada com um stream de audio e video.

    var video = document.querySelector('video#local-video');
      video.srcObject = stream;

      video.onloadedmetadata = function (e) {
        video.play();
      };

    call.on('stream', function (remoteStream) {
  
        var video2 = document.querySelector('video#full-screen-video');

        myStream = stream;
        conStream = remoteStream;

        video2.srcObject = remoteStream;
        video2.onloadedmetadata = function (e) {
          video2.play();
        };
        enableUiControls();
    });
    
  }, function (err) {
    console.log('Failed to get local stream', err);
  });
});

