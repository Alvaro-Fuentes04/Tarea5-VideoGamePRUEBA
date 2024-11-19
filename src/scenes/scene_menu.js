class Scene_menu extends Phaser.Scene {
  constructor() {
    super({ key: "Scene_menu" });
  }

  create() {
    let center_width = this.sys.game.config.width / 2;
    let center_height = this.sys.game.config.height / 2;

    // Título del menú
    this.add.text(center_width, center_height - 100, "Main Menu", {
      font: "bold 48px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 6,
    }).setOrigin(0.5);

    // Botón de inicio
    let startButton = this.add.text(center_width, center_height, "'Click' para Iniciar Juego", {
      font: "bold 32px Arial",
      fill: "#00ff00",
      align: "center",
      stroke: "#000000",
      strokeThickness: 4,
      backgroundColor: "#222222",
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setInteractive();

    this.add.text(center_width, center_height + 100, "Pong is a classic table tennis simulation game where players bounce a ball across the screen using paddles ", {
      font: "bold 12px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 6,
    }).setOrigin(0.5);

    // Evento de clic en el botón
    startButton.on("pointerdown", () => {
      this.scene.start("Scene_play"); // Inicia la escena del juego
    });

    // Cambiar el estilo al pasar el mouse
    startButton.on("pointerover", () => {
      startButton.setStyle({ fill: "#ffcc00" }); // Cambia a amarillo
    });

    startButton.on("pointerout", () => {
      startButton.setStyle({ fill: "#00ff00" }); // Regresa a verde
    });
  }
}

export default Scene_menu;
