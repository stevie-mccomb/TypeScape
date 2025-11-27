import GameObject from '@/Classes/GameObjects/GameObject';
import State from '@/Classes/States/State';
import StateMachine from '@/Classes/Machines/StateMachine';

export default class PlayState extends State
{
    private static _instance: PlayState;

    public machine: StateMachine = new StateMachine();

    constructor()
    {
        super();

        PlayState._instance = this;
    }

    public enter(data: object = {}): void
    {
        //
    }

    public update(): void
    {
        for (let go of GameObject.instances) go.update();
    }

    public render(): void
    {
        for (let go of GameObject.instances) go.render();
    }

    public exit(): void
    {
        //
    }

    public static get instance(): PlayState
    {
        return PlayState._instance;
    }
}
