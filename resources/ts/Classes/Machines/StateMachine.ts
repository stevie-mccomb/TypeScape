import State from 'States/State';

export default class StateMachine
{
    private static _instances: StateMachine[] = [];

    private _state: string = '';
    private states: Object = {};

    constructor()
    {
        StateMachine._instances.push(this);
    }

    public register(name: string, state: State): void
    {
        if (!!this.states[name]) throw new Error(`A state with name "${name}" has already been registered to this state machine.`);
        this.states[name] = state;
    }

    public change(name: string, data: object = {}): void
    {
        if (this.state) this.state.exit();

        this._state = name;

        this.state.enter(data);
    }

    public update(): void
    {
        if (this.state) this.state.update();
    }

    public render(): void
    {
        if (this.state) this.state.render();
    }

    public destroy(): void
    {
        let index = StateMachine._instances.indexOf(this);
        if (index >= 0) StateMachine._instances.splice(index, 1);
    }

    public get state(): State
    {
        return this.states[this._state]
    }

    public get stateName(): string
    {
        return this._state;
    }

    public static get instances(): StateMachine[]
    {
        return StateMachine._instances;
    }
}
