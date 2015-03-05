var myPosition = [];
myPosition['error'] = true;
var watchID;



function lerGPS() {
	console.log("navigator.geolocation works well");
	watchID = navigator.geolocation.watchPosition(setPosition, GPSError, { timeout: 5000, enableHighAccuracy: true, maximumAge: 90000 });
}


function setPosition(position) {
	myPosition['latitude'] = position.coords.latitude;
	myPosition['longitude'] = position.coords.longitude;
	myPosition['error'] = false;
	console.log(myPosition);
}

function GPSError(error) {
	myPosition['error'] = error.code;
}

function listarPortas(){
lerGPS();
apagarMSGs();
carregar('ativar');
	var lista = '';

		$.post(URLBASE+'abrir_portao.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
				var y = 1;
				var situacao = '';
					$.each( data, function( ) {
						
						
						lista += ' <li onclick="abrirPortao('+data[x].ID+');" style="padding-left:5px; min-height:0; margin:5px 20px;" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false" data-latitude="-18.121315">';
						lista +=	' <a href="#">'+data[x].nome;
						lista +=  '</a></li>';

					
					
						y++;
						x++;
					});
					$('#listaportao').html(lista);
					$('#listaportao').listview("refresh");
					carregar('desativar');
		}, 'json');
		
	
						

}

function abrirPortao(id){
	console.log(myPosition);
	apagarMSGs();

	var lista = '';
	if(myPosition['error'])
		alert('O GPS deve estar ativo para utilizar esta função');
	else {
		carregar('ativar');
		$.post(URLBASE+'abrir_portao.php', {acao:'acionar', id:idmorador(), id_portao:id, latitude:myPosition['latitude'], longitude:myPosition['longitude']}, function(data) {

				var situacao = '';
					$.each( data, function( ) {
						
						
						if(data.status){
							$('.msgsucesso_portao p').html(data.mensagem);
							$('.msgsucesso_portao').css('display','block');
						}else{
							$('.msgerro_portao p').html(data.mensagem)
							$('.msgerro_portao').css('display','block');
						}
						
					
					
						
					});
					carregar('desativar');
		}, 'json');
	}
}

	