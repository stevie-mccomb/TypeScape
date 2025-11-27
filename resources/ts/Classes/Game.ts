import Controller from '@/Classes/Abstracts/Controller';
import MasterMachine from '@/Classes/Machines/MasterMachine';
import Stage from '@/Classes/Stage';
import Time from '@/Classes/Abstracts/Time';

export default class Game
{
    private static _instance: Game;

    private _element: HTMLDivElement = document.createElement('div');
    private animationFrame: number = 0;
    private loopBound: FrameRequestCallback = this.loop.bind(this);

    constructor()
    {
        if (Game._instance) Game._instance.destroy();
        Game._instance = this;

        this._element.className = 'game';
        document.body.appendChild(this._element);

        new Stage();
        new Controller();
        new MasterMachine();

        this.animationFrame = requestAnimationFrame(this.loopBound);
    }

    public loop(timestamp: number): void
    {
        Time.delta = timestamp - Time.lastUpdated;

        this.update();
        this.render();

        Time.lastUpdated = timestamp;

        this.animationFrame = requestAnimationFrame(this.loopBound);
    }

    public update(): void
    {
        Stage.instance.update();
        MasterMachine.instance.update();
    }

    public render(): void
    {
        Stage.instance.render();
        MasterMachine.instance.render();
    }

    public destroy(): void
    {
        this._element.parentNode.removeChild(this._element);

        Game._instance = undefined;
    }

    public get element(): HTMLDivElement
    {
        return this._element;
    }

    public static get instance(): Game
    {
        return Game._instance;
    }
}
