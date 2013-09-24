
///<reference path="CloudParty.d.ts" />

// Short Usage Example(s)

broadcastMessage({
    channel: 'my_channel',
    message: 'my_message',
    data: 'foo',
    radius: 10
});

channelListen({
    channel: 'my_channel'
});

channelUnlisten({
    channel: 'my_channel'
});

var myEntity: Entity;
directMessage({
    ent: myEntity,
    channel: 'my_channel',
    message: 'my_message',
    data: 'foo'
});

error('There was an error!');
error({ message: 'Bad Array', array: [1, 2, 3] });

say('Hello, Cloud Party!');
say([1, 2, 3]);
say(false);

tell({ ent: myEntity, message: 'my_message' });

var i = dec('index');

var i = get('index');

var val = getParam('my_parameter');

var i = inc('index');

set('index', 100);