export const DIRECCIONES = {
  ARRIBA: 1,
  ABAJO: 2,
  IZQUIERDA: 3,
  DERECHA: 4
};

export const ESTADOS = {
  PAUSADO: 0,
  CORRIENDO: 1,
  MENU: 2,
  GAMEOVER: 3,
  NIVEL: 4
};

export function sound(src, loop) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  if (loop) this.sound.setAttribute("loop", true);
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}

export function patColision(c, s) {
  return (
    c.patCabezaPos.x + c.patW >= s.patCabezaPos.x &&
    c.patCabezaPos.x <= s.patCabezaPos.x + s.patW &&
    c.patCabezaPos.y - c.patH <= s.patCabezaPos.y &&
    c.patCabezaPos.y + c.patH >= s.patCabezaPos.y
  );
}
