function logusuario(){
apagarMSGs();
carregar('ativar');
	var lista = '';
	$.post(URLBASE+'log_usuario.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
				var y = 1;
				var acao = '';
				var tabela = '';
					$.each( data, function( ) {
						
						if(y % 2 == 0){
							var classe="d";
						}else{
							var classe="e";
						}
						
								 if(data[x].acao == 'Excluir'){
								acao =  "Excluiu:";
								}
								if(data[x].acao == 'Novo'){
								acao =  "Adicionou:";
								}
								if(data[x].acao == 'Editar'){
								acao =  "Editou:";
								}
								if(data[x].tabela == 'animal_estimacao'){
								tabela = "Animal de Estimação";
								}
								if(data[x].tabela == 'dependencias'){
								tabela = "Reservas";
								}
								if(data[x].tabela == 'moradores'){
								tabela =  "Dados";
								}
								if(data[x].tabela == 'ocorrencias'){
								tabela =  "Ocorrêcia";
								}
								if(data[x].tabela == 'carros'){
								tabela = "Veículo";
								}
								if(data[x].tabela == 'lista_convidados'){
								tabela =  "Lista de Convidados";
								}
								if(data[x].tabela == 'classificados'){
								tabela =  "Anúncio";
								}
								if(data[x].tabela == 'forum'){
								tabela =  "Forum";
								}

						lista += ' <li onclick="abrirCoollapsible(this);" data-theme="'+classe+'" style="padding-left:5px; margin:5px 20px; min-height:0" data-role="collapsible" data-theme="'+classe+'" data-iconpos="right" data-inset="false">';
						lista +=	'<center><a href="#"style="text-decoration: none;color:#FFF;margin: 0px 5px;"><h2 style="text-shadow: none;  color: #FFF;background-color: #85b200;width: 100%;">'+acao+''+tabela+'</h2></center><h3 style="text-shadow: none;color:#FFF;background-color: #85b200;width: 100%;">Publicado em :'+data[x].data_cadastro+'</h3></a>';
					
						lista += ' </li>';
						
					
					
						y++;
						x++;
					});
					$('#listalogusuario').html(lista);
					$('#listalogusuario').listview("refresh");
					carregar('desativar');
		}, 'json');
						

}

	