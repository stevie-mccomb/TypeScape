import GameObject from 'GameObjects/GameObject';

class RigidBody extends GameObject
{
    static instances: RigidBody[] = [];

    protected fixed: boolean = false;

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0)
    {
        super(x, y, width, height);

        RigidBody.instances.push(this);
    }

    update()
    {
        super.update();

        for (let otherBody of RigidBody.instances) {
            if (otherBody === this) continue;

            let bodyToMove = this.fixed ? otherBody : this;
            let bodyToReference = this.fixed ? this : otherBody;
            let colliding = bodyToMove.colliding(bodyToReference);
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

    destroy()
    {
        super.destroy();

        let index = RigidBody.instances.indexOf(this);
        if (index >= 0) RigidBody.instances.splice(index, 1);
    }
}

export default RigidBody;
