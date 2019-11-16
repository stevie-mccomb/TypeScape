const loaded: object = JSON.parse(localStorage.getItem('input-map')) || {};

class InputMap
{
    static default: object = {
        'action': 32,
        'move_up': 87,
        'move_left': 65,
        'move_down': 83,
        'move_right': 68,
    };

    static get(obj: object, prop: string): number
    {
        if (!!obj[prop]) return parseInt(obj[prop]);
        if (!!InputMap.default[prop]) return parseInt(InputMap.default[prop]);
        return 0;
    }

    static set(obj: object, prop: string, value: number): boolean
    {
        try {
            obj[prop] = value;

            localStorage.setItem('input-map', JSON.stringify(obj));

            return true;
        } catch (e) {
            return false;
        }
    }
}

export default new Proxy(loaded, InputMap);
