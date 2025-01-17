import Palas from '../gameObjects/palas.js';

class Scene_play extends Phaser.Scene {
  constructor() {
    super({ key: "Scene_play" });
  }

  create() {
    let center_width = this.sys.game.config.width / 2;
    let center_height = this.sys.game.config.height / 2;

    // Score
    this.score_izq = 0;
    this.score_der = 0;
    var style = { font: "bold 32px Arial", fill: "#fff", align: "center", boundsAlignH: "center", boundsAlignV: "middle" };
    this.scoreText_izq = this.add.text(center_width - 48, 16, '0', style);
    this.scoreText_der = this.add.text(center_width + 28, 16, '0', style);

    // Game over text
    this.gameOverText = this.add.text(center_width, center_height, '', {
      font: "bold 48px Arial",
      fill: "#ffcc00",
      stroke: "#000",
      strokeThickness: 6,
      align: "center",
    }).setOrigin(0.5);
    this.gameOver = false;

    // Separador
    this.add.image(center_width, center_height, "separador");

    // Palas
    this.izquierda = new Palas(this, 30, center_height, "izquierda");
    this.derecha = new Palas(this, this.sys.game.config.width - 30, center_height, "derecha");

    // bola
    this.physics.world.setBoundsCollision(false, false, true, true);
    this.ball = this.physics.add.image(center_width, center_height, "ball");
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocityX(-180);

    // Fisicas
    this.physics.add.collider(this.ball, this.izquierda, this.chocaPala, null, this);
    this.physics.add.collider(this.ball, this.derecha, this.chocaPala, null, this);

    // Controles
    this.cursor = this.input.keyboard.createCursorKeys();
    this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.ball.x < 0) {
      this.score_der++;
      this.scoreText_der.setText(this.score_der);
      this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
      this.checkGameOver();
    } else if (this.ball.x > this.sys.game.config.width) {
      this.score_izq++;
      this.scoreText_izq.setText(this.score_izq);
      this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
      this.checkGameOver();
    }

    if (this.cursor.down.isDown) {
      this.derecha.body.setVelocityY(300);
    } else if (this.cursor.up.isDown) {
      this.derecha.body.setVelocityY(-300);
    } else {
      this.derecha.body.setVelocityY(0);
    }

    if (this.cursor_S.isDown) {
      this.izquierda.body.setVelocityY(300);
    } else if (this.cursor_W.isDown) {
      this.izquierda.body.setVelocityY(-300);
    } else {
      this.izquierda.body.setVelocityY(0);
    }
  }

  chocaPala() {
    this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
  }

  checkGameOver() {
    if (this.score_izq === 11 || this.score_der === 11) {
      this.gameOver = true;
      this.ball.setVelocity(0);
      this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);

      if (this.score_izq === 11) {
        this.gameOverText.setText("¡Jugador 1 Gana! 🎉");
      } else {
        this.gameOverText.setText("¡Jugador 2 Gana! 🎉");
      }
    }
  }
}

export default Scene_play;
