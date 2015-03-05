
function ativarPanico(){
	if($('#panico_ativo').val() == "sim"){
		
		navigator.notification.confirm(
    'Deseja Para Pânico?', // message
     function(ex){
		
		if(ex == true){
			pararPanico();
		}
	 },            // callback to invoke with index of button pressed
    'CondoMovel',           // title
    ['Sim','Não']     // buttonLabels
);


		
	}else{
		
		
		
		

		navigator.notification.confirm(
    'Deseja Iniciar Pânico?', // message
     function(ex){
		
		if(ex == true){
			$('#panico_ativo').val('sim');
			watchID = navigator.geolocation.watchPosition(mostrarTela, fail, { timeout: 5000 });
		}else{
			$('.login').css('background','#112C3C');
		}
	 },            // callback to invoke with index of button pressed
    'CondoMovel',           // title
    ['Sim','Não']     // buttonLabels
);
	}

}

function pararPanico(){
  if(watchID){
				$('a').filter('#botoesAlerta').css('background-color','#950e14');
				$('a').filter('#botoesAlerta').css('border-color','#950e14');
                navigator.geolocation.clearWatch(watchID);
                watchID=null;
				var ativo = $('#panico_ativo').val();
					var id_panico = $('#id_panico_ativo').val();
					
					$.post(URLBASE+'panico.php', {acao:'desativar',panico:id_panico}, function(data) {
						var x = 0;									
							$.each( data, function( ) {
								
								if(data.retornar == true){
									$('.login').css('background','#112C3C');
									alert("Panico Desativado");
									var ativo = $('#panico_ativo').val('nao');
									var id_panico = $('#id_panico_ativo').val('');
								}else{
								}
								
							});
				}, 'json');
            }

}

 function mostrarTela(position){
			var ativo = $('#panico_ativo').val();
			var id_panico = $('#id_panico_ativo').val();
			if($('#panico_ativo').val() == "sim"){
			$.post(URLBASE+'panico.php', {acao:'ativar',ativo:ativo,panico:id_panico,latitude:position.coords.latitude, longitude:position.coords.longitude , id:idmorador()}, function(data) {
				var x = 0;									
					$.each( data, function( ) {
						
						if(data.retornar == true){
							$('#panico_ativo').val('sim');
							$('#id_panico_ativo').val(data.id);
							$('.login').css('background','#d0131c ');
						}else{
							alert("Panico não ativado");
						}
						
					});
		}, 'json');
			}else{
				pararPanico();
			}
        
        }