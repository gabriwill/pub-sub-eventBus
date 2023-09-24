interface EventList {
  [id: string]: Function[];
}

class EventBus {
  private listeners: EventList = {}
  constructor() { }

  subscribe(id: string, listener: Function) {
    if (this._IdAlreadyCreated(id)) {
      return this.listeners[id].push(listener)
    } else {
      this.listeners[id] = [];
      return this.listeners[id].push(listener)
    }
  }

  unsubscribe(id: string, listener_index: number) {
    if (this._IdAlreadyCreated(id)) {
      this.listeners[id] = this.listeners[id].filter((_, index) => ((listener_index - 1) !== index));
    }
  }

  publish(id: string) {
    if (this._IdAlreadyCreated(id)) {
      console.log('listeners: ', this.listeners[id].length);

      this.listeners[id].forEach((listener, index) => {
        try {
          listener?.();
        } catch (error) {
          console.log('Error to run listener at index: ', index);
        }
      })
    }
  }

  _IdAlreadyCreated(id: string) {
    const result = Object.keys(this.listeners).find((item) => (item === id));
    return Boolean(result);
  }
}

export default EventBus;