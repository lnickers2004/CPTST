
interface Channel extends String {

}

////declare var Channel: {
////    //new (value?: any): String;
////    (value?: any): string;
////    prototype: Channel;
////    //fromCharCode(...codes: number[]): string;
////}

////declare var Channel: Channel;

interface Message extends String {

}

////declare var Message: Message;

interface Data extends Object {

}

////declare var Data: Data;

interface Radius extends Number {

}

////declare var Radius: Radius;

//interface BroadcastObject {
//    channel: Channel;
//    message: Message;
//    data?: Data;
//    radius?: Radius
//}

interface Entity extends Object {

}

interface Entities {
    [index: number]: Entity;
}

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                             *** Messaging ***                              //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

/** 
  * Broadcast a message on a particular channel.
  * -------------------------------------------
  * - Broadcast messages are not allowed on the chat channel, instead use say()
  * - This is considered a Broadcast, and multiple Broadcasts are limited by
  * the Broadcast queue - see Script Limits
  *
  * @param obj Argument Object describing the broadcast. 
  */
declare function broadcastMessage(
    obj: {
        /** The channel for the message. */
        channel: Channel;
        /** The message for the message. */
        message: Message;
        /** Arbitrary data for the message. No data sent if not specified */
        data?: Data;
        /** Broadcast radius. 25 if not specified */
        radius?: Radius;
    }
    //obj: BroadcastObject
): void;


/** 
  * Listens to a channel.
  * -------------------------------------------
  * - To do anything in response to messages on a channel, a handler must be 
  * created with handlerCreate.
  * - Creating a handler automatically listens to the channel, so this function
  * is only needed if channelUnlisten was called.
  * - You must have permission over the target entity.
  * 
  * @param obj Argument Object describing the channel. 
  */
declare function channelListen(
    obj: {
        /** The channel to start listening to. */
        channel: Channel;
        /** The entity that should start listening. */
        ent?: Entity;
    }
): void;


/** 
  * Stops listening to a channel.
  * -------------------------------------------
  * - You must have permission over the target entity.
  * 
  * @param obj Argument Object describing the channel. 
  */
declare function channelUnlisten(
    obj: {
        /** The channel to stop listening to. */
        channel: Channel;
        /** The entity that should stop listening. */
        ent?: Entity;
    }
): void;


/** 
  * Send a message directly to an ent.
  * -------------------------------------------
  * - An reference to an entity is acquired from functions such as getEnts
  * - Either ent or ents must be specified, but not both
  * - Direct messages are not allowed on the chat channel, to send a tell to a
  * player use tell()
  * - 'data' field can be accessed through context.message.data in receiving
  * handler function
  * 
  * @param obj Argument Object describing the message. 
  */
declare function directMessage(
    obj: {
        /** The recipient of the message. */
        ent?: Entity;
        /** The recipients of the message. */
        ents?: Entities;
        /** The channel for the message. */
        channel: Channel;
        /** The message for the message. */
        message: Message;
        /** Arbitrary data for the message. */
        data?: Data;
    }
): void;


/** 
  * Broadcast a message on the script error (scriptdebug) channel..
  * -------------------------------------------
  * - Anything passed to this function is automatically stringified, so
  * non-string values for the message are legal.
  * - This is considered a Broadcast, and multiple Broadcasts are limited by
  * the Broadcast queue - see Script Limits.
  * 
  * @param message The text to broadcast. 
  */
declare function error(message?: any): void;


/** 
  * Say something on the local chat channel.
  * -------------------------------------------
  * - Anything passed to this function is automatically stringified, so
  * non-string values for the message are legal.
  * - Cannot be used in scripts running on players.
  * 
  * @param message Text to say. 
  */
declare function say(message?: any): void;


/** 
  * Send a chat 'tell' message directly to an entity or entities.
  * -------------------------------------------
  * - An reference to an entity is acquired from functions such as getEnts
  * - Either ent or ents must be specified, but not both
  * - Cannot be used in scripts running on players.
  * - The message argument is automatically stringified, so non-string values
  * for the message are legal
  * 
  * @param obj Argument Object describing the message.  
  */
declare function tell(
    obj: {
        /** The message for the tell. */
        message: Message;
        /** The recipient of the message. */
        ent?: Entity;
        /** The recipients of the message. */
        ents?: Entities;
    }
): void;


////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                           *** Local State ***                              //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

// The entity running your script has some local state. This state is easily
// accessed as global variables in your script, and is useful for keeping any
// temporary state your script needs.It can not be shared with any other
// entity(including other copies of the entity) and will be lost when the entity,
// zone or server are reset. There are also some functions which operate on
// local state by name, but are generally not necessary to use.

/** 
  * Decrements the value in your local state, returns the new value
  * -------------------------------------------
  * - Local state functions operate on global variables of the same name, if 
  * those global variables exist
  * - If the value is falsy it is interpreted as 0, resulting in a new value of
  * -1
  * - Intended for use on integer key values
  * 
  * @param key Key to decrement.  
  */
declare function dec(key: Key): number; // check lib.d.ts for "Key"!!!

/** 
  * Gets the value in your local state
  * -------------------------------------------
  * - Local state functions operate on global variables of the same name, if
  * those global variables exist
  * - Value === undefined for keys that do not exist.
  * 
  * @param key Key to get.  
  */
declare function get(key: Key): number;

/** 
  * Looks up a parameter by name and returns its value
  * -------------------------------------------
  * - Can be used on any parameter type (Number, string, object, etc.)
  * - When using a parameter type of Object, it must be in strict JSON format.
  * Ex: { "foo": 7 }
  * 
  * @param key Parameter to get.  
  */
declare function getParam(key: Key): Parameter; // Fix/check parameter values/types

/** 
  * Increments the value in your local state, returns the new value
  * -------------------------------------------
  * - Local state functions operate on global variables of the same name,
  * if those global variables exist
  * - If the value is falsy it is interpreted as 0, resulting in a new value of 1
  * - Intended for use on integer key values
  * 
  * @param key Key to increment.  
  */
declare function inc(key: Key): number;

/** 
  * Sets the value in your local state
  * -------------------------------------------
  * - Local state functions operate on global variables of the same name,
  * if those global variables exist
  * 
  * @param key Key to set.
  * @param value Value to assign to key.  
  */
declare function set(key: Key, value: any): void;

/** 
  * Applies the specified unary operator to the value in your local state and
  * returns the appropriate value based on the operator
  * -------------------------------------------
  * - Local state functions operate on global variables of the same name, if
  * those global variables exist
  * - Valid ops are
  *    - postfix++
  *    - postfix--
  *    - prefix++
  *    - prefix--
  * - Unlike inc() and dec(), there is no special handling for unset values,
  * standard javascript behavior will be applied
  * 
  * @param key Key to modify.
  * @param op Operator to apply.  
  */
declare function setUnary(key: Key, op: Operator): any; //any?? Operator ot string?


////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                        *** Persistent State ***                            //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

// Persistent state is permanent state your scripts can keep. Because this state
// is stored in the database, it is shared between all copies of the entity or
// entities running the same script.Further, it is shared between all scripts
// that use the same 'state key'.
//
// The 'state key' is a Param which defines a unique space for storing the state.
// State keys are either Key params or String params.Key params are secure, in
// that they are automatically uniquely identified and can only be used by
// scripts that are authorized to use the Key asset.String params are insecure,
// since any script writer could enter the same string.If you don't want other
// script writers modifying your state you should use a Key param.
//
// A critical thing to note for persistent state is that all operations are
// asynchronous. A set operation immediately followed by a get operation is not
// guaranteed to return the state as it will exist after the set operation is
// completed.
//
// There are three types of persistent state. User state is per-user (and
// per - state key), so you can store state for a particular user with respect
// to your scripts. Ent state is per - entity(and per - state key), so you can
// store state for a particular instance of an entity using your scripts. Global
// state is per - state key, so you can store state across all use of your
// scripts, regardless of the user or entity.

declare function decEntState(obj);

declare function decGlobalState(obj);

declare function decUserState(obj);

declare function getEntState(obj);

declare function getGlobalState(obj);

declare function getUserState(obj);

declare function incEntState(obj);

declare function incGlobalState(obj);

declare function incUserState(obj);

declare function setEntState(obj);

declare function setGlobalState(obj);

declare function setStateKeyDefault(state_key);

declare function setUserState(obj);


////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                               *** Utility ***                              //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

declare function clone(obj, deep);

declare function deleteProp(obj, prop);

declare function getCostBudgetUsed();

declare function getProp(obj, prop);

declare function keys(obj);

declare function parse(str);

declare function parseFloat(string);

declare function parseInt(string, radix);

declare function setProp(obj, prop, value);

declare function stringify(
    obj: Object,
    options?: {
        indent?: boolean;
        newline?: boolean;
        quote_keys?: boolean;
        include_undefined?: boolean;
        max_length?: number;
        max_depth?: number
    }
    ): string;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                           *** Array Objects ***                            //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

//  Many built- in functions on array - type objects are allowed.See http://www.w3schools.com/jsref/jsref_obj_array.asp for a reference.

//  The allowed functions are:

//  indexOf
//  lastIndexOf
//  pop
//  push
//  reverse
//  shift
//  slice
//  splice
//  unshift

declare function arrayPermute(array);

declare function arraySort(array, script);

///////////////////////////////////////////////////
//
//  String Objects
//
///////////////////////////////////////////////////

//  Many built- in functions on string - type objects are allowed.See http://www.w3schools.com/jsref/jsref_obj_string.asp for a reference.

//  The allowed functions are:

//  indexOf
//  lastIndexOf
//  replace
//  slice
//  split
//  substr
//  substring
//  toLowerCase
//  toUpperCase

declare function stringReplace(obj);

///////////////////////////////////////////////////
//
//  Number Objects
//
///////////////////////////////////////////////////

//  Many built- in functions on number - type objects are allowed.See http://www.w3schools.com/jsref/jsref_obj_number.asp for a reference.

//  The allowed functions are:

//  toExponential
//  toFixed
//  toPrecision
//  No script functions found in category Number Objects

///////////////////////////////////////////////////
//
//  Dates
//
///////////////////////////////////////////////////

declare function dateFromString(string);

declare function dateFromValues(year, month, date, hours, minutes, seconds, milliseconds);

declare function dateToDateString(date);

declare function dateToISOString(date);

declare function dateToObject(date);

declare function dateToTimeString(date);

declare function dateToUTCString(date);

declare function now();

///////////////////////////////////////////////////
//
//  Math
//
///////////////////////////////////////////////////

declare function clamp(x, min, max);

declare function degrees(radians);

declare function mod(x, y);

declare function radians(degrees);

declare function randomInt(min, max);

declare function randomRange(min, max);

///////////////////////////////////////////////////
//
//  Script Calling
//
///////////////////////////////////////////////////

declare function getForwardFromRot(vec);

declare function getRotFromForward(forward, up);

declare function randomVec(radius, volume);

declare function vecAbs(vec);

declare function vecAdd(vec1, vec2);

declare function vecAddScalar(vec, s);

declare function vecAddScaled(vec1, vec2, s);

declare function vecAngle(vec1, vec2);

declare function vecCross(vec1, vec2);

declare function vecDistance(vec1, vec2);

declare function vecDistanceSquared(vec1, vec2);

declare function vecDiv(vec1, vec2);

declare function vecDot(vec1, vec2);

declare function vecDup(vec);

declare function vecInterp(vec1, vec2, s);

declare function vecInvert(vec);

declare function vecLength(vec);

declare function vecLengthSquared(vec);

declare function vecMul(vec1, vec2);

declare function vecMulScalar(vec, s);

declare function vecNormalize(vec);

declare function vecPosRotate(pos, rot);

declare function vecPosWorldToRel(vec);

declare function vecPosWorldToRotRel(vec);

declare function vecRotInvert(rot);

declare function vecRotRotate(rot1, rot2);

declare function vecRotWorldToRel(rot);

declare function vecSlerp(vec1, vec2, s);

declare function vecSub(vec1, vec2);

///////////////////////////////////////////////////
//
//  Entities
//
///////////////////////////////////////////////////

declare function entIsPlayer(ent);

declare function getCreatorEnt();

declare function getEntFields(obj);

declare function getEnts(obj);

declare function getMessageEnt(message?: Object);

declare function getSelfEnt();

declare function reset(obj);

declare function resetNear(radius);

declare function resetSpawned();

declare function spawn(obj);

///////////////////////////////////////////////////
//
//  Users
//
///////////////////////////////////////////////////

declare function getMessageUser(message);

declare function getOwnerUser();

declare function getUserFields(obj);

declare function getUserPermission(obj);

declare function userIsTemporary(user);

///////////////////////////////////////////////////
//
//  Builds
//
///////////////////////////////////////////////////

declare function getBuild();

declare function getBuildFields(obj);

declare function getBuildInstance();

///////////////////////////////////////////////////
//
//  Animation, Particles and Sound
//
///////////////////////////////////////////////////

declare function animAddSequencer(obj);

declare function animClearSequencer(obj);

declare function animClickMarker(obj);

declare function animDetach(obj);

declare function animPlay(obj);

declare function particleFlash(obj);

declare function particleStart(obj);

declare function particleStop(handle);

declare function soundFlash(obj);

declare function soundStart(obj);

declare function soundStop(handle);

///////////////////////////////////////////////////
//
//  Physics
//
///////////////////////////////////////////////////

declare function applyImpulse(obj);

declare function applyImpulseFrom(obj);

declare function getGravity();

declare function getMarkerIDs();

declare function getMarkerPos(marker_id);

declare function getMarkerPosWorld(marker_id);

declare function getMarkerRot(marker_id);

declare function getMarkerRotWorld(marker_id);

declare function getPos();

declare function getRot();

declare function getScale();

declare function getVelAngular();

declare function getVelLinear();

declare function pointToward(obj);

declare function setGravity(obj);

declare function setPos(obj);

declare function setPosRot(obj);

declare function setRot(obj);

declare function setVelAngular(obj);

declare function setVelLinear(obj);

///////////////////////////////////////////////////
//
//  UI
//
///////////////////////////////////////////////////

declare function controllerCreate(obj);

declare function controllerHTMLCreate(obj);

declare function controllerMessage(obj);

declare function dialogCreate(obj);

declare function labelAdd(obj);

declare function labelRemove(handle);

declare function setTooltip(obj);

///////////////////////////////////////////////////
//
//  Script Calling
//
///////////////////////////////////////////////////

declare function call(obj);

declare function getHandler();

declare function getHandlerData(handler?: Object);

declare function getMessage();

declare function getMessageData(message);

declare function getTimer();

declare function getTimerData(timer);

declare function handlerCreate(handler): void;

declare function handlerDestroy(name);

declare function handlerSetDisabled(name, disabled);

declare function scriptSetDisabled(name, disabled);

declare function timerCreate(obj);

declare function timerDestroy(name);

declare function timerSetPaused(name, paused);

///////////////////////////////////////////////////
//
//  Player Interaction
//
///////////////////////////////////////////////////

declare function teleport(obj);

///////////////////////////////////////////////////
//
//  Commerce
//
///////////////////////////////////////////////////

declare function marketCheckOwnership(obj);

declare function marketSellToUser(obj);

///////////////////////////////////////////////////
//
//  External Communication
//
///////////////////////////////////////////////////

declare function httpRequest(obj);

///////////////////////////////////////////////////
//
//  Customizers
//
///////////////////////////////////////////////////

declare function customizerSet(obj);

declare function customizerSetFromParam(customizer_name, param_name);

declare function customizerSetFromParamPersist(customizer_name, param_name);

declare function customizerSetValue(customizer_name, value);

declare function customizerSetValuePersist(customizer_name, value);
