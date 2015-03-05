


function foruns(){
apagarMSGs();
carregar('ativar');
	var lista = '';
	$.post(URLBASE+'forum.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;									
					$.each( data, function( ) {
						
						lista += '	 <li onclick="abrirCoollapsible(this);" style="padding-left:5px;margin:5px 20px; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista += '		<a href="#detalhe_topico" onClick="detalheTopico('+data[x].ID+');" ><h2 style="color: #FFF;text-shadow: none;">'+data[x].nome+'<img src="img/btn/forum.png" align="right" style="margin: 0px 0px;"></h2></a>';
						lista += '	</li>';
						x++;
						
					});
					$('#listaforum').html(lista);
					$('#listaforum').listview("refresh");
					carregar('desativar');
		}, 'json');
						

}


function registrarForum(){
apagarMSGs();
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						foruns();
											
						if(data.status){
							$('.msgsucesso_forum p').html(data.mensagem);
							$('.msgsucesso_forum').css('display','block');
						}else{
							
						}
						carregar('desativar');
						window.location = "#forum";
					
					}); 
		} 
	}; 
	
	if(validarFormularios('form_adicionar_forum') == true){
		carregar('ativar');
		$('#form_adicionar_forum').ajaxSubmit(options);
	}
	
	
	return false;
}


function detalheTopico(id){
	var lista = '';
	$.post(URLBASE+'dentro_topico.php', {id:id}, function(data) {
			$('#DetalheDoForum').html(data);
		});
						

}


	

	function enviarMsg(id){
	
			var msg = $("#msgEnviar").val();
			
			var sala = $.post( URLBASE+"querys/query_adicionar_msg.php",{msg:msg,topico:id,idMorador:idmorador()}, function() {		
			})			 
			.always(function(data) {
				if(data == 1){
					detalheTopico(id);	
					$("#msgEnviar").val('');
				}				
			});	
	return false;
	}
