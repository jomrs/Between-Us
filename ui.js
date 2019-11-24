

setTimeout(() => {
  document.getElementById("idPeer").innerHTML ="Seu id: " + peer.id;
  console.log("Id peer atual:", peer.id);
}, 3000);	


// conectar modal, códigos para manipular a conexão
$( "#connect" ).click(function( event ) {
  var idReceptor = $('#form-appid').val();
  conectar(idReceptor);
  
});

function conectar(idReceptor){
  console.log("conectando ao id:", idReceptor);
  conn = peer.connect(idReceptor);
  conn.on('open', function () {
    chamar(idReceptor); //chama a função pra ligar
  });
  
  $("#modalForm").modal("hide");
}

// UI buttons
function enableUiControls() {

  $("#mic-btn").prop("disabled", false);
  $("#video-btn").prop("disabled", false);
  $("#exit-btn").prop("disabled", false);
}

$("#mic-btn").click(function(){

  toggleBtn($("#mic-btn")); // altera a cor do botao microfone
  $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // altera o icone para cortado
  enviaDados('audio '+$("#mic-icon").hasClass('fa-microphone'));
  
});

$("#video-btn").click(function(){

  toggleBtn($("#video-btn")); // altera a cor do botao video
  $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // altera o icone para cortado
  enviaDados('video '+$("#video-icon").hasClass('fa-video'));
  toggleVideoLocal(myStream);

});

$("#exit-btn").click(function(){ // desonectar e forçar a desconexão com o peer no qual está conectado

  enviaDados("desconectar");
  peer.disconnect();
  location.reload();
});

function toggleBtn(btn){
  btn.toggleClass('btn-dark').toggleClass('btn-danger');
}

function toggleVisibility(elementID, visible) {
  if (visible) {
    $(elementID).attr("style", "display:block");
  } else {
    $(elementID).attr("style", "display:none");
  }
}

function toggleVideoLocal(st) {
  
  if ($("#video-icon").hasClass('fa-video')) {
    st.getVideoTracks()[0].enabled = true;  // enable the local video
  } else {
    st.getVideoTracks()[0].enabled = false; // disable the local video
  }
}

function toggleMicGlobal(st,cond) {
  
  st.getAudioTracks()[0].enabled = cond; // enable/disable the global mic
  
}

function toggleVideoGlobal(st,cond) {

  st.getVideoTracks()[0].enabled = cond; // enable/disable the global video
  
}

function disconnect(){
  peer.disconnect();
  location.reload();
}