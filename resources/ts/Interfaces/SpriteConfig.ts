interface Frame
{
    x: number;
    y: number;
    width?: number;
    height?: number;
}

interface Animation
{
    frames: Array<Frame>;
    frame_rate?: number;
    width?: number;
    height?: number;
    loop?: boolean;
    pattern?: boolean;
}

interface Config
{
    src: string;
    animations: {
        [key: string]: Animation;
    };
    frame_rate?: number;
    width?: number;
    height?: number;
    default_animation?: string;
}

export { Animation, Config, Frame };
export default Config;
