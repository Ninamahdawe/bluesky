class Game {

	constructor() {
		this.playerSpeed = 230;
		this.enemySpeed = 160;
		this.bulletSpeed = 800;
		this.score = 0;
		this.sceneNames = ['chunk', 'game-over'];
		this.scenes = [];
		this.args = null;
		this.width = 800;
		this.height = 608;

		kaboom({
			width: this.width,
			height: this.height,
			background: [33, 54, 7],
			debug: false
		});

		this.loadAssets();

		for (let i = 0; i < this.sceneNames.length; i++) {
			this.addScene(i);
		}
	}

	loadAssets() {
		loadSpriteAtlas('sprites/grass-atlas.png', {
			'grass': {
				'x': 0,
				'y': 0,
				'width': 320,
				'height': 256,
				'sliceX': 10,
				'sliceY': 8
			}
		});
		loadSpriteAtlas('sprites/free_character_1-3.png', {
			'character1': {
				'x': 0,
				'y': 0,
				'width': 144,
				'height': 80,
				'sliceX': 9,
				'sliceY': 4,
				'anims': {
					'walk_down': {
						'from': 0,
						'to': 2,
						'loop': true,
						'speed': 3
					},
					'walk_left': {
						'from': 9,
						'to': 11,
						'loop': true,
						'speed': 3
					},
					'walk_right': {
						'from': 18,
						'to': 20,
						'loop': true,
						'speed': 3
					},
					'walk_up': {
						'from': 27,
						'to': 29,
						'loop': true,
						'speed': 3
					}
				}
			},
			'character2': {
				'x': 0,
				'y': 0,
				'width': 144,
				'height': 80,
				'sliceX': 9,
				'sliceY': 4,
				'anims': {
					'walk_down': {
						'from': 3,
						'to': 5,
						'loop': true,
						'speed': 3
					},
					'walk_left': {
						'from': 12,
						'to': 14,
						'loop': true,
						'speed': 3
					},
					'walk_right': {
						'from': 21,
						'to': 23,
						'loop': true,
						'speed': 3
					},
					'walk_up': {
						'from': 27,
						'to': 29,
						'loop': true,
						'speed': 3
					}
				}
			}
		});
		loadSprite('steel', '/sprites/steel.png');
		loadSprite('key', '/sprites/key.png');
		loadSprite('well', '/sprites/well.png');
	}

	addKey() {
		const newPosition = {
			x: rand(64, width() - 64),
			y: rand(64, height() - 64)
		};
		this.key = add([
			sprite('key'),
			pos(newPosition.x, newPosition.y),
			anchor('center'),
			area(),
			scale(1 / 2),
			'key'
		]);
	}

	addScene(sceneIndex) {
		switch (sceneIndex) {
			case 0: {
				this.scenes.push(scene(this.sceneNames[sceneIndex], async () => {
					await this.addChunkSceneLevels();
					this.addPlayer();
					this.setPlayerKeyEvents();
					this.setPlayerCollisions();
					this.addEnemy();
					this.setEnemyStates();
					this.setEnemyOnUpdateEvents();
					this.addKey();
					this.addScoreBoard();
					this.setOnScoreBoardEvents();
				}));
				break;
			}
			case 1: {
				this.scenes.push(scene(this.sceneNames[sceneIndex], () => {
					add([
						text('Game Over'),
						pos(center()),
						anchor('center')
					]);
					this.addScoreBoard();
				}));
			}
		}
	}

	async addChunkSceneLevels() {
		const response = await fetch('/api/chunks/1');
		const chunk = await response.json();
		console.log(chunk);
		const grid = JSON.parse(chunk.grid);


		addLevel(grid[0], {
			tileWidth: 32,
			tileHeight: 32,
			pos: vec2(0, 0),
			tiles: {
				' ': () => [
					sprite('grass', { frame: ~~rand(0, 8) }),
					anchor('topleft')
				],
				'=': () => [
					sprite('steel'),
					anchor('topleft'),
					area(),
					body({ isStatic: true }),
					scale(1 / 2)
				]
			}
		});

		addLevel(grid[1], {
			tileWidth: 32,
			tileHeight: 32,
			pos: vec2(0, 0),
			tiles: {
				'w': () => [
					sprite('well'),
					anchor('center'),
					area(),
					body({ isStatic: true }),
					'well'
				]
			}
		});

	}

	addPlayer() {
		this.player = add([
			sprite('character1', { anim: 'walk_down' }),
			pos(width() / 2, height() / 2),
			area(),
			body(),
			scale(3),
			anchor('center')
		]);
	}

	addEnemy() {
		this.enemy = add([
			sprite('character2', { anim: 'walk_down' }),
			pos(10, 10),
			area(),
			body(),
			scale(3),
			state('move', ['idle', 'attack', 'move'])
		]);
	}

	setEnemyStates() {
		this.enemy.onStateEnter('idle', async () => {
			await wait(0.5);
			this.enemy.enterState('attack');
		});

		this.enemy.onStateEnter('attack', async () => {

			if (this.player.exists()) {

				const dir = this.player.pos.sub(this.enemy.pos).unit();

				add([
					pos(this.enemy.pos),
					move(dir, this.bulletSpeed),
					rect(12, 12),
					area(),
					offscreen({ destroy: true }),
					anchor('center'),
					color(BLUE),
					'bullet'
				]);
			}

			await wait(1);
			this.enemy.enterState('move');

		});

		this.enemy.onStateEnter('move', async () => {
			await wait(2);
			this.enemy.enterState('idle');
		});

	}

	setEnemyOnUpdateEvents() {
		this.enemy.onStateUpdate('move', () => {
			if (!this.player.exists()) return;
			const dir = this.player.pos.sub(this.enemy.pos).unit();
			this.enemy.move(dir.scale(this.enemySpeed));
		});
	}

	setPlayerCollisions() {
		const waitTime = 3;

		this.player.onCollide('bullet', (item) => {
			destroy(item);
			destroy(this.player);
			addKaboom(item.pos);
			wait(waitTime, () => {
				go(game.sceneNames[1], game.args);
			});
		});

		this.player.onCollide('key', (item) => {
			destroy(item);
			this.score += 10;
			wait(3, () => {
				this.addKey();
			});
		});
	}

	addScoreBoard() {
		this.scoreboard = add([
			text(`Score: ${this.score.toString()}`),
			pos(5, 5)
		]);
	}

	setOnScoreBoardEvents() {
		onUpdate(() => {
			if (!this.player.exists()) {
				return;
			}
			this.scoreboard.text = `Score: ${this.score.toString()}`;
		});
	}

	setPlayerKeyEvents() {

		const keys = ['up', 'right', 'down', 'left'];

		const playerKeyData = [];

		for (const key of keys) {
			playerKeyData.push({
				key: key,
				animation: `walk_${key}`
			}
			);
		}

		for (const keyData of playerKeyData) {
			onKeyPress(keyData.key, () => {
				this.player.play(keyData.animation);
			});

			let direction;
			let speed;

			switch (keyData.key) {
				case 'up': {
					direction = 0;
					speed = -this.playerSpeed;
					break;
				}
				case 'right': {
					direction = this.playerSpeed;
					speed = 0;
					break;
				}
				case 'down': {
					direction = 0;
					speed = this.playerSpeed;
					break;
				}
				case 'left': {
					direction = -this.playerSpeed;
					speed = 0;
					break;
				}
			}

			onKeyDown(keyData.key, () => {
				this.player.move(direction, speed);
			});
		}
	}
}

function startGame() {
	go(game.sceneNames[0], game.args);
}

const game = new Game();
startGame();
