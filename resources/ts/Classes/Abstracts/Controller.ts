import { Mouse, MouseButton } from 'Interfaces/Mouse';
import GameObject from 'GameObjects/GameObject';
import Stage from 'Stage';

class Controller
{
    static instance: Controller;

    private _mouse: Mouse = { x: 0, y: 0, buttons: [ { index: 0, name: 'left', down: false } ] };
    private keys: number[] = [];
    private onKeydownBound: EventListener = this.onKeydown.bind(this);
    private onKeyupBound: EventListener = this.onKeyup.bind(this);
    private onClickBound: EventListener = this.onClick.bind(this);
    private onMousemoveBound: EventListener = this.onMousemove.bind(this);
    private onMousedownBound: EventListener = this.onMousedown.bind(this);
    private onMouseupBound: EventListener = this.onMouseup.bind(this);
    private onGamepadConnectedBound: EventListener = this.onGamepadConnected.bind(this);
    private onGamepadDisconnectedBound: EventListener = this.onGamepadDisconnected.bind(this);

    constructor()
    {
        Controller.instance = this;

        document.addEventListener('keydown', this.onKeydownBound);
        document.addEventListener('keyup', this.onKeyupBound);
        Stage.instance.element.addEventListener('click', this.onClickBound);
        Stage.instance.element.addEventListener('mousemove', this.onMousemoveBound);
        Stage.instance.element.addEventListener('mousedown', this.onMousedownBound);
        Stage.instance.element.addEventListener('mouseup', this.onMouseupBound);

        window.addEventListener('gamepadconnected', this.onGamepadConnectedBound);
        window.addEventListener('gamepaddisconnected', this.onGamepadDisconnectedBound);
    }

    destroy()
    {
        document.removeEventListener('keydown', this.onKeydownBound);
        document.removeEventListener('keyup', this.onKeyupBound);
        Stage.instance.element.removeEventListener('click', this.onClickBound);
        Stage.instance.element.removeEventListener('mousemove', this.onMousemoveBound);
        Stage.instance.element.removeEventListener('mousedown', this.onMousedownBound);
        Stage.instance.element.removeEventListener('mouseup', this.onMouseupBound);

        window.removeEventListener('gamepadconnected', this.onGamepadConnectedBound);
        window.removeEventListener('gamepaddisconnected', this.onGamepadDisconnectedBound);
    }

    onGamepadConnected()
    {
        //
    }

    onGamepadDisconnected()
    {
        //
    }

    onKeydown(e)
    {
        let index: number = this.keys.indexOf(e.keyCode);

        if (index < 0) this.keys.push(e.keyCode);
    }

    onKeyup(e)
    {
        let index: number = this.keys.indexOf(e.keyCode);

        if (index >= 0) this.keys.splice(index, 1);
    }

    onClick(e): void
    {
        GameObject.sortByZ();

        for (let gameObject of GameObject.instances) {
            if (gameObject.isUnder(this.mouse.x, this.mouse.y)) {
                return gameObject.onClick(e);
            }
        }
    }

    onMousemove(e): void
    {
        let scale = Stage.instance.width / Stage.instance.element.offsetWidth;

        this.mouse.x = e.offsetX * scale;
        this.mouse.y = e.offsetY * scale;
    }

    onMousedown(e)
    {
        this.mouse.buttons[0].down = true;
    }

    onMouseup(e)
    {
        this.mouse.buttons[0].down = false;
    }

    keyIsDown(keyCode: number)
    {
        return this.keys.indexOf(keyCode) >= 0;
    }

    buttonIsDown(button)
    {
        let gamepads = navigator.getGamepads();
        if (!gamepads || !gamepads.length || !gamepads[0]) return false;

        return gamepads[0].buttons[button].pressed;
    }

    vibrate(options: object = { startDelay: 0, duration: 500, weakMagnitude: 0.5, strongMagnitude: 0.5 })
    {
        let gamepads = navigator.getGamepads();
        if (!gamepads || !gamepads.length || !gamepads[0]) return false;

        // @ts-ignore: GamepadActuator is not recognized by the typescript interpreter, but works in Chrome, which is the only intended build platform.
        navigator.getGamepads()[0].vibrationActuator.playEffect('dual-rumble', options);
    }

    get axes(): readonly number[]
    {
        let gamepads = navigator.getGamepads();
        if (!gamepads || !gamepads.length || !gamepads[0]) return [0, 0, 0, 0];

        return gamepads[0].axes;
    }

    get buttons(): readonly GamepadButton[]
    {
        let gamepads = navigator.getGamepads();
        if (!gamepads || !gamepads.length || !gamepads[0]) return [];

        return gamepads[0].buttons;
    }

    get mouse(): Mouse
    {
        return this._mouse;
    }
}

export default Controller;
