import State from 'States/State';
import GameObject from 'GameObjects/GameObject';
import StateMachine from 'Machines/StateMachine';

class PlayState extends State
{
    static instance: PlayState;

    public machine: StateMachine = new StateMachine();

    constructor()
    {
        super();

        PlayState.instance = this;
    }

    enter(data: object = {})
    {
        //
    }

    update()
    {
        for (let go of GameObject.instances) go.update();
    }

    render()
    {
        for (let go of GameObject.instances) go.render();
    }

    exit()
    {
        //
    }
}

export default PlayState;
