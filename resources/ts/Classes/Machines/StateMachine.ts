import State from 'States/State';

class StateMachine
{
    static instances: StateMachine[] = [];

    private _state: string = '';
    private states: Object = {};

    constructor()
    {
        StateMachine.instances.push(this);
    }

    register(name, state)
    {
        if (this.states[name]) throw new Error(`A state with name "${name}" has already been registered to this state machine.`);

        this.states[name] = state;
    }

    change(name, data: object = {})
    {
        if (this.state) this.state.exit();

        this._state = name;

        this.state.enter(data);
    }

    update()
    {
        if (this.state) this.state.update();
    }

    render()
    {
        if (this.state) this.state.render();
    }

    destroy()
    {
        let index = StateMachine.instances.indexOf(this);
        if (index >= 0) StateMachine.instances.splice(index, 1);
    }

    get state(): State
    {
        return this.states[this._state]
    }

    get stateName(): string
    {
        return this._state;
    }
}

export default StateMachine;
