import RigidBody from 'GameObjects/RigidBody';
import Sprite from 'Abstracts/Sprite';
import Vector from 'Interfaces/Vector';

abstract class GameObject
{
    static instances: GameObject[] = [];

    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    protected _width: number = 0;
    protected _height: number = 0;
    protected _interactable: boolean = false;
    protected sprite: Sprite = null;

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0)
    {
        GameObject.instances.push(this);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update()
    {
        //
    }

    render()
    {
        if (this.sprite) {
            this.sprite.update();
            this.sprite.render();
        }
    }

    destroy()
    {
        let index = GameObject.instances.indexOf(this);

        if (index >= 0) GameObject.instances.splice(index, 1);
    }

    interact()
    {
        //
    }

    colliding(other: GameObject): string
    {
        let colliding: boolean = (
            this.top < other.bottom
                &&
            this.left < other.right
                &&
            this.bottom > other.top
                &&
            this.right > other.left
        );

        if (colliding) {
            let diffs = {
                top: Math.abs(this.top - other.bottom),
                left: Math.abs(this.left - other.right),
                bottom: Math.abs(this.bottom - other.top),
                right: Math.abs(this.right - other.left)
            };

            let shallowest = Math.min(diffs.top, diffs.left, diffs.bottom, diffs.right);

            if (shallowest === diffs.top) return 'top';
            if (shallowest === diffs.left) return 'left';
            if (shallowest === diffs.bottom) return 'bottom';
            if (shallowest === diffs.right) return 'right';
        }

        return '';
    }

    onClick(e)
    {
        //
    }

    onMousedown(e)
    {
        //
    }

    onMouseup(e)
    {
        //
    }

    isUnder(vector: Vector): boolean
    {
        return (
            vector.x >= this.left
                &&
            vector.x <= this.right
                &&
            vector.y >= this.top
                &&
            vector.y <= this.bottom
        );
    }

    get width(): number
    {
        if (this.sprite && this.sprite.width) return this.sprite.width;

        return this._width;
    }

    get height(): number
    {
        if (this.sprite && this.sprite.height) return this.sprite.height;

        return this._height;
    }

    get top(): number
    {
        return this.y;
    }

    get left(): number
    {
        return this.x;
    }

    get bottom(): number
    {
        return this.top + this.height;
    }

    get right(): number
    {
        return this.left + this.width;
    }

    get center(): Vector
    {
        return {
            x: this.left + (this.width / 2),
            y: this.top + (this.height / 2)
        };
    }

    get centerX(): number
    {
        return this.center.x;
    }

    get centerY(): number
    {
        return this.center.y;
    }

    get interactable(): boolean
    {
        return this._interactable;
    }

    get interactableRange(): number
    {
        return (this.height / 2) + 1;
    }

    set width(value: number)
    {
        this._width = value;
    }

    set height(value: number)
    {
        this._height = value;
    }

    set top(value: number)
    {
        this.y = value;
    }

    set left(value: number)
    {
        this.x = value;
    }

    set bottom(value: number)
    {
        this.y = value - this.height;
    }

    set right(value: number)
    {
        this.x = value - this.width;
    }

    set center(pos: Vector)
    {
        this.x = pos.x - (this.width / 2);
        this.y = pos.y - (this.height / 2);
    }

    set centerX(value: number)
    {
        this.x = value - (this.width / 2);
    }

    set centerY(value: number)
    {
        this.y = value - (this.height / 2);
    }

    get vector(): Vector
    {
        return {
            x: this.x,
            y: this.y
        };
    }

    static atVector(vector: Vector, not: GameObject[] = null): GameObject
    {
        GameObject.sortByZ();

        for (let i = GameObject.instances.length - 1; i >= 0; --i) {
            let instance = GameObject.instances[i];
            if (not.indexOf(instance) >= 0) continue;
            if (vector.x >= instance.left && vector.x <= instance.right && vector.y >= instance.top && vector.y <= instance.bottom) {
                return instance;
            }
        }

        return null;
    }

    static get highest(): GameObject
    {
        let highest = {z: 0} as GameObject;
        for (let gameObject of GameObject.instances) {
            if (!highest.z || gameObject.z > highest.z) highest = gameObject;
        }
        return highest;
    }

    static sortByZ(): GameObject[]
    {
        return GameObject.instances.sort((a, b) => a.z - b.z);
    }
}

export default GameObject;
