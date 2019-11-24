/*
 * JS Interface for PeerJs brabos ulbra
 */
let peer = new Peer();
let myStream;
let conStream;

// Verificacao para manter a compatibilidade, cada navegador tem seu jeito de pegar
navigator.getUserMedia = navigator.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;

// Pegar o audio/video do peer atual
function pegaStream(){
  navigator.getUserMedia({ video: true, audio: true }, function (stream) {
    myStream = stream;
  });
}

//chamada de video
function chamar(idReceptor){
  peer.call(idReceptor, myStream);
};

// envio de dados
const enviaDados = (dados) => {
  conn.send(dados);
}

// constante verificacao pra ver se tem alguma coisa no buffer de entrada
peer.on('connection', function (conn) {
  conn.on('data', function (data) {
    
    // Verificacao pra poder ativar/desativar o áudio/video do emissor 
    switch (data){ 
      case 'video true' :
        toggleVideoGlobal(conStream,true);
        break;
    
      case 'video false':
        toggleVideoGlobal(conStream,false);
    
      case 'audio true':
        toggleMicGlobal(conStream,true);
        break;
      
      case 'audio false':
        toggleMicGlobal(conStream,false);
        break;
      
      case 'desconectar':
        disconnect();
        break;
    }  
  });
});

//responder chamada de video
peer.on('call', function (call) {
  var status;
  for (var conexao in peer.connections){
      status = conexao;
  }
  if (status == 'conectado'){
    console.log(status);
  }
  else{
    var conexaoAtual;
    for (var conexao in peer.connections){ //pegar o id do emissor nas conxoes que ele possui
      conexaoAtual = conexao;
    }
    peer._connections.set('conectado') //adiciona o indice 'conectado' no objeto peer.connections
    responder(call);
    conectar(conexaoAtual);
  }
});

function responder(call){
    call.answer(myStream); // Responder a chamada com um stream de audio e video.
    var video = document.querySelector('video#local-video');
    video.srcObject = myStream; // adiciona o stream no campo de vídeo
    
    video.onloadedmetadata = function (e) {
      video.play();
    };

    call.on('stream', function (remoteStream) { // Remote stream é o audio/video do peer emissor
      
        var video2 = document.querySelector('video#full-screen-video');

        conStream = remoteStream;

        video2.srcObject = remoteStream;
        video2.onloadedmetadata = function (e) {
          video2.play();
        };
        enableUiControls();
    });
}
