import Sprite from '@/Classes/Abstracts/Sprite';
import Vector from '@/Classes/Abstracts/Vector';

export default abstract class GameObject
{
    protected static _instances: GameObject[] = [];

    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    protected _width: number = 0;
    protected _height: number = 0;
    protected _interactable: boolean = false;
    protected sprite: Sprite = null;

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0)
    {
        GameObject._instances.push(this);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public update(): void
    {
        //
    }

    public render(): void
    {
        if (this.sprite) {
            this.sprite.update();
            this.sprite.render();
        }
    }

    public destroy(): void
    {
        const index = GameObject.instances.indexOf(this);
        if (index >= 0) GameObject._instances.splice(index, 1);
    }

    public interact(): void
    {
        //
    }

    public colliding(other: GameObject): string
    {
        const colliding: boolean = (
            this.top < other.bottom
                &&
            this.left < other.right
                &&
            this.bottom > other.top
                &&
            this.right > other.left
        );

        if (colliding) {
            const diffs = {
                top: Math.abs(this.top - other.bottom),
                left: Math.abs(this.left - other.right),
                bottom: Math.abs(this.bottom - other.top),
                right: Math.abs(this.right - other.left)
            };

            const shallowest = Math.min(diffs.top, diffs.left, diffs.bottom, diffs.right);

            if (shallowest === diffs.top) return 'top';
            if (shallowest === diffs.left) return 'left';
            if (shallowest === diffs.bottom) return 'bottom';
            if (shallowest === diffs.right) return 'right';
        }

        return '';
    }

    public onClick(e): void
    {
        //
    }

    public onMousedown(e): void
    {
        //
    }

    public onMouseup(e): void
    {
        //
    }

    public isUnder(vector: Vector): boolean
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

    public get width(): number
    {
        if (this.sprite && this.sprite.width) return this.sprite.width;

        return this._width;
    }

    public get height(): number
    {
        if (this.sprite && this.sprite.height) return this.sprite.height;

        return this._height;
    }

    public get top(): number
    {
        return this.y;
    }

    public get left(): number
    {
        return this.x;
    }

    public get bottom(): number
    {
        return this.top + this.height;
    }

    public get right(): number
    {
        return this.left + this.width;
    }

    public get center(): Vector
    {
        const x = this.left + (this.width / 2);
        const y = this.top + (this.height / 2);
        return new Vector(x, y);
    }

    public get centerX(): number
    {
        return this.center.x;
    }

    public get centerY(): number
    {
        return this.center.y;
    }

    public get interactable(): boolean
    {
        return this._interactable;
    }

    public get interactableRange(): number
    {
        return (this.height / 2) + 1;
    }

    public set width(value: number)
    {
        this._width = value;
    }

    public set height(value: number)
    {
        this._height = value;
    }

    public set top(value: number)
    {
        this.y = value;
    }

    public set left(value: number)
    {
        this.x = value;
    }

    public set bottom(value: number)
    {
        this.y = value - this.height;
    }

    public set right(value: number)
    {
        this.x = value - this.width;
    }

    public set center(pos: Vector)
    {
        this.x = pos.x - (this.width / 2);
        this.y = pos.y - (this.height / 2);
    }

    public set centerX(value: number)
    {
        this.x = value - (this.width / 2);
    }

    public set centerY(value: number)
    {
        this.y = value - (this.height / 2);
    }

    public get vector(): Vector
    {
        return new Vector(this.x, this.y);
    }

    public static atVector(vector: Vector, not: GameObject[] = null): GameObject
    {
        GameObject.sortByZ();

        for (let i = GameObject.instances.length - 1; i >= 0; --i) {
            const instance = GameObject.instances[i];
            if (not.indexOf(instance) >= 0) continue;
            if (vector.x >= instance.left && vector.x <= instance.right && vector.y >= instance.top && vector.y <= instance.bottom) {
                return instance;
            }
        }

        return null;
    }

    public static get highest(): GameObject
    {
        let highest = {z: 0} as GameObject;
        for (let gameObject of GameObject.instances) {
            if (!highest.z || gameObject.z > highest.z) highest = gameObject;
        }
        return highest;
    }

    public static sortByZ(): GameObject[]
    {
        return GameObject._instances.sort((a, b) => a.z - b.z);
    }

    public static get instances(): readonly GameObject[]
    {
        return GameObject._instances;
    }
}
