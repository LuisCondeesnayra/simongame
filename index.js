$(".container").hide();
var colores = ["red", "green", "blue", "yellow"];
var arregloJugador = [];
var audio;
var nivel = 0;
var contador=0;
var score=0;
var arregloSecuencia = [];
$(document).keypress(function(event) {
  console.log(event.key);
  if (event.key == "Enter" && nivel == 0) {
    $("#title").html("GO!").addClass("countdown").fadeOut(500).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
    $("#level").hide();
    setTimeout(function() {
      secuencia();
      $(".container").show();
      $("#level").show();
    }, 1400);
  }
});

$(".btn").click(function() {

  var clickJugador = $(this).attr("id");
  arregloJugador.push(clickJugador);

  $("#" + clickJugador).fadeOut(20).addClass("pressed").fadeIn(20);
  setTimeout(function() {
    $("#" + clickJugador).removeClass("pressed");
  }, 20);

  playsound(clickJugador);
  if(arregloJugador[contador]!=arregloSecuencia[contador]){respuesta(nivel)}
  if(arregloJugador.length==nivel){respuesta(nivel)}
  contador++;
  $("#title").text("Score: "+score).show().removeClass("countdown","topheader").addClass("score");
  score++;
});

function playsound(sonido) {
  audio = new Audio("sounds/" + sonido + ".mp3");
  audio.play();
}

function secuencia() {
  contador=0;
              arregloJugador=[];
  Randomsito = Math.floor(Math.random() * 4);
  var colorRandom = colores[Randomsito];
  arregloSecuencia.push(colorRandom);
  $("#" + colorRandom).animate({
    height: "220px",
    width: "220px"
  }).fadeIn(100).fadeOut(100).fadeIn(100).animate({
    height: "200px",
    width: "200px"
  });
  playsound(colorRandom);
  nivel++;
  $("#level").html("Level " + nivel);
}


function respuesta(nivel) {
    nivel--;
    if (arregloJugador[nivel] == arregloSecuencia[nivel]) {
      setTimeout(function () {
              secuencia();

      }, 1000);

    } else {
      playsound("wrong");
      $("#level").text("Game over").addClass("countdown").after("<h1 id='again' class='score'>TRY AGAIN</h1>");
      $('#again').click(function() {
    location.reload();
});
      $("body").addClass("game-over");
      $(".container").hide();
      console.log("error");
      $("#title").text("Score: "+score).removeClass("score").addClass("finalscore");

    }
  }
