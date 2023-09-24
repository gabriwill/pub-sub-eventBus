import EventBus from "../src/pubSub";

describe('subscrice and execution of functions', () => {
  it('should add a listener to run when publish message \'MESSAGE_ID\'', () => {
    const eventBus = new EventBus();
    let count = 0;
    const ID = 'MESSASE_ID';
    const listener = eventBus.subscribe(ID, () => {
      count = 12;
    });

    eventBus.publish(ID);

    expect(count).toBe(12);
  });

  it('should add two listeners to run when publish message \'MESSAGE_ID\'', () => {
    const eventBus = new EventBus();
    let count = 0;
    const ID = 'MESSASE_ID';
    const listener_1 = eventBus.subscribe(ID, () => {
      count++;
    });
    const listener_2 = eventBus.subscribe(ID, () => {
      count += 2;
    });

    eventBus.publish(ID);

    expect(count).toBe(3);
  });
});

describe('Unsubscription of functions', () => {
  it('listener shouldn\'t be executed after had be unsubscribed', () => {
    const eventBus = new EventBus();
    let count = 0;
    const ID = 'MESSASE_ID';
    const listener_1 = eventBus.subscribe(ID, () => {
      count++;
    });
    const listener_2 = eventBus.subscribe(ID, () => {
      count += 2;
    });

    eventBus.unsubscribe(ID, listener_2);

    eventBus.publish(ID);

    expect(count).toBe(1);
  })
})