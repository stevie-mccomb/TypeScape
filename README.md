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

        this.bottom = Stage.instance.bottom - 32; // Position the ship at the bottom of the `Stage` when it spawns.
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

We can now control our ship by moving left and right with the "A" and "D" keys, respectively.
