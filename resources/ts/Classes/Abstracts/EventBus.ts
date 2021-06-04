interface Listener
{
    event: string;
    callback: EventListener;
}

export default class EventBus
{
    private static listeners: Listener[] = [];

    public static on(event: string, callback: EventListener = null): void
    {
        EventBus.listeners.push({ event, callback });
    }

    public static off(event: string, callback: EventListener = null): void
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

    public static dispatch(event: string, data: object = {}): void
    {
        for (let listener of EventBus.listeners) {
            if (listener.event === event) {
                listener.callback(data as Event);
            }
        }
    }
}
