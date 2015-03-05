$(function($){
$('.telefone').mask("(99)9999");jQuery('.telefone').mask("(99) 999 999 99?9").ready(function(event) {        var target, phone, element;        target = (event.currentTarget) ? event.currentTarget : event.srcElement;        phone = target.value.replace(/\D/g, '');        element = $(target);        element.unmask();        if(phone.length > 10) {            element.mask("(99) 99999-999?9");        } else {            element.mask("(99) 9999-9999?9");        }    });
$('.celular').mask("(99)9999");jQuery('.celular').mask("(99) 999 999 99?9").ready(function(event) {        var target, phone, element;        target = (event.currentTarget) ? event.currentTarget : event.srcElement;        phone = target.value.replace(/\D/g, '');        element = $(target);        element.unmask();        if(phone.length > 10) {            element.mask("(99) 99999-999?9");        } else {            element.mask("(99) 9999-9999?9");        }    });
$('.cpf').mask("999.999.999-99");
$('.rg').mask("99.999.999-*");
});
