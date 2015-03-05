
//const URLBASE = "http://sizetech/lanchonete/";
const URLBASE = "http://sizetech.com.br/app_lanchonete/";

function testee(i){
	$(".produtos").html(i);
	 $(".produto").addClass("ui-page-theme-a");
	 $( ".lucas" ).listview( "refresh" );
}

$(function(){
	$.getJSON(URLBASE+'categoriaEmpresa.php',
	function(data) {
		var categoria = '';
		
		$.each(data, function(i, valor) {
			categoria += '<a href="#catEmpresa" onClick="categoriaempresa('+valor.id+');" class="ui-btn">'+valor.nome+'</a>';
	
		});		
		$('.categoriasEmpresa').html(categoria);
	})
	
	
	

	
})

function empresa(id){

	$('.empresaIndividual').empty();
	$('.tltempresa').empty();
var empresa = $.post( URLBASE+"empresa.php",{id:id,tipo:1}, function() {
		  })
		  .always(function(data) {
			  $('.empresaIndividual').html(data);
		});

var empresa = $.post( URLBASE+"empresa.php",{id:id,tipo:2}, function() {
		  })
		  .always(function(data) {
			  $('.tltempresa').html(data);
		});
		

}

function AbrirProduto(id){

	$('.produto').empty();
var produto = $.post( URLBASE+"produto.php",{id:id}, function() {
		  })
		  .always(function(data) {
			  $('.produto').html(data);
		});


}

function Addprodutos(id){
var url = URLBASE+"produtos.php?id="+id;	
var resposta = '';
var anterior = '';
	var x = 1;
	var z = 1;
$.getJSON(url,
        function(data){
          $.each(data, function(i,item){
		  
            
			if ( anterior != item.categoria ) {
					resposta += '<li data-role="list-divider" data-theme="b">' + item.categoria + '</li>'
					anterior = item.categoria;
					z = 1;
			}
			if(z % 2 == 0 ){
				var l = 'data-theme="c"';
			
			}
				resposta += '<li '+l+'>';
				resposta += '<a href="#produto" onClick="AbrirProduto('+item.id+');">';
				resposta += '<img src="' + item.img + '" class="img-redondo"/>';
				resposta += '<h3>' + item.nome + '</h3>';
				resposta += '<p>' + item.descricao + '</p>';
				resposta += '</a>';
				resposta += '</li>';
			z++;	
          });
			$('.produtos').html(resposta);
			$('.produtos').listview("refresh");
			
		  
		});

}

