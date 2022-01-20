const PubSub = (function(){
    // private variables and data
    let eventSourceAddress;
    let subscribers;
    let __tick;

    // function __unplugSource(){
    //     _setTickNull();
    // }

    // _setTickNull(){
    //     __tick = null;
    // }

    function __tickHandler(){
        _pushPayloadToSubscribers(new Date());
        __tick = setTimeout(__tickHandler.bind(this), 4000);
    }

    function _pushPayloadToSubscribers(payload){
        subscribers.map(subscriber => {
            subscriber.callback(payload);
            console.log(subscriber.id + " " + eventSourceAddress);
        });
    }

    function _addSubscriber(callback){
        let id = new Date().getTime();
        subscribers.push({id, callback});
        return id;
    }

    function _removeSubscriber(id){
        subscribers = subscribers.filter(subscriber => subscriber.id !== id);
    }

    function _removeAllSubscribers(){
        subscribers = [];
    }

    return class _PubSubInternal{
        // public methods and data
        constructor(address){
            eventSourceAddress = address;
            subscribers = [];
            __tick = null;
        }

        getTick(){
            return __tick;
        }

        plugSource(){
            console.log('Event feed attached!');
            setTimeout(__tickHandler.bind(this), 4000);
        }

        unplugSource(){
            window.clearTimeout(__tick);
            console.log('Event feed unplugged!');
        }

        subscribe(callback){
            return _addSubscriber(callback);
        }

        unsubscribe(id){
            return _removeSubscriber(id);
        }

        unsubscribeAll(){
            return _removeAllSubscribers();
        }
    }
})();

let pubSub = new PubSub('someEventSourceAddress');

let subscriber1 = pubSub.subscribe( (data) => {
    console.log('consoling from subscriber 1');
    console.log(data);
});

pubSub.plugSource();

// let interval = setTimeout(timeoutFunction, 1000);
// function timeoutFunction(){
//     console.log('hello');
//     console.log(interval);
//     interval = setTimeout(timeoutFunction, 1000);
// }