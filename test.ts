
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

decEntState({
    state_key: 'my_key',
    key: 'localhandicap'
});

decGlobalState({
    state_key: 'my_key',
    key: 'functionslefttodocument'
});

decUserState({
    user: getMessageUser(),
    state_key: 'my_key',
    key: 'handicap'
});

getEntState({
    state_key: 'my_key',
    keys: ['lastplayer'],
    callback: 'lastPlayerReturned'
});

getGlobalState({
    state_key: 'my_key',
    keys: ['topplayer', 'topscore'],
    callback: 'topScorerReturned'
});

getUserState({
    user: getMessageUser(),
    state_key: 'my_key',
    keys: ['bestscore', 'lastscore'],
    callback: 'scoresReturned'
});

incEntState({
    state_key: 'my_key',
    key: 'localplaycount'
});

incGlobalState({
    state_key: 'my_key',
    key: 'totalplaycount'
});

incUserState({
    user: getMessageUser(),
    state_key: 'my_key',
    key: 'playcount'
});

setEntState({
    state_key: 'my_key',
    data: { lastplayer: 'bob' }
});

setGlobalState({
    state_key: 'my_key',
    data: { topplayer: 'bob', topscore: 100 }
});

setStateKeyDefault('my_key');

setUserState({
    user: getMessageUser(),
    state_key: 'my_key',
    data: { bestscore: 100, lastscore: 10 }
});



























