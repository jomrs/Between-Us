// Ao carregar a página, aguarda 3 segundos e muda o elemento pra mostrar o peer.id e 
//chama a funcao pra pegar o stream atual
setTimeout(() => {

  document.getElementById("idPeer").innerHTML ="Seu id: " + peer.id;
  console.log("Id peer atual:", peer.id);
  pegaStream();
}, 3000

);	


// Chama a funcao de conectar com idReceptor informado como parâmetro
$( "#connect" ).click(function( event ) {

  var idReceptor = $('#form-appid').val();
  conectar(idReceptor);

});

// Conecta o peer atual ao peer especificados
function conectar(idReceptor){

  console.log("conectando ao id:", idReceptor);
  conn = peer.connect(idReceptor);
  conn.on('open', function () {
    chamar(idReceptor); //chama a função pra ligar
  });
  $("#modalForm").modal("hide"); // Esconde o modal 

};

// Ativa botoões (chamada após conexão efetuada)
function enableUiControls() {

  $("#mic-btn").prop("disabled", false);
  $("#video-btn").prop("disabled", false);
  $("#exit-btn").prop("disabled", false);

}

// Manipula botao de microfone
$("#mic-btn").click(function(){

  toggleBtn($("#mic-btn")); // altera a cor do botao microfone
  $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // altera o icone para cortado
  enviaDados('audio '+$("#mic-icon").hasClass('fa-microphone'));

});

// Manipula botão de vídeo
$("#video-btn").click(function(){

  toggleBtn($("#video-btn")); // altera a cor do botao video
  $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // altera o icone para cortado
  enviaDados('video '+$("#video-icon").hasClass('fa-video'));
  toggleVideoLocal(myStream);

});

// Desconectar e forçar a desconexão com o peer no qual está conectado
$("#exit-btn").click(function(){ 

  enviaDados("desconectar");
  peer.disconnect();
  location.reload();

});

// Altera a cor do botão passado para vermelho
function toggleBtn(btn){

  btn.toggleClass('btn-dark').toggleClass('btn-danger');

};

// Ativar/Desativar o vídeo local (pop-up de video)
function toggleVideoLocal(st) {
  
  if ($("#video-icon").hasClass('fa-video')) {
    st.getVideoTracks()[0].enabled = true; 
  } else {
    st.getVideoTracks()[0].enabled = false; 
  }

};

// Ativar/Desativar o microfone global (do emissor)
function toggleMicGlobal(st,cond) {

  st.getAudioTracks()[0].enabled = cond; 

};

// Ativar/Desativar o video global (do emissor)
function toggleVideoGlobal(st,cond) {

  st.getVideoTracks()[0].enabled = cond;

}

// Desconectar de todos os peers conectados
function disconnect(){

  peer.disconnect();
  location.reload();

}