
//variables
let peer = new Peer();
let conn;
let modal_conect = document.querySelector("section.connect");
let bttn_chamada = document.querySelector("button.id_peer");
let bttn_phone = document.querySelector("#imgcall");



//pegar o campo dos ids
const outro_peer = () => { return document.querySelector("input[name='id_conecta']").value; };

//adicionar o id do peer atual
setTimeout(()=>{
    document.querySelector('.id_peer').value = peer.id;
    console.log("Id peer atual:", peer.id);
}, 3000);

// == adicionar eventos
bttn_chamada.addEventListener("click", () =>{ conectar(outro_peer()); ct_modal("none");});
bttn_phone.addEventListener("click", () =>{ct_modal("");});

// == Códigos para manipular a conexão
const conectar = (id_passado) => {
    console.log("conectando ao id:", id_passado);
    conn = peer.connect(id_passado);
    // on open will be launch when you successfully connect to PeerServer

    conn.on('open', function(){
      // here you have conn.id
      conn.send('estamos conectados agora!!');

      //mediaCall
      // Prefer camera resolution nearest to 1280x720.
      var constraints = { audio: true, video: { width: 1280, height: 720 } }; 

      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
        var call = peer.call(id_passado, mediaStream);
        var video = document.querySelector('#video1');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      }).catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.v

    });
};

//mandar mensagens
const mandar_msg = (texto) => {
    conn.send(texto);
}

// itera para o peer continuar recebendo!
peer.on('connection', function(conn) {
    conn.on('data', function(data){
      // printa a mensagem
      console.log(data);
    });
});

//answer mediaCall
peer.on('call', function(call) {
    var constraints = { audio: true, video: { width: 1280, height: 720 } }; 

    navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
    
      call.answer(mediaStream); // Answer the call with an A/V stream.
      call.on('stream', function(remoteStream) {
        var video2 = document.querySelector('#video2');
        video2.srcObject = mediaStream;
        video2.onloadedmetadata = function(e) {
          video2.play();
        };  
      });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
});

//when page loads here is when moddal will appears!
const ct_modal = (opt) => { modal_conect.style["display"] = opt; };

window.onload = () => { ct_modal(""); };

