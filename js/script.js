
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var level = "easy";
//NAVE
var y = 70; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;

//al cargar por completo la página...
window.onload = function(){

	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");


	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("sidebar-right")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("sidebar-right")[0].style.display = "none";
		start();
	}
	document.getElementById("new").onclick = function () {
		document.getElementsByClassName("sidebar-right")[0].style.display = "none";
		newGame();
	}
	document.getElementsByClassName("easy")[0].onclick = function () {
		document.getElementsByClassName("menu-init")[0].style.display = "none";
		level = "easy";
		resetGame();
	}
	document.getElementsByClassName("medium")[0].onclick = function () {
		document.getElementsByClassName("menu-init")[0].style.display = "none";
		level = "medium";
		resetGame();
	}
	document.getElementsByClassName("hard")[0].onclick = function () {
		document.getElementsByClassName("menu-init")[0].style.display = "none";
		level = "hard";
		resetGame();
	}
	/*document.getElementById("opn").onclick = function () {
		if (document.getElementById("menu").style.display == "none") {
			stop();
		document.getElementById("menu").style.display = "block";
		} else {
			start();
		document.getElementById("menu").style.display = "none";
		}
	}*/
	document.getElementById("reset").onclick = function () {
		document.getElementsByClassName("sidebar-right")[0].style.display = "none";
		resetGame();
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = function(e) {
		if (e.Keycode == 32) {
			motorOn();
		}
	}
	document.onkeyup = motorOff;

	//Empezar a mover la nave justo después de cargar la página
	//start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y -=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=v;
	altura.innerHTML=y;

	//mover hasta que top sea un 70% de la pantalla
	if (y>0){
		document.getElementById("nave").style.top = 70-y+"%";
	} else {
		stop();
		y=0;
		altura.innerHTML=y;
		gameOver();
	}
}
function motorOn(){
	changeImg(false);
	//el motor da aceleración a la nave
	a=-g;
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
}
function motorOff(){
	changeImg(true);
	a=g; 
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML=c;
}
function changeImg(up) {
	if (up) {
		document.getElementById("naveimg").src = "img/nave.png";
	} else{ 
		document.getElementById("naveimg").src = "img/nave1.png";
	}	
}

function gameOver() {
	if (level == "hard") {
		if (v <= 1) {
			document.getElementById("message-end").innerHTML = "You win!";
		} else {
			document.getElementById("message-end").innerHTML = "You lose!";
		}
	} else if (level == "medium") {
		if (v <= 3) {
			document.getElementById("message-end").innerHTML = "You win!";
		} else {
			document.getElementById("message-end").innerHTML = "You lose!";
		}
	} else if (level == "easy") {
		if (v <= 5) {
			document.getElementById("message-end").innerHTML = "You win!";
		} else {
			document.getElementById("message-end").innerHTML = "You lose!";
		}
	}
	document.getElementsByClassName("menu-init")[0].style.display = "block";
}
function resetGame() {
		y = 70; 
		v = 0;
		c = 100;
		a = g; 
		stop();
		start();
}
function newGame() {
	stop();
	document.getElementsByClassName("menu-init")[0].style.display = "block";
}











