 
$.ajaxSetup({
	'beforeSend' : function(xhr) {
	try{
	xhr.overrideMimeType('text/html; charset=iso-8859-1');
	}
	catch(e){
	 
	 
	}
	}});
	$(document).ready(function() {
//empleado
		$('#prediccion').click(function(event) {
			event.preventDefault();
			var strRange1 = $('#strRange1').val();
			var strRange2 = $('#strRange2').val();
			var top = $('#top').val();
			if (strRange1 == "") {  
			      alertify.error("Debe Ingresar un rango inferior"); 
			      $('#strRange1').focus();
			      return false;  
			    }
			if (strRange2 == "") {  
			      alertify.error("Debe Ingresar un rango superior"); 
			      $('#strRange2').focus();
			      return false;  
			    }

			if (top == "") {  
			      alertify.error("Debe Ingresar top minimo"); 
			      $("#top").focus();
			      return false;  
			    } 
			 if (strRange2 <= strRange1) {
			 	 alertify.error("Los rangos deben ser distintos o rango 2 menor al rango 1"); 
			      $("#strRange1").focus();
			      return false;  
			 }
			 
			
			alertify.confirm("Confirme sus datos: rango de  "+strRange1+" - "+strRange2+ " y un top de "+top,
					  function(){
					    $.get('/RecomendationVideo/ServicePython', {
							strRange1 : strRange1,
							strRange2 : strRange2,
							top: top						
						}, function(responseText,statusText) {
							$('#resultado').html(responseText);
					        if(statusText=="success"){
									alertify.success("Recomendació Exitosa.")
									document.getElementById("strRange1").value = ""; 
									document.getElementById("strRange2").value = ""; 
									document.getElementById("top").value = ""; 
							        document.getElementById("strRange1").focus();
									
								
							}
							else{
								alertify.error("Error, algo a salido mal. " +statusText);
							}
						});
					  },
					  function(){
					    alertify.error('Cancelado');
					  }).setting('labels',{'ok':'Pedir recomendación', 'cancel': 'Cancelar'}).set('closable', false);
			
		});
				 
	});
