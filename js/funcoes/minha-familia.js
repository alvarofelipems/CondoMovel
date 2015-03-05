function capturarImagemFamilia(){
      navigator.camera.getPicture(uploadPhotoFamilia, function(message) {
			$('#validar_form_Familia').val(0);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.CAMERA,
			correctOrientation:true,
			AllowEdit: true
		}
            );
            }
 function PegarImagemFamilia(){
      navigator.camera.getPicture(uploadPhotoFamilia, function(message) {
			$('#validar_form_Familia').val(0);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
			correctOrientation:true,
			AllowEdit: true
		}
            );
            }
 function uploadPhotoFamilia(imageURI) {
			$('#foto_Familia_editar').attr('src',imageURI);
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
            ft.upload(imageURI, "http://lomatech.com.br/app/upload.php", winFamilia, failFamilia, options);
        }
 
        function winFamilia(r) {
			$("#arquivoFamilia").val(r.response);
            carregar('desativar');
        }
 
        function failFamilia(error) {
			$('#foto_Familia_editar').attr('src','');
           carregar('desativar');
        }


function chamarFamilia() {
apagarMSGs();
carregar('ativar');
	var lista = '';
	var resposta = '';
	$.post(URLBASE+'minha_familia.php', {acao:'retornarTodos', id_morador:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
					
						
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:0; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="" class="link"><h2>'+data[x].nome;
						lista +=	'<img src="img/btn/reservas.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form style="display:none">';	
						lista +=	' <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all"><div class="ui-controlgroup-controls ">';
						lista +=	'<a href="#form_familia" onClick="editarFamilia('+data[x].ID+');" id="btn-list-detalhe" class="ui-btn ui-corner-all">Detalhes/Editar</a>';
						lista +=	'<a href="#" onClick="excluirFamilia('+data[x].ID+');" id="btn-list" class="ui-btn ui-corner-all ui-last-child" >Excluir</a>	';
						lista +=	'</div></fieldset>';
						lista +=	'</form>';
						lista +=  '</li>';
					
						x++;
					});
					
					
					$('#listafamilia').html(lista);
					$('#listafamilia').listview("refresh");
					carregar('desativar');
					
		}, 'json');


}

function excluirFamilia(ID){
apagarMSGs();
navigator.notification.confirm(
    'Deseja Excluir?', // message
     function(ex){
if(ex == true){
	carregar('ativar');
	$.post(URLBASE+'minha_familia.php', {id:ID, acao:'excluir'}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						chamarFamilia();
											
						if(data.status){
							$('.msgsucesso_familia p').html(data.mensagem);
							$('.msgsucesso_familia').css('display','block');
						}else{
							$('.msgerro_familia p').html(data.mensagem)
							$('.msgerro_familia').css('display','block');
						}
						carregar('desativar');
					})
	})
}
},            // callback to invoke with index of button pressed
    'iCondominio',           // title
    ['Sim','Não']     // buttonLabels
);
}

function novaFamilia(){
apagarMSGs();
	$("#nome_form_familia").val('');
	$("#sexo_form_familia").val('');
	$("#data_nascimento_form_familia").val('');
	$("#email_form_familia").val('');
	$("#rg_form_familia").val('');
	$("#cpf_form_familia").val('');
	$("#telefone_form_familia").val('');
	$("#celular_form_familia").val('');
	$("#classificacao_form_familia").val('');
	$("#senha_form_familia").val('');
	$("#acao_form_familia").val('novo');
	$("#id_familia").val(idmorador());
	$("#foto_form_familia").attr("src",'');
	$('#cpf_form_familia').mask("999.999.999-99");
	$('#telefone_form_familia').val('');
		var SPMaskBehavior = function (val) {
		 return val.replace(/\D/g, '').length === 11 ? '(00) 000 000 000' : '(00) 000 000 009';
		},
		spOptions = {
			 onKeyPress: function(val, e, field, options) {
			 field.mask(SPMaskBehavior.apply({}, arguments), options);
		}
		};
		$('#telefone_form_familia').mask(SPMaskBehavior, spOptions);
	$('#celular_form_familia').val('');
		var SPMaskBehavior = function (val) {
		 return val.replace(/\D/g, '').length === 11 ? '(00) 000 000 000' : '(00) 000 000 009';
		},
		spOptions = {
			 onKeyPress: function(val, e, field, options) {
			 field.mask(SPMaskBehavior.apply({}, arguments), options);
		}
		};
		$('#celular_form_familia').mask(SPMaskBehavior, spOptions);
}

function editarFamilia(id){
apagarMSGs();
	novaFamilia();
	$("#acao_form_familia").val('editar');
	$("#id_familia").val(id);
	carregar('ativar');
	
	$.post(URLBASE+'minha_familia.php', {acao:'retornar', id:id}, function(data) {
					var x = 0;
					$.each( data, function( ) {
					if(x == 0){
						$("#nome_form_familia").val(data.nome);
						$("#sexo_form_familia").val(data.sexo);
						var tipo =  $("#sexo_form_familia option:selected").text();
						$("#sexo_form_familia-button span").html(tipo);
						$("#data_nascimento_form_familia").val(data.data_nascimento);
						$("#email_form_familia").val(data.email);
						$("#rg_form_familia").val(data.rg);
						$("#cpf_form_familia").val(data.cpf);
						$("#telefone_form_familia").val(data.telefone);
						$("#celular_form_familia").val(data.celular);
						$("#classificacao_form_familia").val(data.tipo);
						$("#foto_form_familia").attr("src",data.banner);
						$('#cpf_form_familia').mask("999.999.999-99");
						$('#telefone_form_familia').val(data.telefone);
							
						$('#celular_form_familia').val(data.celular);
		
					}	carregar('desativar');
					
					})
	})

}

function registrarFamilia(){
apagarMSGs();
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						chamarFamilia();
											
						if(data.status){
							$('.msgsucesso_familia p').html(data.mensagem);
							$('.msgsucesso_familia').css('display','block');
						}else{
							$('.msgerro_familia p').html(data.mensagem)
							$('.msgerro_familia').css('display','block');
						}
						carregar('desativar');
						window.location = "#minha_familia";
					
					}); 
		} 
	}; 
	$('#cpf_form_familia').blur();
	$("#email_form_familia").blur();
	$("#celular_form_familia").blur();
	if(validarFormularios('formulario_familia') == true && $('#validar_form_Familia').val() == 0){
	carregar('ativar');
	 $('#formulario_familia').ajaxSubmit(options);
	 
	 }
	
	
	return false;

}