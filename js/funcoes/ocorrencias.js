
 function capturarImagemOcorrencia(){
      navigator.camera.getPicture(uploadPhotoOcorrencia, function(message) {
			$('#validar_form_Ocorrencia').val(0);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.CAMERA,
			correctOrientation:true,
			AllowEdit: true
		}
            );
            }
 function PegarImagemOcorrencia(){
      navigator.camera.getPicture(uploadPhotoOcorrencia, function(message) {
			$('#validar_form_Ocorrencia').val(0);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
			correctOrientation:true,
			AllowEdit: true
		}
            );
            }
 function uploadPhotoOcorrencia(imageURI) {
			$('#banner_Ocorrencia_editar').attr('src',imageURI);
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
            ft.upload(imageURI, "http://lomatech.com.br/app/uploadOcorrencia.php", winOcorrencia, failOcorrencia, options);
        }
 
        function winOcorrencia(r) {
			$("#arquivoMeusOcorrencias").val(r.response);
            carregar('desativar');
        }
 
        function failOcorrencia(error) {
			$('#banner_Ocorrencia_editar').attr('src','');
           carregar('desativar');
        }


function chamarOcorrencias(){
apagarMSGs();
	var lista = '';
	carregar('ativar');
	$.post(URLBASE+'ocorrencias.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var situacao ='';
				var x = 0;
			
					$.each( data, function( ) {
						if ( data[x].status == 'NÃO'){
									var situacao ="Em Aberto";
								}else{
									var situacao ="Resolvido";
								}
				
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:0; min-height:0; margin:5px 0px;" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="" class="link"><h2>'+data[x].titulo_ocorrencia;
						lista +=	'<img src="img/btn/ocorrencias_pequeno.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form style="display:none">';	
						lista +=	'<div class="ui-collapsible-content ui-body-inherit" aria-hidden="false">	';
						if(data[x].foto != 'null')
							lista +=	'<center><img src="'+data[x].foto+'"></center>	';
						lista +=    ' <h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;"><b>PUBLICADO EM </b>:'+data[x].data_cadastro+'</h3><br>';
						lista +=	' <h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;"><b>DATA DA OCORRENCIA E LOCAL </b></h3>';
						lista +=    ' <h3 style="text-shadow: none; color: #FFF;">Data: '+data[x].data_ocorrencia+' ás '+data[x].hora_ocorrencia+'</h3> '; 
						lista +=	' <h3 style="text-shadow: none; color: #FFF;">Local:'+data[x].local+'</h3>';
						lista +=    ' <h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DESCRIÇÃO DA OCORRENCIA</h3>';
						lista += 	' <h3 style="text-shadow: none; color: #FFF;">'+data[x].descricao+'</h3>';
						lista +=	' <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all"><div class="ui-controlgroup-controls ">';		
						lista += 	'   <a href="#" id="btn-list-detalhe" style=" margin: 0px 18px 0px -20px;" class="ui-btn ui-corner-all">'+situacao+'</a>';
						if(data[x].cadastraste)						
							lista += 	' 	<a href="#" onClick="CancelarOcorrencia('+data[x].ID+');" id="btn-list" style="background-color:#820d12;border-color:#820d12; " class="ui-btn ui-corner-all">Cancelar</a>';
						
						lista +=	'</div></fieldset>';
						lista +=	'</div>';
						lista +=	'</form>';
						lista +=  '</li>';

						x++;
						
					});
					$('#listaocorrencias').html(lista);
					$('#listaocorrencias').listview("refresh");
					carregar('desativar');
		}, 'json');
						

};


function CancelarOcorrencia(id){
apagarMSGs();
navigator.notification.confirm(
    'Deseja Cancelar?', // message
     function(ex){
if(ex == true){
	$.post(URLBASE+'ocorrencias.php', {id:id, acao:'excluir'}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						chamarOcorrencias();
											
						if(data.status){
							$('.msgsucesso_minhas_ocorrencias p').html(data.mensagem);
							$('.msgsucesso_minhas_ocorrencias').css('display','block');
						}else{
							$('.msgerro_minhas_ocorrencias p').html(data.mensagem)
							$('.msgerro_minhas_ocorrencias').css('display','block');
						}
						window.location = "#ocorrencias";
					})
	})
	}
},            // callback to invoke with index of button pressed
    'iCondominio',           // title
    ['Sim','Não']     // buttonLabels
);
};
function novaOcorrencia(){
apagarMSGs();

$('#descricao_form_ocorrencias').val('');
$('#data_ocorrencia_form_ocorrencias').val('');
$('#local_form_ocorrencias').val('');
$('#titulo_ocorrencia_form_ocorrencias').val('');

	$('#id_form_ocorrencias').val(idmorador());
	var resposta = '';
	resposta += "<option value=''>-- Selecione um Local --</option>";
	$.post(URLBASE+'querys/ocorrencias.php', {id:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].nome+"</option>";
						x++;
					})
					$("#local_form_ocorrencias").html(resposta);
	})

}


function registrarOcorrencia(){
apagarMSGs();
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						chamarOcorrencias();
											
						if(data.status){
							$('.msgsucesso_minhas_ocorrencias p').html(data.mensagem);
							$('.msgsucesso_minhas_ocorrencias').css('display','block');
						}else{
							$('.msgerro_minhas_ocorrencias p').html(data.mensagem)
							$('.msgerro_minhas_ocorrencias').css('display','block');
						}
						carregar('desativar');
						window.location = "#ocorrencias";
					
					}); 
		} 
	}; 
	if($('#validar_form_Ocorrencia').val() == 0 && validarFormularios('ocoorenciaDeFormulario') == true){
			carregar('ativar');
		$('#ocoorenciaDeFormulario').ajaxSubmit(options);
	}else{
		alert('Fazendo Upload da Imagem');
	}
	
	
	return false;
}


	