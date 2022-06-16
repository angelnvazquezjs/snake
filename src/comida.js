import { patColision } from "./funciones";
export default class Comida {
  constructor(x, y, w, h, juego) {
    this.juego = juego;
    this.patCabezaPos = {
      x: x,
      y: y
    };
    this.patW = w;
    this.patH = h;
    this.patEnergia = 1000;
    this.imagen = new Image();
    this.imagen.src = "../img/manzana.png";
  }
  dibujar() {
    this.crearComida(
      this.juego.ctx,
      this.patCabezaPos.x,
      this.patCabezaPos.y,
      this.patW,
      this.patH
    );
  }

  actualizar() {
    if (patColision(this, this.juego.culebrita)) {
      this.patcont = 0;
      this.patEnergia = 0;
      this.juego.culebrita.patFinal++;
      this.juego.puntajes++;
    }
  }

  crearComida(ctx, x, y, w, h) {
    ctx.drawImage(this.imagen, x, y, 15, 15);
    // ctx.fillStyle = "red";
    //ctx.fillRect(x, y, w, h);
    if (this.patEnergia === 1000) this.patEnergia = 1;
  }
}
