const loaded: object = JSON.parse(localStorage.getItem('options')) || {};

class Options
{
    private static defaults: object = {
        deadzone: {
            x: 0.5,
            y: 0.5
        }
    };

    public static get(obj, prop): any
    {
        if (obj[prop]) return obj;
        if (Options.defaults[prop]) return Options.defaults[prop];
        return null;
    }

    public static set(obj, prop, value): boolean
    {
        try {
            obj.prop = value;

            localStorage.setItem('options', JSON.stringify(obj));

            return true;
        } catch (e) {
            return false;
        }
    }
}

export default new Proxy(loaded, Options);
