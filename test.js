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

var myEntity;
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

clone({ foo: 'bar', num: 7 });

var myObject;
deleteProp(myObject, 'foo');

var cost = getCostBudgetUsed();

getProp(myObject, 'foo');

keys({ foo: 'bar', num: 7 });

parse('{"foo":"bar","num":7}');

parseFloat('123.45');

parseInt('123', 10);

setProp(myObject, 'foo', 'bar');

stringify({ foo: 'bar', num: 7 });

arrayPermute([0, 1, 2, 3]);

arraySort([0, 1, -1, 2]);

var hatbar = stringReplace({ string: 'foobar', find: 'foo', replace: 'hat' });

var time = dateFromString('2013-05-09T20:20:34.840Z');

var today = dateFromValues(2013, 4, 9);

var now_date = dateToDateString(now());

var now_iso = dateToISOString(now());

var now_obj = dateToObject(now());

var now_time = dateToTimeString(now());

var now_utc = dateToUTCString(now());

var start_time = now();

var x = 3.14;
clamp(x, 0, 1);

degrees(1.57);

mod(5, 2);

radians(180);

randomInt(1, 6);

randomRange(-1.5, 1.5);

getForwardFromRot([0, 0, 180]);

var newVec = vecDup(v);

vecPosRotate(v, [0, 0, 90]);

vecRotRotate(r, [0, 0, 90]);

var fromPlayer = entIsPlayer(getCreatorEnt());

var ent = getCreatorEnt();

getEntFields({ ent: getMessageEnt(), callback: 'clickerInfo', fields: ['pos', 'rot'] });

getEnts({ radius: 10, callback: 'foundPlayers', channel: 'player', fields: ['pos', 'rot'] });

var ent = getMessageEnt();

var ent = getSelfEnt();

reset();
reset({ ent: entity });

resetNear(5);

resetSpawned();

spawn({ prefab: 'parameter name', pos: [0, 0, 0], rot: [0, 0, 0], scale: [1, 1, 1], linear: [0, 0, 0], angular: [0, 0, 0], gravity: [0, 0, -9.8], created_data: {}, callback: 'function name', callback_data: {} });

var user = getMessageUser();

var user = getOwnerUser();

getUserFields({ user: getMessageUser(), callback: 'clickerUserName', fields: ['display_name'] });

getUserPermission({ user: getMessageUser() });

userIsTemporary(getMessageUser());

var build = getBuild();

getBuildFields({
    build: getBuild(),
    callback: 'buildInfo',
    fields: ['display_name', 'likes']
});

var instance = getBuildInstance();

var published = getBuildPublished();

animAddSequencer({ sequencer: 'my_sequencer' });

animClearSequencer({ sequencer: 'my_sequencer' });

animClickMarker({ ent: getMessageEnt() });

animPlay({ keyword: 'run_forward', interrupt: false });

particleFlash({ particle: 'particle_param' });

particleStart({ particle: 'particle_param', handle: 'my_particle' });

particleStop('my_particle');

soundStart({ sound: 'sound_param', handle: 'my_sound' });

soundStop('my_sound');

applyImpulse({ impulse: [0, 0, 100] });

var myVec1 = { x: 0, y: 0, z: 100 };
applyImpulse({ impulse: myVec1 });

var myVec2;
myVec2.x = 0;
myVec2.y = 0;
myVec2.z = 100;
applyImpulse({ impulse: myVec2 });

var gravity = getGravity();

var pos = getMarkerPos('my_marker');

var pos = getMarkerPosWorld('my_marker');

var pos = getMarkerRot('my_marker');

var pos = getMarkerRotWorld('my_marker');

var pos = getPos();

var rot = getRot();

var angular = getVelAngular();

pointToward({ pos: [10, -10, 0] });

setGravity({ gravity: [0, 0, -5] });

setPos({ pos: [-10.4, -9.6, 0.2] });

setPosRot({ pos: [-10.4, -9.6, 0.2], rot: [0, 0, 180] });
