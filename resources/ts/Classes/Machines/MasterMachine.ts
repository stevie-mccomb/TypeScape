import PlayState from 'States/PlayState';
import StateMachine from 'Machines/StateMachine';

class MasterMachine extends StateMachine
{
    public static instance: MasterMachine;

    constructor()
    {
        super();

        if (MasterMachine.instance) MasterMachine.instance.destroy();
        MasterMachine.instance = this;

        this.register('play', new PlayState);
        this.change('play');
    }

    destroy()
    {
        super.destroy();

        MasterMachine.instance = undefined;
    }
}

export default MasterMachine;
