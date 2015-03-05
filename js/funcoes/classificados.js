


function classificados(){
apagarMSGs();
carregar('ativar');

$.post(URLBASE+'querys/categoriaClassificados.php', {}, function(data) {
				$('#categorias_classificados').html(data);
		});

	var lista = '';
	$.post(URLBASE+'classificados.php', {acao:'todos', id:idmorador()}, function(data) {
				var x = 0;									
					$.each( data, function( ) {
						
						lista += '	 <li onclick="abrirCoollapsible(this);" style="padding-left:5px;margin:5px 20px; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista += '		<a href="#"><h2 style="color: #FFF;text-shadow: none;">'+data[x].produto+'<img src="img/btn/classificados.png" align="right" style="margin: 0px 0px;"></h2></a>';
						lista +=	'<form style="display:none" >';
						lista += '	 	<br><center><img src="'+data[x].banner+'"></center><br><br>';
						lista += '	 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">PUBLICADO EM :'+data[x].data+'</h3><br>';
						lista += '	 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">VENDEDOR :'+data[x].vendedor+' - '+data[x].quem_vende+' </h3><br>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">VALOR: R$'+data[x].preco+'</h3><br>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DESCRIÇÃO</h3> <p style="color:#fff">'+data[x].descricao+'</p>';
						lista += '		<a href="#popupLogin" data-rel="popup" data-position-to="window" class="ui-btn" onClick="enviarmsgAnuncio('+data[x].id+');">Enviar Mensagem</a>';
						lista += ' </form>';
						lista += '	</li>';
						x++;
						
					});
					$('#listaeventos').html(lista);
					$('#listaeventos').listview("refresh");
					carregar('desativar');
		}, 'json');
						

}
function enviarmsgAnuncio(id){
	$("#id_classificado").val(id);
	$("#morador_classificados").val(idmorador());
}
function enviarMensagem(){
apagarMSGs();
	var options = { 
		success:function(data) { 
			$.each( data, function( ) {
					
											
						if(data.status){
							$('.msgsucesso_classificados p').html(data.mensagem);
							$('.msgsucesso_classificados').css('display','block');
						}else{
							$('.msgsucesso_classificados p').html(data.mensagem)
							$('.msgsucesso_classificados').css('display','block');
						}
						carregar('desativar');
						window.location = "##classificados";
					
					}); 
		} 
	}; 
	
	
	
		carregar('ativar');
		$('#form_classificados').ajaxSubmit(options);
	
	
	
	return false;

}
function pesquisaClassificados(){
var lista = '';
carregar('ativar');
$.post(URLBASE+'classificados.php', {acao:'pesquisa', id:idmorador(), cat:$('#categorias_classificados').val()}, function(data) {
				var x = 0;									
					$.each( data, function( ) {
						
						lista += '	 <li onclick="abrirCoollapsible(this);" style="padding-left:5px;margin:5px 20px; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista += '		<a href="#"><h2 style="color: #FFF;text-shadow: none;">'+data[x].produto+'<img src="img/btn/classificados.png" align="right" style="margin: 0px 0px;"></h2></a>';
						lista +=	'<form style="display:none" >';
						lista += '	 	<img src="'+data[x].data+'"><br>';
						lista += '	 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">PUBLICADO EM :'+data[x].data+'</h3><br>';
						lista += '	 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">VENDEDOR :'+data[x].vendedor+' - '+data[x].quem_vende+' </h3><br>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">VALOR: R$'+data[x].preco+'</h3><br>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DESCRIÇÃO</h3> <p style="color:#fff">'+data[x].descricao+'</p>';
						lista += '		<a href="#popupLogin" data-rel="popup" data-position-to="window" class="ui-btn" onClick="enviarmsgAnuncio('+data[x]+');">Enviar Mensagem</a>';
						lista += ' </form>';
						lista += '	</li>';
						x++;
						
					});
					$('#listaeventos').html(lista);
					$('#listaeventos').listview("refresh");
					carregar('desativar');
		}, 'json');

}