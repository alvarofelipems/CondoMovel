$(function(){

	$("#marca_form_meus_veiculos").change(function(){			 
			$('#modelo_form_meus_veiculos').html("<option> -- Carregando --</option>");		
			var sala = $.post( URLBASE+"querys/modelo-veiculos.php",{marca:$(this).val()}, function() {		
			})			 
			.always(function(data) {				
				$('#modelo_form_meus_veiculos').html(data);			
			});		
		});	

});

 function capturarImagemVeiculo(){
      navigator.camera.getPicture(uploadPhotoVeiculo, function(message) {
			$('#validar_form_veiculo').val(0);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.CAMERA,
			correctOrientation:true,
			AllowEdit: true
		}
            );
            }
 function PegarImagemVeiculo(){
      navigator.camera.getPicture(uploadPhotoVeiculo, function(message) {
			$('#validar_form_veiculo').val(0);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
			correctOrientation:true,
			AllowEdit: true	
		}
            );
            }
 function uploadPhotoVeiculo(imageURI) {
			$('#banner_veiculo_editar').attr('src',imageURI);
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
            ft.upload(imageURI, "http://lomatech.com.br/app/uploadVeiculo.php", winVeiculos, failVeiculos, options);
        }
 
        function winVeiculos(r) {
			$("#arquivoMeusVeiculos").val(r.response);
            carregar('desativar');
        }
 
        function failVeiculos(error) {
			$('#banner_veiculo_editar').attr('src','');
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
function meusveiculos(){
apagarMSGs();
carregar('ativar');
	var lista = '';
	$.post(URLBASE+'meus_veiculos.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
				carregar('desativar');
					$.each( data, function( ) {
						
			
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:5px; min-height:0; margin:5px 0px;" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="#"><h2>'+data[x].marca;
						lista +=	'<img src="img/btn/veiculo-pequeno.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form style="display:none">';	
						lista +=	'<div class="ui-collapsible-content ui-body-inherit" aria-hidden="false">	';
						lista +=  	' <center><img src="'+data[x].banner+'"></center>';
						lista +=    ' <h3 style="text-shadow: none; color: #FFF;">MARCA:'+data[x].marca+'</h3>';
						lista +=	' <h3 style="text-shadow: none; color: #FFF;">MODELO:'+data[x].modelo+'</h3>';
						lista +=    ' <h3 style="text-shadow: none; color: #FFF;">PLACA: '+data[x].placa+'</h3> '; 
						lista +=	' <h3 style="text-shadow: none; color: #FFF;">COR:'+data[x].cor+'</h3>';					
						lista += 	' <h3 style="text-shadow: none; color: #FFF;">DATA CADASTRO:'+data[x].data_cadastro+'</h3>';
						lista +=	' <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all">';		
						lista += 	'   <a href="#form_meus_veiculos" onClick="editar_meus_veiculos('+data[x].ID+');" id="btn-list"  style="background-color:#1D4963;border-color:#1D4963; " class="ui-btn ui-corner-all">EDITAR CADASTRO</a>';
						lista += 	' 	<a href="#" onClick="excluirVeiculo('+data[x].ID+');" id="btn-list" style="background-color:#820d12;border-color:#820d12; " class="ui-btn ui-corner-all">EXCLUIR</a>';
						lista +=	'</fieldset>';
						lista +=	'</div>';
						lista +=	'</form>';
						lista +=  '</li>';
						carregar('desativar');
						x++;
					});
					$('#listarveiculos').html(lista);
					$('#listarveiculos').listview("refresh");
		}, 'json');
						

}


function editar_meus_veiculos(ID){
	apagarMSGs();
					carregar('ativar');
						$("#marca_form_meus_veiculos").val('');
						$("#modelo_form_meus_veiculos").val('');
						$("#placa_form_meus_veiculos").val('');
						$("#cor_form_meus_veiculos").val('');
						$("#id_form_meus_veiculos").val('');
						$("#acao_form_meus_veiculos").val('');
						$("#banner_veiculo_editar").attr("src",'');
						$('#id_form_meus_veiculos').val(ID);
	$('#acao_form_meus_veiculos').val('editar');
	$('#arquivoMeusVeiculos').val('');
	
	
		var resposta = '';
	$.post(URLBASE+'querys/marca-veiculos.php', {}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].marca+"</option>";
						x++;
					})
					$("#marca_form_meus_veiculos").html(resposta);
	})
	
	$.post(URLBASE+'meus_veiculos.php', {acao:'retornar', id:ID}, function(data) {

					var x = 0;
					$.each( data, function( ) {
					if(x == 0){
						$("#marca_form_meus_veiculos").val(data.marca);
						$("#placa_form_meus_veiculos").val(data.placa);
						$("#cor_form_meus_veiculos").val(data.cor);
						$("#id_form_meus_veiculos").val(data.ID);
						$("#acao_form_meus_veiculos").val('editar');
						var tipo =  $("#marca_form_meus_veiculos option:selected").text();
						$("#marca_form_meus_veiculos-button span").html(tipo);
						$("#banner_veiculo_editar").attr("src",data.banner);
						var marca = data.marca;
						var modelo  = data.modelo;
						

								var sala = $.post( URLBASE+'querys/modelo-veiculos.php',{marca:marca,id:modelo}, function() {		
								})			 
								.always(function(data) {	
									$('#modelo_form_meus_veiculos').html(data);		
									$("#modelo_form_meus_veiculos").val(modelo);	
							var raca2 =  $("#modelo_form_meus_veiculos option:selected").text();
									$("#modelo_form_meus_veiculos-button span").html(raca2);
								});
							
							
							carregar('desativar');	
						}
						x++;
						
					})
	})
	
	}
		
function novoVeiculo(){
apagarMSGs();
	$('#id_form_meus_veiculos').val(idmorador());
	$('#acao_form_meus_veiculos').val('novo');
	$('#arquivoMeusVeiculos').val('');
	$("#marca_form_meus_veiculos").val('');
						$("#modelo_form_meus_veiculos").val('');
						$("#placa_form_meus_veiculos").val('');
						$("#cor_form_meus_veiculos").val('');
						$("#banner_veiculo_editar").attr("src",'');
	var resposta = '';
	resposta += "<option value=''>-- Selecione a Marca --</option>";
	
	$.post(URLBASE+'querys/marca-veiculos.php', {}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].marca+"</option>";
						
						x++;
					})
					$("#marca_form_meus_veiculos").html(resposta);
	})
	

}
	function excluirVeiculo(ID){
navigator.notification.confirm(
    'Deseja Excluir?', // message
     function(ex){
if(ex == true){
	carregar('ativar');
	$.post(URLBASE+'meus_veiculos.php', {id:ID, acao:'excluir'}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						meusveiculos();
											
					if(data.status){
							$('.msgsucesso_meus_veiculos p').html(data.mensagem);
							$('.msgsucesso_meus_veiculos').css('display','block');
						}else{
							$('.msgerro_meus_veiculos  p').html(data.mensagem)
							$('.msgerro_meus_veiculos ').css('display','block');
						}
						carregar('desativar');
						window.location = "#meus_veiculos";
					})
	})
}
 },            // callback to invoke with index of button pressed
    'iCondominio',           // title
    ['Sim','Não']     // buttonLabels
);
}
			
	
	



function registrarVeiculos(){
apagarMSGs();
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						meusveiculos();
											
						if(data.status){
							$('.msgsucesso_meus_veiculos p').html(data.mensagem);
							$('.msgsucesso_meus_veiculos').css('display','block');
						}else{
							$('.msgerro_meus_veiculos  p').html(data.mensagem)
							$('.msgerro_meus_veiculos ').css('display','block');
						}
						carregar('desativar');
						window.location = "#meus_veiculos";
					
					}); 
		} 
	}; 
	if(validarFormularios('formularioVeiculos') == true){
		
		carregar('ativar');
		$('#formularioVeiculos').ajaxSubmit(options);
	}
	
	
	return false;
}
function novoForum(){
	$('#topico_form_forum').val('');
	$('#mensagem_form_forum').val('');
	$('#id_forum_novo').val(idmorador());


}
