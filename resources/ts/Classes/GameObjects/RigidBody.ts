import GameObject from '@/Classes/GameObjects/GameObject';

export default class RigidBody extends GameObject
{
    protected static _instances: RigidBody[] = [];

    protected fixed: boolean = false;

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0)
    {
        super(x, y, width, height);

        RigidBody._instances.push(this);
    }

    public update(): void
    {
        super.update();

        for (const otherBody of RigidBody.instances) {
            if (otherBody === this) continue;

            const bodyToMove = this.fixed ? otherBody : this;
            const bodyToReference = this.fixed ? this : otherBody;
            const colliding = bodyToMove.colliding(bodyToReference);
            if (!!colliding && this.fixed && otherBody.fixed) continue;

            switch (colliding) {
                case 'top':
                    bodyToMove.top = bodyToReference.bottom;
                    break;

                case 'left':
                    bodyToMove.left = bodyToReference.right;
                    break;

                case 'bottom':
                    bodyToMove.bottom = bodyToReference.top;
                    break;

                case 'right':
                    bodyToMove.right = bodyToReference.left;
                    break;

                default:
                    break;
            }
        }
    }

    public destroy(): void
    {
        super.destroy();

        const index = RigidBody.instances.indexOf(this);
        if (index >= 0) RigidBody._instances.splice(index, 1);
    }

    public static get instances(): readonly RigidBody[]
    {
        return RigidBody._instances;
    }
}
