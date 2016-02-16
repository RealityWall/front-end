export default function (name, object) {
    let event = document.createEvent('Event');

    // Define that the event name is 'build'.
    event.initEvent(name, true, true);
    event.status = object.status;
    event.err = object.err;
    event.res = object.res;

    return event;
}
