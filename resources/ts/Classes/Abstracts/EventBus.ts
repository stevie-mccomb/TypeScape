interface Listener
{
    event: String,
    callback: Function
}

class EventBus
{
    static listeners: Listener[] = [];

    static on(event: string, callback: Function = null)
    {
        EventBus.listeners.push({ event, callback });
    }

    static off(event: string, callback: Function = null)
    {
        for (let i = EventBus.listeners.length - 1; i >= 0; --i) {
            if (event === EventBus.listeners[i].event) {
                if (callback) {
                    if (callback === EventBus.listeners[i].callback) {
                        EventBus.listeners.splice(i, 1);
                    }
                } else {
                    EventBus.listeners.splice(i, 1);
                }
            }
        }
    }

    static dispatch(event, data: object = {})
    {
        for (let listener of EventBus.listeners) {
            if (listener.event === event) {
                listener.callback(data);
            }
        }
    }
}

export default EventBus;
