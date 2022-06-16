export default class Entrada {
  constructor(juego) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        //Escape
        case 27:
          juego.pausar();
          break;
        //PResiona Espacio
        case 32:
          juego.iniciar();
          break;
        //Presiona tecla izquierda
        case 37:
          juego.culebrita.izquierda();
          break;
        //Presiona tecla arriba
        case 38:
          juego.culebrita.arriba();
          break;
        //Presiona tecla derecha
        case 39:
          juego.culebrita.derecha();
          break;
        //Presiona tecla abajo
        case 40:
          juego.culebrita.abajo();
          break;
        default:
          break;
      }
    });
    window.addEventListener("resize", () => {
      juego.cambiarTamanio();
      //cambio de pantalla
    });
  }
}
