
var https =require('https');   // Servidor 

var API_WU = "a4a9252c6a17c109";    // API Key de wunderground.com

// localizacion
var localizacion = process.argv[2]?process.argv[2]:'ES/Granada';

// Opciones de la peticion
var options = {
    host: 'api.wunderground.com',
    path: '/api/a4a9252c6a17c109/conditions/lang:SP/q/'+localizacion+'.json',
    method: 'GET'
};

console.log('\nEsperando respuesta de '+options.host+' para la localizacion: "'+localizacion+'"');

var req = https.request(options, function(res) {
	res.setEncoding('utf8');
	res.on('data', function (datos_JSON) {
		var datos=JSON.parse(datos_JSON);
		// Si hay results es que hay mas de 1 posibilidad
		//console.log(datos);
		if (datos.response.results != undefined) {
			console.log('\nAtención!!! Hay ambiguedad con la localización indicada. Vuelva a realizar la llamada con la localizacion exacta de entre las siguientes:\n');
			for (var i in datos.response.results)
				console.log('Ciudad: "'+datos.response.results[i].city+'", Pais: "'+datos.response.results[i].country_name+'", Parametro a usar: "'+datos.response.results[i].country_iso3166+'/'+datos.response.results[i].city+'"');
		}
		// Se comprueba si se obtienen los datos del tiempo
		else if (datos.current_observation != undefined) {
			console.log('\nEl tiempo registrado en "'+datos.current_observation.display_location.full+'" observado a las "'+datos.current_observation.observation_time_rfc822+'" es:');
			console.log('\nCielo: '+datos.current_observation.weather);
			console.log('Temperatura: '+datos.current_observation.temp_c+'º');
			console.log('Sensación térmica: '+datos.current_observation.feelslike_c+'º');
			console.log('Humedad relativa: '+datos.current_observation.relative_humidity);
			console.log('Viento: '+datos.current_observation.wind_string);
		}
		// No se devuelve la estructura del tiempo adecuada
		else {
			console.log('\nHa ocurrido un problema con los resultados, no han podido ser procesados');
		}
		console.log('\nGracias por utilizar nuestros servicios. Que pase un buen dia!');
	});
});
req.end();

