//variables
let peer = new Peer();
let conn;

//pegar o campo dos ids
const outro_peer = () => { return document.querySelector("input[name='id_conecta']").value; };

//adicionar o id do peer atual
setTimeout(()=>{
    document.querySelector('#id_peer').value = peer.id;
    console.log("Id peer atual:", peer.id);
}, 3000);

// == adicionar eventos
document.querySelector("button#id_peer").addEventListener("click", () =>{ conectar(outro_peer());});

// == Códigos para manipular a conexão
const conectar = (id_passado) => {
    console.log("conectando ao id:", id_passado);
    conn = peer.connect(id_passado);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function(){
    // here you have conn.id
    conn.send('estamos conectados agora!!');
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
