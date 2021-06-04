export default class Time
{
    public static delta: number = 0;
    public static lastUpdated: number = 0;

    public static get deltaSeconds(): number
    {
        return Time.delta / 1000;
    }
}
