import Game from '@/Classes/Game';

export default class Stage
{
    private static _instance: Stage;

    private _element: HTMLCanvasElement = document.createElement('canvas');
    private _context: CanvasRenderingContext2D = this.element.getContext('2d');

    constructor()
    {
        if (Stage._instance) Stage._instance.destroy();
        Stage._instance = this;

        this.element.className = 'stage';
        this.element.textContent = 'Your platform is not supported.';
        this.element.setAttribute('width', '1920');
        this.element.setAttribute('height', '1080');
        Game.instance.element.append(this.element);

        this.context.imageSmoothingEnabled = false;
    }

    public update(): void
    {
        //
    }

    public render(): void
    {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    public destroy(): void
    {
        this.element.parentNode.removeChild(this.element);

        Stage._instance = undefined;
    }

    public get element(): HTMLCanvasElement
    {
        return this._element;
    }

    public get context(): CanvasRenderingContext2D
    {
        return this._context;
    }

    public get width(): number
    {
        return parseInt(this.element.getAttribute('width'));
    }

    public get height(): number
    {
        return parseInt(this.element.getAttribute('height'));
    }

    public get top(): number
    {
        return 0;
    }

    public get left(): number
    {
        return 0;
    }

    public get bottom(): number
    {
        return this.height;
    }

    public get right(): number
    {
        return this.width;
    }

    public static get instance(): Stage
    {
        return Stage._instance;
    }
}
