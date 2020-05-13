import Controller from 'Abstracts/Controller';
import MasterMachine from 'Machines/MasterMachine';
import Stage from 'Stage';
import Time from 'Abstracts/Time';

class Game
{
    static instance: Game;

    element: HTMLDivElement = document.createElement('div');
    animationFrame: number = 0;
    loopBound: FrameRequestCallback = this.loop.bind(this);

    constructor()
    {
        if (Game.instance) Game.instance.destroy();
        Game.instance = this;

        this.element.className = 'game';
        document.body.appendChild(this.element);

        new Stage();
        new Controller();
        new MasterMachine();

        this.animationFrame = requestAnimationFrame(this.loopBound);
    }

    loop(timestamp: number)
    {
        Time.delta = (timestamp - Time.lastUpdated) / 100;

        this.update();
        this.render();

        Time.lastUpdated = timestamp;

        this.animationFrame = requestAnimationFrame(this.loopBound);
    }

    update()
    {
        Stage.instance.update();
        MasterMachine.instance.update();
    }

    render()
    {
        Stage.instance.render();
        MasterMachine.instance.render();
    }

    destroy()
    {
        this.element.parentNode.removeChild(this.element);

        Game.instance = undefined;
    }
}

export default Game;
