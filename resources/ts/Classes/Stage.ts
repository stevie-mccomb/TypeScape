import Game from 'Game';

class Stage
{
    static instance: Stage;

    element: HTMLCanvasElement = document.createElement('canvas');
    context: CanvasRenderingContext2D = this.element.getContext('2d');

    constructor()
    {
        if (Stage.instance) Stage.instance.destroy();
        Stage.instance = this;

        this.element.className = 'stage';
        this.element.textContent = 'Your platform is not supported.';
        this.element.setAttribute('width', '1920');
        this.element.setAttribute('height', '1080');
        Game.instance.element.append(this.element);

        this.context.imageSmoothingEnabled = false;
    }

    update()
    {
        //
    }

    render()
    {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    destroy()
    {
        this.element.parentNode.removeChild(this.element);

        Stage.instance = undefined;
    }

    get width(): number
    {
        return parseInt(this.element.getAttribute('width'));
    }

    get height(): number
    {
        return parseInt(this.element.getAttribute('height'));
    }

    get top(): number
    {
        return 0;
    }

    get left(): number
    {
        return 0;
    }

    get bottom(): number
    {
        return this.height;
    }

    get right(): number
    {
        return this.width;
    }
}

export default Stage;
