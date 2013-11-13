Curso_JS_Ejercicio6
===================
	<h1>Curso "Programación cliente-servidor en Javascript"</h1>
	<h2>Ejercicio 6: Interfaces REST</h2>
	<hr>
	<p>He publicado la resolución de este ejercicio en mi cuenta de GitHub.</p>
	<p>El enlace al repositorio de mi cuenta con la resolución del ejercicio 6 es: <a href="https://github.com/jaguador/Curso_JS_Ejercicio6">Curso_JS_Ejercicio6</a>. </p>
	<p>Se trata de un programa para ser ejecutado con node.js en línea de comandos ya que muestra los resultados por consola. Se ha utilizado la API de la web <a href="http://www.wunderground.com/">Weather Underground</a>. Esta es una web con información meteorológica, su API permite acceder al tiempo actual y la predicción según la localización que se indique, para lo cual he tenido que registrarme en su web y obtener una KEY para habilitar el acceso al API.</p>
	<p>Su funcionamiento es el siguiente: La ejecución se realiza indicando la ciudad que se quiere consultar con el código del Pais delante, por ejemplo:<br/>
	<b>node ejercicio6.js ES/Granada</b> <br/><i>(predicción de la ciudad de Granada en España)</i></p>	
	<p>- Si no se indica ningún parámetro tomará por defecto la ciudad de Granada.
		<br/>- Si se indica un parámetro de ciudad sin País: En el caso que sólo se encuentre 1 coincidencia se muestra el tiempo actual de esa ciudad, en caso contrario se muestran todas las ciudades encontradas con su código de país correspondiente para resolver la ambiguedad
		<br/><br/>- <u>Ejemplo 1</u>: Ciudad sin pais con múltiples posibilidades:<br/>
			<i><b>node ejercicio6.js Granada</b><br/>
			Esperando respuesta de api.wunderground.com para la localizacion: "Granada"<br/>
			Atención!!! Hay ambiguedad con la localización indicada. Vuelva a realizar la llamada con la localizacion exacta de entre las siguientes:<br/>
			Ciudad: "Granada", Pais: "Colombia", Parametro a usar: "CO/Granada"<br/>
			Ciudad: "Granada", Pais: "Estados Unidos de América", Parametro a usar: "US/Granada"<br/>
			Ciudad: "Granada", Pais: "Estados Unidos de América", Parametro a usar: "US/Granada"<br/>
			Ciudad: "Granada", Pais: "Nicaragua", Parametro a usar: "NI/Granada"<br/>
			Ciudad: "Granada", Pais: "Filipinas", Parametro a usar: "PH/Granada"<br/>
			Ciudad: "Granada", Pais: "España", Parametro a usar: "ES/Granada"<br/>
			Gracias por utilizar nuestros servicios. Que pase un buen dia!	</i><br/>
		<br/>- <u>Ejemplo 2</u>: Ciudad con pais:<br/>
			<i><b>node ejercicio6.js ES/Granada</b><br/>
			Esperando respuesta de api.wunderground.com para la localizacion: "ES/Granada"<br/>
			El tiempo registrado en "Granada, España" observado a las "Wed, 13 Nov 2013 20:30:00 +0100" es:<br/>
			Cielo: Muy nublado<br/>
			Temperatura: 13º<br/>
			Sensación térmica: 13º<br/>
			Humedad relativa: 100%<br/>
			Viento: From the Variable at 2 MPH<br/>
			Gracias por utilizar nuestros servicios. Que pase un buen dia!</i><br/>		
	</p>
	</br>
	<hr>
	<p><b>Julio Aguado Robles</br>Usuario GitHub: jaguador</br>Alumno: al10788</b></p>
