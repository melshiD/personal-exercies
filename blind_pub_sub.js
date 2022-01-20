const PubSub = (function(){
    let eventOriginAddress,
        subscribers,
        __event;

    function _addSubscriber(callback){
        let id = new Date().getTime();
        subscribers.push({id, callback});
        return id;
    }

    function _unsubscribe(id){
        subscribers = subscribers.filter( (subscriber) => {subscriber.id !== id} );
    }

    function _unsubscribeAll(){
        subscribers = [];
    }

    function _pushContentToSubscriber(){
        let newContent = new Date();
        let title = eventOriginAddress;
        subscribers.forEach(subscriber => subscriber.callback(title));
        __event = setTimeout(_pushContentToSubscriber.bind(this), 2000);
    }

    function _handleTicker(){
        __event = setTimeout(_pushContentToSubscriber.bind(this), 2000);
    }

    return class InternalPubSub{
        constructor(eventOrigin){
            eventOriginAddress = eventOrigin;
            subscribers = [];
            __event = null;
        }

        subscribe(callback){
            _addSubscriber(callback);
        }

        unsubscribe(id){
            _unsubscribe(id);
        }

        unsubscribeAll(){
            _unsubscribeAll();
        }
        /////Functions to handle faux events//////
        plugSource(){
            _handleTicker();
        }

        unplugSource(){
            window.clearTimeout();
        }
    }
})();
    let pubOne = new PubSub('First Publication to be Syndicated');

    pubOne.plugSource();

    let subber1 = pubOne.subscribe( (title) => {
        console.log('subber1 received subscription of ' + title);
    });

