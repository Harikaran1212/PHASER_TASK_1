import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const GameScene = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: 800,
      height: 600,
      scene: {
        preload,
        create,
      },
      backgroundColor: '#1e3c72', // Fallback solid color
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(gameConfig);

    function preload() {
      this.load.setBaseURL('https://labs.phaser.io');
      this.load.image('ball', 'assets/sprites/pangball.png');
    }

    function create() {
      // Create gradient background
      const graphics = this.add.graphics();
      graphics.fillGradientStyle(0x87CEFA, 0xFFB6C1, 0x87CEEB, 0x800080, 1);  // Gradient colors
      graphics.fillRect(0, 0, 800, 600);

      // Add a single bouncing ball
      const ball = this.physics.add.sprite(400, 300, 'ball');
      ball.setCollideWorldBounds(true); // Keeps the ball inside the game area
      ball.setBounce(1); // Makes it bouncy

      // Set random velocity for the ball
      const randomX = Phaser.Math.Between(-200, 200);
      const randomY = Phaser.Math.Between(-200, 200);
      ball.setVelocity(randomX, randomY);
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} id="phaser-game" />;
};

export default GameScene;
