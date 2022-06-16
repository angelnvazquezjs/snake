import "./styles.css";
import Juego from "./juego";

let canvas = document.getElementById("pantalla");

let juego = new Juego(canvas);

function cicloDelJuego() {
  juego.clear();
  juego.dibujar();
  juego.actualizar();

  requestAnimationFrame(cicloDelJuego);
}
cicloDelJuego();
