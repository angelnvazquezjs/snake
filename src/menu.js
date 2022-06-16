import { ESTADOS } from "./funciones";
export default class Menu {
  constructor(juego) {
    this.juego = juego;
    this.w = this.juego.w / 3;
    this.h = this.juego.h;
    this.posicion = {
      x: (this.juego.w / 3) * 2,
      y: 0
    };
    this.centro = this.w / 2;
    this.fila = this.h / 20;
    this.titulos = this.h / 25;
    this.textos = this.h / 30;
    this.fondo = new Image();
    this.comida = new Image();
    this.serpienteInicio = new Image();
    this.serpienteInicio.src = "../img/serpienteInicio.png";
    this.serpienteGameOver = new Image();
    this.serpienteGameOver.src = "../img/serpienteGameOver.png";
  }

  dibujar() {
    switch (this.juego.estado) {
      case ESTADOS.CORRIENDO:
        this.menuDashBoard(
          this.juego.ctx,
          this.posicion.x,
          this.posicion.y,
          this.w,
          this.h
        );
        break;
      case ESTADOS.PAUSADO:
        this.menuPausa(this.juego.ctx, 0, 0, this.juego.w, this.juego.h);
        break;
      case ESTADOS.GAMEOVER:
        this.menuGameOver(this.juego.ctx, 0, 0, this.juego.w, this.juego.h);
        break;
      case ESTADOS.MENU:
        this.menuInicio(this.juego.ctx, 0, 0, this.juego.w, this.juego.h);
        break;
      case ESTADOS.NIVEL:
        this.menuCambioNivel(this.juego.ctx, 0, 0, this.juego.w, this.juego.h);
        break;
      default:
        break;
    }
  }
  actualizar() {}

  cambiarTamanio(relacion) {
    this.w = this.w * this.juego.relacion.x;
    this.h = this.h * this.juego.relacion.y;
    this.posicion.x = this.posicion.x * this.juego.relacion.x;
    this.posicion.y = this.posicion.y * this.juego.relacion.y;
    this.centro = this.centro * this.juego.relacion.x;
    this.fila = this.fila * this.juego.relacion.y;
    this.titulos = Math.round(this.titulos * this.juego.relacion.x);
    this.textos = Math.round(this.textos * this.juego.relacion.x);
  }
  menuInicio(ctx, x, y, w, h) {
    this.crearFondo(
      ctx,
      this.juego.areaDeJuego.x,
      this.juego.areaDeJuego.y,
      this.juego.areaDeJuego.w,
      this.juego.areaDeJuego.h
    );
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, w, h);
    ctx.fill();
    ctx.font = "30px Bernard MT Condensed";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(" Juego Serpiente ", w / 2, h / 2);
    ctx.fillText("  PRESIONA ESPACIO  ", w / 2, h / 1.7);
    ctx.drawImage(this.serpienteInicio, this.w, this.h / 16, w / 3, h / 3);
  }
  menuPausa(ctx, x, y, w, h) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, w, h);
    ctx.fill();
    ctx.font = "30px Bernard MT Condensed";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("▌▌ PAUSA", w / 2, h / 2);
  }
  menuGameOver(ctx, x, y, w, h) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, w, h);
    ctx.fill();
    ctx.font = "30px Bernard MT Condensed";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Game Over", w / 2, h / 2);
    ctx.fillText("Presiona Espacio", w / 2, h / 1.7);
    ctx.drawImage(this.serpienteGameOver, this.w, this.h / 16, w / 3, h / 3);
  }

  menuDashBoard(ctx, x, y, w, h) {
    this.crearFondo(
      ctx,
      this.juego.areaDeJuego.x,
      this.juego.areaDeJuego.y,
      this.juego.areaDeJuego.w,
      this.juego.areaDeJuego.h
    );

    //Dibuja un rectangulo del panel
    ctx.fillStyle = "yellow";
    ctx.fillRect(x, y, w, h);
    //Dibuja los letreros del panel
    ctx.font = this.titulos + "px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Posicion Comida:", x + w / 2, y + this.fila * 1);
    ctx.fillText(
      "X: " + this.juego.comida.patCabezaPos.x,
      x + w / 2,
      y + this.fila * 2
    );
    ctx.fillText(
      "Y: " + this.juego.comida.patCabezaPos.y,
      x + w / 2,
      y + this.fila * 3
    );
    ctx.fillText("Vidas:", x + w / 2, y + this.fila * 5);
    ctx.fillText(this.juego.estado, x + w / 2, y + this.fila * 6);
    ctx.fillText("Puntos:", x + w / 2, y + this.fila * 8);
    ctx.fillText(this.juego.puntajes, x + w / 2, y + this.fila * 9);
    ctx.fillText("TOP:", x + w / 2, y + this.fila * 11);
    ctx.fillText(this.juego.record, x + w / 2, y + this.fila * 12);
    ctx.drawImage(this.comida, 150, 30, 20, 25);
  }
  crearFondo(ctx, x, y, w, h) {
    ctx.drawImage(this.fondo, x, y, w, h);
  }
}
