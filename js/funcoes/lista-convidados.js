function addMais(){
			var quant = $('.quantPessoas').val();
			var num = parseInt(quant)+1;
			var msg= '<br><label for="convidados" class="letra">CONVIDADO '+num+':</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" name="nomepessoa[]" id="nome_form_lista_convidados_pessoas'+num+'" value="" placeholder="DIGITE O NOME DO CONVIDADO"></div><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" class="celphones9digits" name="telefone[]" id="telefone_form_lista_convidados'+num+'" value="" placeholder="DIGITE O TELEFONE"></div><a href="#contatosListas" onClick="chamarListaTelefonica('+num+');" data-rel="popup" data-position-to="window" class="ui-btn" data-transition="pop">Puxar da Lista de Contatos</a><div class="addMais'+num+'"></div>';
			var add = ".addMais"+quant;
			$(add).html(msg);
			$('.quantPessoas').val(num);	

		
			return false;
		}
function excluirPessoa(d){
var id = $(d).attr('data-id');
			var sala = $.post( URLBASE+"querys/excluir_pessoa.php",{id:id}, function() {		
			})			 
			.always(function(data) {				
				if(data == 1){
					var idd = "#pessoa"+id;
					$(idd).fadeOut( "slow");
				
				}			
			});		
		return false;
		}
function editarPessoa (d){
			var id = $(d).attr('data-id');
			var val = $(d).html();
			alert
			if(val == "EDITAR"){
				var idd = "#pessoa"+id;
				var nome2 = idd+" h3";
				var nome = $(nome2).html();
				$(nome2).html("<input type='text' style='width:100%' value='"+nome+"' id='nomePessoa' class='campo_nome'>");
				var tel2 = idd+" span";
				var telefone = $(tel2).html();
				$(tel2).html("<input type='text' style='width:100%' value='"+telefone+"' id='TelefonePessoa' class='campo_telefone'>");
				
				
				
				$(d).html("SALVAR");		
			}else if(val == "SALVAR"){
				var idd = "#pessoa"+id;
				var nome2 = idd+" #nomePessoa";
				var nome = $(nome2).val();
				var tel2 = idd+" #TelefonePessoa";
				var tel = $(tel2).val();
				
				var sala = $.post( URLBASE+"querys/editar_pessoa.php",{id:id,nome:nome,tel:tel}, function() {		
				})			 
				.always(function(data) {				
					if(data == 1){
						var nome2 = idd+" h3";
						$(nome2).html(nome);
						var tel2 = idd+" span";
						$(tel2).html(tel);
						$(d).html("EDITAR");
					}			
				});		
			
			
			
			}

			return false;
			}



/*
function listarRegistros(){

	alert(1);
  var fields       = ["id","displayName", "name", "phoneNumbers"];
  var options      = new ContactFindOptions();
  options.filter   = "";
  options.multiple = true;

  navigator.contacts.find(fields, MostrarLista, onError, options);
  alert(2);
}

function onError(contactError) {
  alert('Erro' + contactError.code);
}
function MostrarLista(ContatosArray){

  var lista = '';
alert(ContatosArray.length);
  for (var i = 0; i < ContatosArray.length; i++) {
		
		if(ContatosArray[i].phoneNumbers[0].value){
	   lista += '<li><a href="#"> '+ ContatosArray[i].name.familyName+'('+ContatosArray[i].phoneNumbers[0].value+')</a></li>';
		}
  }
	alert(1);
	alert(lista);
 $('#listaTelefonica').html(lista);
					$('#listaTelefonica').listview("refresh");

}






function listarRegistros(){
   var options = new ContactFindOptions();
   options.filter="";
   options.filter="";
   options.multiple=true;
   var fields = ["*"];  //"*" will return all contact fields
   navigator.contacts.find(fields, onSuccessContato, onErrorContato, options);
}

// display the address information for all contacts
function onSuccessContato(contacts) {
	alert(1);
  //console.log(JSON.stringify(contacts))
   var li = '';
   $.each(contacts, function(key, value) {
        if(value.name){
            $.each(value.name, function(key, value) {
               if(key == 'formatted'){
                   name = value;
               }                      
            });
        }
        if(value.phoneNumbers){
            $.each(value.phoneNumbers, function(key, value) {
                phone = value.value;
            });
        }     
        li += '<li><a href="#">'+name+' '+phone+'</a></li>';
   }); 

   $("#contact").html(li);  
}

function onErrorContato(contactError) {
   alert('onError!');
}
*/


function chamarListaConvidados(){
apagarMSGs();
	var lista = '';
	
	carregar('desativar');
	$.post(URLBASE+'lista_convidados.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						carregar('ativar');
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:5px; min-height:0; margin:5px 20px;" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista += '		<a href="" class="link"><h2> '+data[x].nome+' <img src="img/btn/lista_convidados_pequena.png" align="right" style="margin: 0px 0px;"> ';
						lista += ' </h2> </a>';
						lista += '  <form style="display:none">';
						lista +=	'<div class="ui-collapsible-content ui-body-inherit" aria-hidden="false">	';								
						lista += ' 	<h3 style="color:#FFF; text-shadow: none;text-align:center;font-size:20px;">'+data[x].nome+'</h3>';
						lista += ' 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">PUBLICADO EM :31/10/2014</h3><br>';
						lista += ' 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DATA DA VISITA E LOCAL</h3>';
						lista += ' 	<h3 style="text-shadow: none; color: #FFF;">Data e hora de Inicio:'+data[x].data_entrada+' ás '+data[x].hora_entrada+'</h3>';
						lista += '	<h3 style="text-shadow: none; color: #FFF;">Data e hora de Terminio:'+data[x].data_saida+' ás '+data[x].hora_saida+'</h3>';
						lista += '	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">LISTA DE CONVIDADOS</h3>	';
						lista += 	'   <a href="#form_lista_convidados" onClick="editarLista('+data[x].ID+')" style="margin: 0; margin-top: 10px;" id="btn-list-detalhe" class="ui-btn ui-corner-all">DETALHES</a>';
						lista += 	' 	<a href="#" onClick="CancelarLista('+data[x].ID+');" id="btn-list" style="background-color:#820d12;border-color:#820d12; " class="ui-btn ui-corner-all">CANCELAR</a>';
						lista += ' </form>';
						lista +=  '</li>';
						
						x++;
					});
					$('#listarconvidados').html(lista);
					$('#listarconvidados').listview("refresh");
					carregar('desativar');
		}, 'json');
						

}



function CancelarLista(id){
apagarMSGs();


navigator.notification.confirm(
    'Deseja Cancelar?', // message
     function(ex){
		if(ex == true){
			$.post(URLBASE+'lista_convidados.php', {id:id, acao:'excluir'}, function(data) {
						var x = 0;
							$.each( data, function( ) {
								
								chamarListaConvidados();
													
								if(data.status){
									$('.msgsucesso_meus_convidados p').html(data.mensagem);
									$('.msgsucesso_meus_convidados').css('display','block');
								}else{
									$('.msgerro_meus_convidados p').html(data.mensagem)
									$('.msgerro_meus_convidados').css('display','block');
								}
								window.location = "#lista_convidados";
							})
			})
			}
	 },            // callback to invoke with index of button pressed
    'iCondominio',           // title
    ['Sim','Não']     // buttonLabels
);

};
function novaLista(){
apagarMSGs();
//listarRegistros();
	$('#id_form_lista_convidados').val(idmorador());
	$('#acao_form_lista_convidados').val('novo');
	$('#nome_form_lista_convidados').val('');
			
		$('#palavra_form_lista_convidados').val('');			
		$('#data_entrada_form_lista_convidados').attr('type','datetime-local');
		$('#data_entrada_form_lista_convidados').val('');
				
		$('#data_saida_form_lista_convidados').attr('type','datetime-local');
		$('#data_saida_form_lista_convidados').val('');
				
	
	
	$('.tudosOsConvidados').html($('.convidadeEditar').html());
	$('.quantPessoas').val(1);
	if($('#nome_form_lista_convidados').attr('disabled')){
		$('#nome_form_lista_convidados').removeAttr('disabled');
		$('#palavra_form_lista_convidados').removeAttr('disabled');
		$('#data_entrada_form_lista_convidados').removeAttr('disabled');
		$('#data_saida_form_lista_convidados').removeAttr('disabled');
	}

}

function editarLista(id){
apagarMSGs();
	novaLista();
	$('#id_form_lista_convidados').val(id);
	$('#acao_form_lista_convidados').val('editar');
	$.post(URLBASE+'lista_convidados.php', {acao:'retornar', id:id}, function(data) {			
		$('#nome_form_lista_convidados').val(data.nome);
		$('#palavra_form_lista_convidados').val(data.palavra);
			$('#data_entrada_form_lista_convidados').val(data.data_entrada+'T'+data.hora_entrada);
			$('#data_saida_form_lista_convidados').val(data.data_saida+'T'+data.hora_saida);
		
		$.post(URLBASE+'querys/listar_convidados.php', { id:data.ID}, function(data) { 
					$('.tudosOsConvidados').html(data+'<div class="addMais1"></div>');
		
		
		});
	});

}

function registrarListaConvidados(){

	apagarMSGs();
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						chamarListaConvidados();
											
						if(data.status){
							$('.msgsucesso_meus_convidados p').html(data.mensagem);
							$('.msgsucesso_meus_convidados').css('display','block');
						}else{
							$('.msgerro_meus_convidados p').html(data.mensagem)
							$('.msgerro_meus_convidados').css('display','block');
						}
						carregar('desativar');
						window.location = "#lista_convidados";
					
					}); 
		} 
	}; 
	
	if(validarFormularios('formulario_lista_convidados') == true){
		carregar('ativar');
		$('#formulario_lista_convidados').ajaxSubmit(options);
	
	}
	
	return false;
}
	
	
