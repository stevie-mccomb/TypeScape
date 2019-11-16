abstract class State
{
    static instances: State[] = [];

    constructor()
    {
        State.instances.push(this);
    }

    enter(data: object = {})
    {
        //
    }

    update()
    {
        //
    }

    render()
    {
        //
    }

    exit()
    {
        //
    }

    destroy()
    {
        let index = State.instances.indexOf(this);
        if (index >= 0) State.instances.splice(index, 1);
    }
}

export default State;
