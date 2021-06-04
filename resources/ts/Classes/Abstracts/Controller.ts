import { Mouse, MouseButton } from 'Interfaces/Mouse';
import GameObject from 'GameObjects/GameObject';
import Stage from 'Stage';
import Vector from 'Abstracts/Vector';

export default class Controller
{
    private static _instance: Controller;

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
        Controller._instance = this;

        document.addEventListener('keydown', this.onKeydownBound);
        document.addEventListener('keyup', this.onKeyupBound);
        Stage.instance.element.addEventListener('click', this.onClickBound);
        Stage.instance.element.addEventListener('mousemove', this.onMousemoveBound);
        Stage.instance.element.addEventListener('mousedown', this.onMousedownBound);
        Stage.instance.element.addEventListener('mouseup', this.onMouseupBound);

        window.addEventListener('gamepadconnected', this.onGamepadConnectedBound);
        window.addEventListener('gamepaddisconnected', this.onGamepadDisconnectedBound);
    }

    public destroy(): void
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

    private onGamepadConnected(): void
    {
        //
    }

    private onGamepadDisconnected(): void
    {
        //
    }

    private onKeydown(e: KeyboardEvent): void
    {
        const index: number = this.keys.indexOf(e.keyCode);
        if (index < 0) this.keys.push(e.keyCode);
    }

    private onKeyup(e: KeyboardEvent): void
    {
        const index: number = this.keys.indexOf(e.keyCode);
        if (index >= 0) this.keys.splice(index, 1);
    }

    private onClick(e: MouseEvent): void
    {
        GameObject.sortByZ();

        for (let gameObject of GameObject.instances) {
            if (gameObject.isUnder(new Vector(this.mouse.x, this.mouse.y))) {
                return gameObject.onClick(e);
            }
        }
    }

    private onMousemove(e: MouseEvent): void
    {
        let scale = Stage.instance.width / Stage.instance.element.offsetWidth;

        this.mouse.x = e.offsetX * scale;
        this.mouse.y = e.offsetY * scale;
    }

    private onMousedown(e: MouseEvent): void
    {
        this.mouse.buttons[0].down = true;
    }

    private onMouseup(e: MouseEvent): void
    {
        this.mouse.buttons[0].down = false;
    }

    public keyIsDown(keyCode: number)
    {
        return this.keys.indexOf(keyCode) >= 0;
    }

    public buttonIsDown(button: string): boolean
    {
        let gamepads = navigator.getGamepads();
        if (!gamepads || !gamepads.length || !gamepads[0]) return false;

        return gamepads[0].buttons[button].pressed;
    }

    public vibrate(options: object = { startDelay: 0, duration: 500, weakMagnitude: 0.5, strongMagnitude: 0.5 }): void
    {
        const gamepads = navigator.getGamepads();
        if (!gamepads || !gamepads.length || !gamepads[0]) return;

        // @ts-ignore: GamepadActuator is not recognized by the typescript interpreter, but works in Chrome, which is the only intended build platform.
        navigator.getGamepads()[0].vibrationActuator.playEffect('dual-rumble', options);
    }

    public get axes(): readonly number[]
    {
        let gamepads = navigator.getGamepads();
        if (!gamepads || !gamepads.length || !gamepads[0]) return [0, 0, 0, 0];

        return gamepads[0].axes;
    }

    public get buttons(): readonly GamepadButton[]
    {
        let gamepads = navigator.getGamepads();
        if (!gamepads || !gamepads.length || !gamepads[0]) return [];

        return gamepads[0].buttons;
    }

    public get mouse(): Mouse
    {
        return this._mouse;
    }

    public static get instance(): Controller
    {
        return Controller._instance;
    }
}
