import PlayState from '@/Classes/States/PlayState';
import StateMachine from '@/Classes/Machines/StateMachine';

export default class MasterMachine extends StateMachine
{
    private static _instance: MasterMachine;

    constructor()
    {
        super();

        if (MasterMachine._instance) MasterMachine._instance.destroy();
        MasterMachine._instance = this;

        this.register('play', new PlayState);
        this.change('play');
    }

    public destroy(): void
    {
        super.destroy();

        MasterMachine._instance = undefined;
    }

    public static get instance(): MasterMachine
    {
        return MasterMachine._instance;
    }
}
