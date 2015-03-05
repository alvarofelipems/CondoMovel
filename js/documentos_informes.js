
function idmorador(){
	return($.cookie('IDAppLomactech'));

}
function documentos_informes(){
	var lista = '';
	$.post(URLBASE+'documentos_informes.php', {acao:'retornarTodos', id_morador:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						lista += ' <ul data-role="listview" data-filter="true" data-input="#filterBasic-input">';
						lista += ' <div class="ui-grid-b-meio">';
						lista += ' <div class="ui-bar ui-bar-b-meio" style="height:40px;" > ';
						lista += ' <img src="img/btn/doc_pequeno.png" align="right" style="margin: 10px 0px;"> ';
						lista += '<p class="apresentacao">'+data[x].titulo;
						lista += '</p>';
						lista += '<p class="apresentacao_data"><h2>30/10/2014</h2> <br><h5 style="margin-left: 13px;font-size: 12px;">08:00hrs</h5> </p>';
						lista +=	'</div>';
						lista +=	  '</div>';
						lista +=		'</ul>';
						x++;
					});
					$('#listadocumentos').html(lista);
					$('#listadocumentos').listview("refresh");
		}, 'json');
						

}
// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#documentos_informes"){
				documentos();
			}
	//fim
	