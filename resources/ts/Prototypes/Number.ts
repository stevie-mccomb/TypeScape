declare global {
    interface Number
    {
        clamp(min: number, max: number): number;
    }
}

Number.prototype.clamp = function(min: number, max: number)
{
    if (this < min) return min;
    if (this > max) return max;
    return this;
};

export default Number;
