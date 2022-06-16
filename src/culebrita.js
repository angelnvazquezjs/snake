import { DIRECCIONES } from "./funciones";
export default class Culebrita {
  constructor(x, y, w, h, juego) {
    this.juego = juego;
    this.patDireccion = DIRECCIONES.DERECHA;
    this.patProteina = [0]; //Incremente
    this.patCabezaPos = {
      x: x,
      y: y
    };
    this.patFinal = 0;
    this.patW = w;
    this.patW = h;
  }

  dibujar() {
    this.crearCulebrita(
      this.juego.ctx,
      this.patCabezaPos.x,
      this.patCabezaPos.y,
      this.patW,
      this.patW
    );
  }

  crearCulebrita(ctx, x, y, w, h) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.rect(this.patCabezaPos.x, this.patCabezaPos.y, w, h);
    for (let crece = 0; crece < this.patProteina.length; crece = crece + 2) {
      ctx.rect(this.patProteina[crece].x, this.patProteina[crece].y, 10, 10);
    }
    ctx.stroke();
  }

  actualizar() {
    for (
      let patVitamina = 0;
      patVitamina < this.patProteina.length;
      patVitamina++
    )
      if (
        this.patCabezaPos.x === this.patProteina[patVitamina].x &&
        this.patCabezaPos.y === this.patProteina[patVitamina].y
      ) {
        this.juego.gameOver();
        this.patCabezaPos.x = this.juego.patW;
        this.patCabezaPos.y = this.juego.patH;
      }
    for (
      let patCalcio = 0;
      patCalcio < this.patProteina.length - 1;
      patCalcio++
    )
      this.patProteina[patCalcio] = this.patProteina[patCalcio + 1];
    this.patProteina[this.patFinal - 1] = {
      x: this.patCabezaPos.x,
      y: this.patCabezaPos.y
    };

    if (this.patDireccion === DIRECCIONES.DERECHA) {
      this.patCabezaPos.x += 3;
    } else if (this.patDireccion === DIRECCIONES.IZQUIERDA) {
      this.patCabezaPos.x -= 3;
    } else if (this.patDireccion === DIRECCIONES.ARRIBA) {
      this.patCabezaPos.y -= 3;
    } else if (this.patDireccion === DIRECCIONES.ABAJO) {
      this.patCabezaPos.y += 3;
    }

    if (this.patCabezaPos.x <= 0)
      this.patCabezaPos.x = this.juego.areaDeJuego.w;
    if (this.patCabezaPos.x > this.juego.areaDeJuego.w) this.patCabezaPos.x = 0;
    if (this.patCabezaPos.y <= 0)
      this.patCabezaPos.y = this.juego.areaDeJuego.h;
    if (this.patCabezaPos.y > this.juego.areaDeJuego.h) this.patCabezaPos.y = 0;

    if (
      this.patCabezaPos.y <= 1 ||
      this.patCabezaPos.x <= 1 ||
      this.patCabezaPos.x + this.patW >= (this.juego.w / 3) * 2 ||
      this.patCabezaPos.y + this.patW >= this.juego.areaDeJuego.h ||
      this.patCabezaPos.x >= this.juego.areaDeJuego.w ||
      this.patCabezaPos.y >= this.juego.areaDeJuego.h
    ) {
      this.juego.gameOver();
      this.patProteina = [0];
    }
  }

  izquierda() {
    if (this.patDireccion !== DIRECCIONES.DERECHA)
      this.patDireccion = DIRECCIONES.IZQUIERDA;
  }
  arriba() {
    if (this.patDireccion !== DIRECCIONES.ABAJO)
      this.patDireccion = DIRECCIONES.ARRIBA;
  }
  derecha() {
    if (this.patDireccion !== DIRECCIONES.IZQUIERDA)
      this.patDireccion = DIRECCIONES.DERECHA;
  }
  abajo() {
    if (this.patDireccion !== DIRECCIONES.ARRIBA)
      this.patDireccion = DIRECCIONES.ABAJO;
  }
  reiniciar() {
    this.patCabezaPos = {
      x: 10,
      y: 10
    };
    this.patFinal = 0;
    this.patDireccion = DIRECCIONES.DERECHA;
  }
  cambiarTamanio() {
    this.patCabezaPos.x = this.patCabezaPos.x * this.juego.relacion.x;
    this.patCabezaPos.y = this.patCabezaPos.y * this.juego.relacion.y;
    this.w = this.w * this.juego.relacion.x;
    this.h = this.h * this.juego.relacion.y;
  }
}
