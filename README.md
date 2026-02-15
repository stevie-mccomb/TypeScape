# TypeScape

## Table of Contents
0. [Introduction](#introduction)
1. [Quick-start](#quick-start)
2. [Sample Project](#sample-project)

## Introduction

TypeScape is a simple browser-based 2D game engine written in [TypeScript](https://www.typescriptlang.org/).

## Quick-start

If you already understand how game engines work, TypeScape should be easy to pick up. To get started:

1. Create some new `GameObject` files under `/resources/ts/Classes/GameObjects/` and make custom classes that extend the built-in `GameObject` class.
2. Instantiate those `GameObject` classes inside of the starter `PlayState` that has been created for you. You can create as many `State` classes as you would like to handle things like main menus, credits, pause screens, etc.
3. The `Game` class will then handle the built-in `update` and `render` functions of those `GameObject` instances for as long as the `PlayState` is active.

The engine is not hidden away in a separate "vendor" folder, so you're free to edit the core engine files as you work to make the engine's functionality suit your game. Feel free to dig around all of the `.ts` files located under `/resources/ts` to understand the engine's inner workings.

## Sample Project

To get a better understanding of how to use TypeScape, follow along with this simple tutorial to create your first TypeScape project. We're going to make a space-themed [shmup](https://en.wikipedia.org/wiki/Shoot_%27em_up) game.

First, let's create a new class for our player character's ship and create a new instance of that class in our global `PlayState`:

```ts
// /resources/ts/Classes/GameObjects/PlayerShip.ts

import GameObject from '@/Classes/GameObjects/GameObject';

export default class PlayerShip extends GameObject
{
  //
}
```

```ts
// /resources/ts/Classes/States/PlayState.ts
// ...
import PlayerShip from '@/Classes/GameObjects/PlayerShip'; // Import the PlayerShip class

export default class PlayState extends State
{
    // ...

    public enter(data: object = {}): void
    {
        new PlayerShip(); // Add this line here to create a new instance of our PlayerShip when the game enters the `PlayState`.
    }

    // ...
}

```

Next, let's give our player ship a visual representation using a `Sprite` so we can see it on the screen:

```ts
// /resources/ts/Sprites/PlayerShipSprite.ts
import SpriteConfig from '@/Interfaces/SpriteConfig';

const config: SpriteConfig = {
    "src": "/img/sprites/player-ship.png", // Swap out the path to your own static image asset.

    "width": 64, // Set the width of a single frame.
    "height": 64, // Set the height of a single frame.

    "animations": {
        "idle": {
            "frames": [ // If you have multiple animation frames, just add each frame to this array.
                {
                    "x": 0,
                    "y": 0
                }
            ]
        }
    }
};

export default config;
```

```ts
// ...
import PlayerShipSprite from '@/Sprites/PlayerShipSprite'; // Import your PlayerShip's SpriteConfig

export default class PlayerShip extends GameObject
{
    constructor()
    {
        super();
        
        this.sprite = new Sprite(this, PlayerShipSprite); // Create a constructor and assign the PlayerShip's sprite to a new sprite using your custom config.
    }

    // ...
}
```

You should now see your player's space ship on the screen when loading up the game:

![Player Ship](https://github.com/stevie-mccomb/TypeScape/blob/90b57c3291da142b323ddb1c465bde0099997679/readme/player-ship.png)

Now, let's use TypeScape's built-in `Controller` to handle user input so we can move the ship left and right:

```ts
// /resources/ts/Classes/GameObjects/PlayerShip.ts

// ...
import Controller from '@/Classes/Abstracts/Controller';
import Time from '@/Classes/Abstracts/Time';
import Stage from '@/Classes/Stage';

export default class PlayerShip extends GameObject
{
    private speed: number = 320.0; // Add a variable for tracking the ship's speed.

    constructor()
    {
        // ...

        this.bottom = Stage.instance.bottom - 32; // Vertically position the ship at the bottom of the `Stage`.
        this.centerX = Stage.instance.width * 0.5; // Horizontally position the ship in the center of the `Stage`.
    }

    /**
     * Add an "update" method that will run each frame.
     * We will check for input, move the ship, and keep it within the bounds of the `Stage` so it doesn't fly off the screen.
     */
    update()
    {
        if (Controller.instance.keyIsDown(65)) { // "A" key
            this.x -= this.speed * Time.deltaSeconds;
        }
        
        if (Controller.instance.keyIsDown(68)) { // "D" key
            this.x += this.speed * Time.deltaSeconds;
        }

        if (this.left < Stage.instance.left) {
            this.left = Stage.instance.left;
        }

        if (this.right > Stage.instance.right) {
            this.right = Stage.instance.right;
        }
    }
}
```

We can now control our ship by moving left and right with the "A" and "D" keys, respectively. Next up, let's make an `EnemyShip` class and an `EnemySpawner` class that will regularly spawn `EnemyShip` instances on a randomized interval:

```ts
// /resources/ts/Sprites/EnemyShipSprite.ts

import SpriteConfig from '@/Interfaces/SpriteConfig';

const config: SpriteConfig = {
    "src": "/img/sprites/enemy-ship.png", // Update this with your enemy ship's sprite filepath.

    "width": 64,
    "height": 64,

    "animations": {
        "idle": {
            "frames": [
                {
                    "x": 0,
                    "y": 0
                }
            ]
        }
    }
};

export default config;
```

```ts
// /resources/ts/Classes/GameObjects/EnemyShip.ts

import GameObject from '@/Classes/GameObjects/GameObject';
import EnemyShipSprite from '@/Sprites/EnemyShipSprite';
import Sprite from '@/Classes/Abstracts/Sprite';
import Time from '@/Classes/Abstracts/Time';
import Stage from '@/Classes/Stage';

export default class EnemyShip extends GameObject
{
    private speed: number = 240.0; // Make the EnemyShip slightly slower than the PlayerShip so the player can dodge it.

    constructor()
    {
        super();
        
        this.sprite = new Sprite(this, EnemyShipSprite);

        this.left = Math.floor(Math.random() * (Stage.instance.width - this.width)); // Horizontally position the EnemyShip at a random X position on the stage.
        this.bottom = Stage.instance.top; // Vertically position the EnemyShip just off the top of the screen.
    }

    update()
    {
        this.y += this.speed * Time.deltaSeconds; // Move downward.

        // If the EnemyShip has gone off the screen, destroy it to free up memory.
        if (this.top > Stage.instance.bottom) {
            this.destroy();
        }
    }
}
```

```ts
// /resources/ts/Classes/GameObjects/EnemySpawner.ts

import Time from '@/Classes/Abstracts/Time';
import EnemyShip from '@/Classes/GameObjects/EnemyShip';
import GameObject from '@/Classes/GameObjects/GameObject';

export default class EnemySpawner extends GameObject
{
    private secondsSinceLastSpawn: number = 0.0;
    private nextSpawnAt: number = 0.0;
    private minSpawnTime: number = 0.5;
    private maxSpawnTime: number = 3.0;

    constructor()
    {
        super();

        this.spawn();
    }

    update()
    {
        this.secondsSinceLastSpawn += Time.deltaSeconds;
        if (this.secondsSinceLastSpawn >= this.nextSpawnAt) {
            this.spawn();
        }
    }

    private spawn()
    {
        new EnemyShip();
        this.secondsSinceLastSpawn = 0.0;
        this.nextSpawnAt = Math.random() * (this.maxSpawnTime - this.minSpawnTime) + this.minSpawnTime;
    }
}
```

```ts
// ...
import EnemySpawner from '@/Classes/GameObjects/EnemySpawner'; // Import the new EnemySpawner class.

export default class PlayState extends State
{
    // ...

    public enter(data: object = {}): void
    {
        new PlayerShip();   
        new EnemySpawner(); // Create an instance of the new EnemySpawner class.
    }

    // ...
}
```

We now have enemies being spawned at random intervals that move toward the bottom of the screen:

![Enemy Ships](https://github.com/stevie-mccomb/TypeScape/blob/0f12e5bbc54914c4c81b578f56101f2e10d31576/readme/enemies.png)

Next, let's add a way of tracking all of our enemies so we can loop through them, and add some collision logic to our player so they can collide with the enemy ships and take damage:

```ts
// /resources/ts/Classes/GameObjects/EnemyShip.ts

export default class EnemyShip extends GameObject
{
    static enemies: EnemyShip[] = []; // A "multiton" array for tracking all of our living enemies.

    constructor()
    {
        super();

        EnemyShip.enemies.push(this); // Add our newly spawned ship to the "multiton" array.

        // ...
    }

    // A custom destroy function that will allow us to remove enemies from their "multiton" array when destroyed.
    destroy()
    {
        super.destroy();

        const index: number = EnemyShip.enemies.indexOf(this);
        if (index >= 0) {
            EnemyShip.enemies.splice(index, 1);
        }
    }
}
```

```ts
// /resources/ts/Classes/GameObjects/PlayerShip.ts

import EnemyShip from '@/Classes/GameObjects/EnemyShip';

export default class PlayerShip extends GameObject
{
    private health: number = 3; // Track our health; we can take 3 hits before a game over.
    private isRecovering: boolean = false; // Whether we're currently "recovering" and cannot be hit again.
    private secondsSinceHurt: number = 0.0; // Time since our last enemy collision.
    private recoveryDuration: number = 2.0; // How long we are invulnerable for after getting hit.

    // ...

    update()
    {
        if (this.isRecovering) {
            this.secondsSinceHurt += Time.deltaSeconds;
            if (this.secondsSinceHurt >= this.recoveryDuration) {
                this.isRecovering = false;
            }
        }

        // ...

        if (!this.isRecovering) {
            for (const enemy of EnemyShip.enemies) {
                if (this.colliding(enemy)) {
                    this.takeDamage();
                    break;
                }
            }
        }
    }

    public beforeRender(): void
    {
        if (this.isRecovering) Stage.instance.context.globalAlpha = 0.25; // Will make the player translucent after taking damage.
    }

    public afterRender(): void
    {
        if (this.isRecovering) Stage.instance.context.globalAlpha = 1.00; // Will restore the Stage's transparency so other objects can be drawn fully opaque again.
    }

    private takeDamage(): void
    {
        if (this.isRecovering) return;
        this.isRecovering = true;

        this.secondsSinceHurt = 0.0;
        --this.health;

        if (this.health <= 0) {
            alert('Game Over!');
            window.location.reload();
        }
    }
}
```

Now we almost have a fully functional game! We can now control our ship and dodge the enemies and we have a "game over" state if we get hit three times.
