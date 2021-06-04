export default abstract class State
{
    private static _instances: State[] = [];

    constructor()
    {
        State._instances.push(this);
    }

    public enter(data: object = {}): void
    {
        //
    }

    public update(): void
    {
        //
    }

    public render(): void
    {
        //
    }

    public exit(): void
    {
        //
    }

    public destroy(): void
    {
        const index = State._instances.indexOf(this);
        if (index >= 0) State._instances.splice(index, 1);
    }

    public static get instances(): readonly State[]
    {
        return State._instances;
    }
}
