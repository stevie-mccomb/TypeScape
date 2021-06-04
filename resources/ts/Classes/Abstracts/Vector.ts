export default class Vector
{
    public x: number = 0;
    public y: number = 0;

    constructor(x: number = 0, y: number = 0)
    {
        this.x = x;
        this.y = y;
    }

    public normalize(): void
    {
        const normalized = this.normalized;

        this.x = normalized.x;
        this.y = normalized.y;
    }

    public get length(): number
    {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    public get normalized(): Vector
    {
        const x = this.length ? (this.x / this.length) : 0;
        const y = this.length ? (this.y / this.length) : 0;

        return new Vector(x, y);
    }
}
