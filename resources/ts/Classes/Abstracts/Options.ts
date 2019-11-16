const loaded: object = JSON.parse(localStorage.getItem('options')) || {};

class Options
{
    static default: object = {
        deadzone: {
            x: 0.5,
            y: 0.5
        }
    };

    static get(obj, prop): any
    {
        if (obj[prop]) return obj;
        if (Options.default[prop]) return Options.default[prop];
        return null;
    }

    static set(obj, prop, value): boolean
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
