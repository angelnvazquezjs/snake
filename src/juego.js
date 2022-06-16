import { ESTADOS, sound } from "./funciones";
import Culebrita from "./culebrita";
import Entrada from "./entrada";
import Menu from "./menu";
import Comida from "./comida";
export default class Juego {
  constructor(canvas, w, h) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.w = document.documentElement.clientWidth - 50;
    this.h = document.documentElement.clientHeight - 50;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.patW = 600;
    this.patH = 600;
    this.areaDeJuego = {
      x: 0,
      y: 0,
      w: (this.w / 4) * 3,
      h: this.h
    };
    this.puntajes = 0;
    this.record = 0;
    this.relacion = { x: 1, y: 1 };
    this.estado = ESTADOS.MENU;
    this.culebrita = new Culebrita(10, 10, 10, 10, this);
    this.entrada = new Entrada(this);
    this.musicaDeFondo = new sound("../sound/spin.mp3", true);
    this.efecto = new sound("../sound/comiendo.mp3", false);
    this.comida = new Comida(
      Math.floor(Math.random() * (this.w / 3) * 2),
      Math.floor(Math.random() * this.areaDeJuego.h),
      this.patW / 50,
      this.patH / 50,
      this
    );
    this.menu = new Menu(this);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  //Dibuja el cuadro
  dibujar() {
    this.menu.dibujar();
    if (this.estado === ESTADOS.CORRIENDO) {
      this.culebrita.dibujar();
      if (this.comida.patEnergia > 0) this.comida.dibujar();
      else {
        this.comida.patCabezaPos.x = Math.floor(
          Math.random() * ((this.w / 3) * 2 - 50) + 1
        );
        this.comida.patCabezaPos.y = Math.floor(
          Math.random() * (this.h - 50) + 1
        );
        this.comida.patEnergia = 100;
        this.comida.dibujar();
        this.efecto.play();
      }
    }
  }

  //Ajusta la posición-movimiento del cuadro
  actualizar() {
    this.menu.actualizar();
    if (this.estado === ESTADOS.CORRIENDO) {
      this.culebrita.actualizar();
      this.comida.actualizar();
    }
    if (this.estado === ESTADOS.GAMEOVER) {
      this.culebrita.reiniciar();
    }
  }

  iniciar() {
    if (this.estado === ESTADOS.MENU) {
      this.estado = ESTADOS.CORRIENDO;
      this.musicaDeFondo.play();
    }
    if (this.estado === ESTADOS.GAMEOVER) {
      this.estado = ESTADOS.CORRIENDO;
      this.musicaDeFondo.play();
    }
  }

  pausar() {
    if (this.estado === ESTADOS.PAUSADO) {
      this.estado = ESTADOS.CORRIENDO;
      this.musicaDeFondo.play();
    } else {
      this.estado = ESTADOS.PAUSADO;
      this.musicaDeFondo.stop();
    }
  }
  gameOver() {
    this.estado = ESTADOS.GAMEOVER;
    this.musicaDeFondo.stop();
    if (this.puntajes >= this.record) this.record = this.puntajes;
    this.puntajes = 0;
  }

  cambiarTamanio() {
    this.relacion.x = document.documentElement.clientWidth / this.w;
    this.relacion.y = document.documentElement.clientHeight / this.h;
    this.w = document.documentElement.clientWidth;
    this.h = document.documentElement.clientHeight;
    this.areaDeJuego.x = this.areaDeJuego.x * this.relacion.x;
    this.areaDeJuego.y = this.areaDeJuego.y * this.relacion.y;
    this.areaDeJuego.w = this.areaDeJuego.w * this.relacion.x;
    this.areaDeJuego.h = this.areaDeJuego.h * this.relacion.y;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.culebrita.cambiarTamanio();
    this.menu.cambiarTamanio();
  }
}
