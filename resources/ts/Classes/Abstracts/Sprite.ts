import GameObject from 'GameObjects/GameObject';
import { Animation, Config, Frame } from 'Interfaces/SpriteConfig';
import Stage from 'Stage';

class Sprite
{
    private owner: GameObject;
    private config: Config;
    private frameIndex: number = 0;
    private frameTicks: number = 0;
    public _animationName: string = '';
    private _animation: Animation;
    private image: HTMLImageElement = new Image();

    constructor(owner: GameObject, config: Config)
    {
        this.owner = owner;
        this.config = config;
        this.animationName = this.config.default_animation || Object.keys(this.config.animations)[0];

        this.image.src = this.config.src;
    }

    update()
    {
        ++this.frameTicks;

        if (this.frameTicks >= this.frameRate) {
            this.frameTicks = 0;
            this.frameIndex = this.animation.frames[this.frameIndex + 1] ? this.frameIndex + 1 : 0;
        }
    }

    render()
    {
        Stage.instance.context.drawImage(
            this.image,
            this.frame.x,
            this.frame.y,
            this.width,
            this.height,
            this.owner.x,
            this.owner.y,
            this.width,
            this.height
        );
    }

    get width(): number
    {
        if (this.frame && this.frame.width) return this.frame.width;
        if (this.animation && this.animation.width) return this.animation.width;
        if (this.config && this.config.width) return this.config.width;
        if (this.owner && this.owner.width) return this.owner.width;
        return 0;
    }

    get height(): number
    {
        if (this.frame && this.frame.height) return this.frame.height;
        if (this.animation && this.animation.height) return this.animation.height;
        if (this.config && this.config.height) return this.config.height;
        if (this.owner && this.owner.height) return this.owner.height;
        return 0;
    }

    get animation(): Animation
    {
        let animation = this.config.animations[this._animationName];

        if (!animation) return null;

        return animation;
    }

    set animation(animation: Animation)
    {
        this._animation = animation;
    }

    get animationName()
    {
        return this._animationName;
    }

    set animationName(name: string)
    {
        if (this.animationName !== name) {
            this.frameIndex = 0;
            if (!this.config.animations[name]) throw new Error(`Sprite has no animation named "${name}".`);
            this._animationName = name;
        }
    }

    get frame(): Frame
    {
        if (!this.animation) return null;
        let frame = this.animation.frames[this.frameIndex];
        if (!frame) throw new Error(`Sprite attempted to render out-of-bounds frame. Animation named "${this.animationName}" has no frame at index ${this.frameIndex}.`);

        return frame;
    }

    get frameRate(): number
    {
        if (this.animation && this.animation.frame_rate) return this.animation.frame_rate;
        if (this.config && this.config.frame_rate) return this.config.frame_rate;
    }
}

export default Sprite;
