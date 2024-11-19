import Bootloader from './bootloader.js';
import Scene_menu from './scenes/scene_menu.js';
import Scene_play from './scenes/scene_play.js';
const config = {
  width: 740,
  height: 500,
  parent: "contenedor",
  physics: {
    default: "arcade"
  },
  scene: [
    Bootloader,
    Scene_menu,
    Scene_play
  ]
}

new Phaser.Game(config);
