

setTimeout(() => {
  document.getElementById("idPeer").innerHTML ="Seu id: " + peer.id;
  console.log("Id peer atual:", peer.id);
}, 3000);	


// conectar modal, códigos para manipular a conexão
$( "#connect" ).click(function( event ) {
  var idReceptor = $('#form-appid').val();
  console.log("conectando ao id:", idReceptor);
  conn = peer.connect(idReceptor);
  conn.on('open', function () {
    // here you have conn.id
    conn.send('estamos conectados agora!');
    chamar(idReceptor); //chama a função pra ligar
  });
  $("#modalForm").modal("hide");
  
});

// UI buttons
function enableUiControls() {

  $("#mic-btn").prop("disabled", false);
  $("#video-btn").prop("disabled", false);
  $("#exit-btn").prop("disabled", false);
}

$("#mic-btn").click(function(){

  toggleBtn($("#mic-btn")); // altera a cor do botao microfone
  $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // altera o icone para cortado
  toggleMic(s);

});

$("#video-btn").click(function(){

  toggleBtn($("#video-btn")); // altera a cor do botao video
  $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // altera o icone para cortado
  toggleVideo(s);

});

$("#exit-btn").click(function(){ // botao de desligar chamada
  console.log("so sad to see you leave the channel");
  desligarChamada(); 
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

function toggleMic(st) {
  
  if ($("#mic-icon").hasClass('fa-microphone')) {
    st.getAudioTracks()[0].enabled = true; // enable the local mic
    toggleVisibility("#mute-overlay", false); // hide the muted mic icon
  } else {
    st.getAudioTracks()[0].enabled = false; // mute the local mic
    toggleVisibility("#mute-overlay", true); // show the muted mic icon
  }
}

function toggleVideo(st) {
  
  if ($("#video-icon").hasClass('fa-video')) {
    st.getVideoTracks()[0].enabled = true;  // enable the local video
    toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
  } else {
    st.getVideoTracks()[0].enabled = false; // disable the local video
    toggleVisibility("#no-local-video", true); // show the user icon when video is disabled
  }
}