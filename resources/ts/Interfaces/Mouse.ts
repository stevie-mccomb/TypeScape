interface MouseButton
{
    index: number,
    name: string,
    down: boolean
}

interface Mouse
{
    x: number,
    y: number,
    buttons: Array<MouseButton>
}

export { MouseButton, Mouse };
export default Mouse;
