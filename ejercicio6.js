// En la url va el primer parametros que especifica consola o web segun la version
// El ultimo parametros será la ciudad, el penúltimo será el pais
// Si no se especifica el país, se muestran las posibilidades junto con el pais para componer la url correcta
// Si se especifica bien el pais se muestran los resultados

var http=require('http');   // Servidor 
var fs = require('fs');		// Acceso al sistema de archivos

var API_WU = "a4a9252c6a17c109";


var cabecera_html = "", pie_html = "";     	// Cabecera y pie html
var chk_cabecera = true, chk_pie = true;	// Comprueba si están los ficheros de cabecera y pie
var accesos_json = new Array();				// Array de los accesos

// Abrir el fichero de cabecera html
fs.readFile('ejercicio5_cabecera.html', 'utf8', 
	function(err,datos) {
	if (err) {
		cabecera_html = "\nError! No encontrado en el servidor el fichero de cabecera html 'ejercicio5_cabecera.html";
		chk_cabecera = false;
	};
	// Se toma el html de la cabecera
	cabecera_html = datos;
});

// Abrir el fichero del pie html
fs.readFile('ejercicio5_pie.html', 'utf8', 
	function(err,datos) {
	if (err) {
		pie_html = "\nError! No encontrado en el servidor el fichero de pie html 'ejercicio5_pie.html";
		chk_pie = false;
	};
	// Se toma el html del pie
	pie_html = datos;
});

// Crear servidor
http.createServer(function (req, res) { 
	// Prevenir la conexión que realiza el navegador para traer favicon para no contar su conexion
	if (req.url === '/favicon.ico') {
		res.writeHead(200, {'Content-Type': 'image/x-icon'} );
		res.end();
		return;
	}
	
	// Cabecera en formato html
    res.writeHead(200, {'Content-Type': 'text/html'}); 
	
	// Comprobar si falta en el servidor el fichero de cabecera o pie
	if (!chk_cabecera || !chk_pie) {
		var respuesta = "\nDebe copiar los ficheros ejercicio5_cabecera.html y ejercicio5_pie.html en el mismo directorio del servidor donde se encuentre el programa principal ejercicio5.js";
		res.end(respuesta);
	}
	else {
		var respuesta = "";  // String de respuesta a mostrar
		var seccion=req.url.split("/")[1]; 	// Seccion segun la url
		var ahora = new Date();		// Para tomar la fecha y hora de la conexion
		var fecha = ahora.getDate()+"/"+parseInt(ahora.getMonth()+1)+"/"+ahora.getFullYear();
		var hora = ahora.getHours()+":"+ahora.getMinutes()+":"+ahora.getSeconds();
		var contador = 0;	// Contador de accesos global
		
		// Si es la primera vez que se invoca la seccion, se crea un array para dicha seccion
		if (accesos_json[seccion] == null) accesos_json[seccion] = new Array();
		
		// Contar los accesos globales a todas las secciones
		for (var i in accesos_json)
			contador += accesos_json[i].length;
		
		// Componer el objeto json de la conexion entrante
		accesos_json[seccion][accesos_json[seccion].length] = "{seccion: '"+seccion+"', orden_seccion: "+accesos_json[seccion].length+", orden_total: "+contador+", ip_cliente: '"+req.connection.remoteAddress+"', fecha: '"+fecha+"', hora: '"+hora+"'},";
		contador++;
		
		// Seccion principal
		if (seccion == "") {
			respuesta = 'Esta es la sección <b>principal</b><br/>Número de accesos totales: <b>'+contador+'</b><br/>Número de accesos a la sección principal:<b> '+accesos_json[seccion].length+'</b>';
			respuesta += '<br/>Registro de accesos en todas las sección en formato JSON:<p><div id="resultadoJSON" class="salida">';
			// Recorrer todas las secciones y mostrar los objetos json
			for (var j in accesos_json) {
				for (var i in accesos_json[j]) 
					respuesta += "<br/>"+accesos_json[j][i];
			}
			respuesta = respuesta.substr(0, respuesta.length-1);
			respuesta += '<br/><br/></div>';
		}
		// Seccion determinada
		else {
			respuesta = 'Esta es la seccion <b>'+seccion+'</b><br/>Número de accesos totales: <b>'+contador+'</b><br>Número de accesos a esta sección: <b>'+accesos_json[seccion].length+'</b>'; 
			respuesta += '<br/>Registro de accesos a esta sección en formato JSON:<p><div id="resultadoJSON" class="salida">';
			// Recorrer los objetos json de la seccion
			for (var i in accesos_json[seccion])
				respuesta += "<br/>"+accesos_json[seccion][i];
			respuesta = respuesta.substr(0, respuesta.length-1);
			respuesta += '<br/><br/></div>';
		}
		// Escribir respuesta y cerrar
		res.write(cabecera_html+respuesta+pie_html); 
		res.end();
	}
}).listen('8080', '127.0.0.1'); 
console.log('Servidor ejecutandose en http://127.0.0.1:8080/');
