
 function capturarImagemAnimal(){
      navigator.camera.getPicture(uploadPhotoAnimal, function(message) {
			$('#validar_form_animal').val(0);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.CAMERA,
			correctOrientation:true,
			AllowEdit: true
		}
            );
            }
 function PegarImagemAnimal(){
      navigator.camera.getPicture(uploadPhotoAnimal, function(message) {
			$('#validar_form_animal').val(0);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
			correctOrientation:true,
			AllowEdit: true
		}
            );
            }
 function uploadPhotoAnimal(imageURI) {
			$('#foto_animal_editar').attr('src',imageURI);
			carregar('ativar');
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
            options.params = params;
            options.chunkedMode = false;
 
            var ft = new FileTransfer();
            ft.upload(imageURI, "http://lomatech.com.br/app/uploadAnimal.php", winAnimal, failAnimal, options);
        }
 
        function winAnimal(r) {
			$("#arquivoMeusAnimais").val(r.response);
            carregar('desativar');
        }
 
        function failAnimal(error) {
			$('#foto_animal_editar').attr('src','');
			carregar('desativar');
        }
















function carregar(a){
	
	if(a == 'ativar'){
		 $('html,body').animate({scrollTop: 0},'slow');	
		$(".preca").css("display","block");
		$("html").css("overflow","hidden");
	}else{
		$(".preca").css("display","none");
		$("html").css("overflow","visible");
	}
	
	
}

function Animal(ID){
apagarMSGs();
$.post(URLBASE+'meu_animais.php', {acao:'retornar', id:ID()}, function(data) {
					$.each( data, function( ) {
						
						
					})
		}, 'json');

}
function meusanimais(){
apagarMSGs();
carregar('ativar');
	var lista = '';
	var resposta = '';
	$.post(URLBASE+'meu_animais.php', {acao:'retornarTodos', id_morador:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						
					
						
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:5px; min-height:0; margin:5px 20px;" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="" class="link"><h2>'+data[x].nome_animal;
						lista +=	'<img src="img/icones/icone-bino.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form class="l" style="display:none" >';
						lista +=	  '<fieldset data-role="controlgroup" data-type="horizontal">';
						lista +=		'<a href="#form_meus_animais" onClick="chamarAnimal('+data[x].ID+');" style="margin:5px;" id="btn-list-detalhe" class="ui-btn ui-corner-all">Detalhes/Editar</a>';
						lista +=		'<a href="#" onClick="excluirAnimal('+data[x].ID+');" id="btn-list" style="margin:5px; margin-top:15px;background-color:#820d12; border-color:#820d12;" class="ui-btn ui-corner-all">Excluir</a>	';
						lista +=	 ' </fieldset>';
						lista +=	'</form>';
						lista +=  '</li>';
					
						x++;
					});
					
					
					$('.produtos').html(lista);
					$('.produtos').listview("refresh");
					$( ".miranda" ).collapsibleset( "refresh" );
					carregar('desativar');
		}, 'json');

}
// funções de inicialização
	
		//verificar meus dados
			
			
	//fim
function excluirAnimal(ID){
apagarMSGs();
navigator.notification.confirm(
    'Deseja Excluir?', // message
     function(ex){
if(ex == true){
	carregar('ativar');
	$.post(URLBASE+'meu_animais.php', {id:ID, acao:'excluir'}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						meusanimais();
											
						if(data.status){
							$('.msgerro_meus_animais p').html(data.mensagem);
							$('.msgerro_meus_animais').css('display','block');
						}else{
							$('.msgerro_meus_animais p').html(data.mensagem)
							$('.msgerro_meus_animais').css('display','block');
						}
						carregar('desatuvar');
						window.location = "#meus_animais";
					})
	})
}
},            // callback to invoke with index of button pressed
    'iCondominio',           // title
    ['Sim','Não']     // buttonLabels
);
}
$(function(){

	$("#tipo_form_animal").change(function(){			 
			$('#raca_form_animal').html("<option> -- Carregando --</option>");		
			var sala = $.post( URLBASE+"querys/query_select_raca.php",{animal:$(this).val()}, function() {		
			})			 
			.always(function(data) {				
				$('#raca_form_animal').html(data);			
			});		
		});	

});

function chamarAnimal(ID){
	apagarMSGs();
					carregar('ativar');
						$("#nome_animal_form_animal").val('');
						$("#cor_form_animal").val('');
						$("#tipo_form_animal").val('');
						$("#id_animal_form_animal").val('');
						$("#acao_animal_form_animal").val('');
						$("#foto_animal_editar").attr("src",'');
						$("#tipo_form_animal-button span").html('');
						$("#raca_form_animal-button span").html('');
	
	
		var resposta = "<option value=''>-- Selecione um animal --</option>";
	$.post(URLBASE+'querys/animais.php', {}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].animal+"</option>";
						x++;
					})
					$("#tipo_form_animal").html(resposta);
	})
	
	$.post(URLBASE+'meu_animais.php', {acao:'retornar', id:ID}, function(data) {
					var x = 0;
					$.each( data, function( ) {
					if(x == 0){
						$("#nome_animal_form_animal").val(data.nome_animal);
						$("#cor_form_animal").val(data.cor);
						$("#id_animal_form_animal").val(data.ID);
						$("#acao_animal_form_animal").val('editar');
						$('#tipo_form_animal').val(data.tipo);
						var tipo =  $("#tipo_form_animal option:selected").text();
						$("#tipo_form_animal-button span").html(tipo);
						$("#foto_animal_editar").attr("src",data.foto);
						var animal = data.tipo;
						var raca  = data.raca;
						

								var sala = $.post( URLBASE+'querys/animais_raca.php',{id_animal:animal,id:raca}, function() {		
								})			 
								.always(function(data) {	
									$('#raca_form_animal').html(data);	
									var raca2 =  $("#raca_form_animal option:selected").text();
									$("#raca_form_animal-button span").html(raca2);
								});
								
								
						}
						x++;
						carregar('desativar');
					})
	})
	
	
	
			
	
	

}


function editar_animal(){
	apagarMSGs();
	var options = { 
		success:function(data) { 
			$.each( data, function( ) {
					
						meusanimais();
											
						if(data.status){
							$('.msgsucesso_meus_animais p').html(data.mensagem);
							$('.msgsucesso_meus_animais').css('display','block');
						}else{
							$('.msgerro_meus_animais p').html(data.mensagem)
							$('.msgerro_meus_animais').css('display','block');
						}
						carregar('desativar');
						window.location = "#meus_animais";
					
					}); 
		} 
	}; 
	
	
	if($('#validar_form_animal').val() == 0 && validarFormularios('formulario_meus_animais') == true){
		carregar('ativar');
		$('#formulario_meus_animais').ajaxSubmit(options);
	}else{
		alert('Fazendo Upload da Imagem');
	}
	
	
	return false;
	
}
function novoAnimal(){
carregar('ativar');
	$("#nome_animal_form_animal").val('');
						$("#cor_form_animal").val('');
						$("#tipo_form_animal").val('');
						$("#id_animal_form_animal").val('');
						$("#acao_animal_form_animal").val('');
						$("#foto_animal_editar").attr("src",'');
						$("#tipo_form_animal-button span").html('');
						$("#raca_form_animal-button span").html('');
	var resposta = '<option value="">-- Selecione um animal --</option>';
	$.post(URLBASE+'querys/animais.php', {}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].animal+"</option>";
						x++;
					})
					$("#tipo_form_animal").html(resposta);
	})
	$("#acao_animal_form_animal").val('novo');
	$("#id_animal_form_animal").val(idmorador());
	carregar('desativar');
}