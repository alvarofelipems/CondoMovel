


function meus_eventos(){
apagarMSGs();
carregar('ativar');
	var lista = '';
	$.post(URLBASE+'eventos.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;									
					$.each( data, function( ) {
						
						lista += '	 <li onclick="abrirCoollapsible(this);" style="padding-left:5px;margin:5px 20px; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista += '		<a href="#"><h2 style="color: #FFF;text-shadow: none;">'+data[x].nome+'<img src="img/btn/eventos.png" align="right" style="margin: 0px 0px;"></h2></a>';
						lista +=	'<form style="display:none" >';
						lista += ' 		<center><img src="'+data[x].foto+'"></center>';
						lista += ' 		<h1 style="color:#FFF; text-shadow: none;text-align:center;font-size:20px;">'+data[x].nome+'</h1>';
						lista += '	 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">PUBLICADO EM :'+data[x].data_cadastro+'</h3><br>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DESCRIÇÃO DO EVENTO</h3>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">'+data[x].descricao+'</h4>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DATA DO EVENTO E LOCAL</h3>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">Data e hora de Inicio:'+data[x].data_inicio+' ás '+data[x].hora_inicio+'</h4>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">Data e hora de Termino:'+data[x].data_fim+' ás '+data[x].hora_fim+'</h4>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">Local:'+data[x].local+'</h4>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">Evento Para: '+data[x].eventopara+'</h4>';
						lista += ' </form>';
						lista += '	</li>';
						x++;
						
					});
					$('#eventoslistagem').html(lista);
					$('#eventoslistagem').listview("refresh");
					carregar('desativar');
		}, 'json');
						

}
