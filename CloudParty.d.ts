
interface Context {
    handler?: Handler;
    data?: Data;
    message?: Message;
    timer?: Timer 
}

declare var context: Context;

interface Handler {
    /** Name given to handler. */
    name: HandlerName;
    /** The channel the handler listens on. */
    channel: Channel;
    /** The message the handler listens for. */
    message: Message;
    /** Name given to handler. */
    script?: string/* function name */;
    /** Array of entities that can trigger this handler. */
    ents?: Entities;
    /** Array of users that can trigger this handler. */
    users?: Users;
    /** Initial disabled state of this handler. */
    disabled?: boolean;
    /** Arbitrary object which can be retrieved with getHandlerData() in
      * the function the handler calls. */
    data?: HandlerData;
}

//declare var handler: Handler;

interface HandlerName extends String {

}

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

    data?: MessageData;
}

declare var message: Message;

interface Timer {
    /** Name given to timer. */
    name: TimerName;
    /** Function the timer will call. */
    script?: string/* function name */;
    /** How much time passes between firings of the timer. */
    period?: number;
    /** How much time passes before first firing of timer. */
    delay?: number;
    /** Random time added/subtracted from period cycle.
      * Does not apply to delay. */
    jitter?: number;
    /** How much time passes before first firing of timer. */
    paused?: boolean;
    /** Arbitrary object which can be retrieved with getTimerData() in
      * the function the timer calls. */
    data?: TimerData;
}

//declare var timer: Timer;

interface TimerName {
   (): string
}

//interface Messages {
//    [index: number]: Message;
//}

interface Data extends Object {

}

////declare var Data: Data;

interface HandlerData extends Data {

}

declare var handlerData: HandlerData;

interface MessageData extends Data {

}

declare var messageData: MessageData;

interface TimerData extends Data {

}

declare var timerData: TimerData;

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

interface State_Key extends Object {

}

interface User extends Object {

}

interface Users {
    [index: number]: User;
}

interface Key extends Object {

}

interface Keys {
    [index: number]: Key;
}

interface Callback extends Object {

}

interface Callback_Data extends Object {

}

interface Check extends Object {

}

interface Script extends Object {

}

/** 
  * An array of 3 numbers.
  * Example: [ 1, 2, 3 ]
  */
interface Vector {
    x: number;
    y: number;
    z: number;
}

/**
  * A positional vector [X, Y, Z].
  * Example: [ 0, 0, 5 ]
  */
interface VectorPOS extends Vector {

}

/** 
  * A rotational vector [yaw, pitch, roll] ([rotation around Z axis, rotation
  * around X axis, rotation around Y axis]). 
  * Example: [ 0, 180, 90 ]
  */
interface VectorROT extends Vector {

}

interface VectorSCALE extends Vector {

}

interface VectorVEL extends Vector {

}

interface Prefab extends Object {

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
declare function dec(key: Key): number; // check lib.d.ts for "Key"!!! conflicts?

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

/** 
  * Decrements the value of a key in this entities' persistent state.
  * -------------------------------------------
  * - If the key's value is undefined it is treated as 0, and thus set to -1
  * - Setting data into persistent state is an asynchronous operation
  *
  * @param obj Argument Object describing key to decrement. 
  */
declare function decEntState(
    obj: {
        /** State key to access data. */
        state_key?: State_Key;
        /** Name of key to decrement. */
        key: Key
    }
): void;

/** 
  * decrements the value of a key in the global persistent state.
  * -------------------------------------------
  * - If the key's value is undefined it is treated as 0, and thus set to -1
  * - Setting data into persistent state is an asynchronous operation
  *
  * @param obj Argument Object describing key to decrement. 
  */
declare function decGlobalState(
    obj: {
        /** State key to access data. */
        state_key?: State_Key;
        /** Name of key to decrement. */
        key: Key
    }
): void;

/** 
  * decrements the value of a key in the user's persistent state.
  * -------------------------------------------
  * - If the key's value is undefined it is treated as 0, and thus set to -1
  * - Setting data into persistent state is an asynchronous operation
  *
  * @param obj Argument Object describing key to decrement. 
  */
declare function decUserState(
    obj: {
        /** User to change. */
        user: User;
        /** State key to access data. */
        state_key?: State_Key;
        /** Name of key to decrement. */
        key: Key
    }
): void;

/** 
  * Calls a callback with the values associated with requested keys in
  * this entities' persistent state
  * -------------------------------------------
  * - The callback is always called, even if the key(s) are not present in
  * the persistant state
  *
  * @param obj Argument Object describing keys to get. 
  */
declare function getEntState(
    obj: {
        /** State key to access data. */
        state_key?: State_Key;
        /** Array of keys (strings) that you want returned in the callback's
          * context.data. */
        keys: Keys;
        /** Callback function with context.data fields set to the keys/value
          * pairs from this entities state. */
        callback: Callback;
        /** Arbitrary object which has its fields copied to the callback
          * function's context.data. */
        callback_data?: Callback_Data
    }
): void;

/** 
  * Calls a callback with the values associated with requested keys in
  * the global persistent state
  * -------------------------------------------
  * - The callback is always called, even if the key(s) are not present in
  * the persistant state
  *
  * @param obj Argument Object describing keys to get. 
  */
declare function getGlobalState(
    obj: {
        /** State key to access data. */
        state_key?: State_Key;
        /** Array of keys (strings) that you want returned in the callback's
          * context.data. */
        keys: Keys;
        /** Callback function with context.data fields set to the keys/value
          * pairs from this entities state. */
        callback: Callback;
        /** Arbitrary object which has its fields copied to the callback
          * function's context.data. */
        callback_data?: Callback_Data
    }
): void;

/** 
  * Calls a callback with the values associated with requested keys in
  * the user's persistent state
  * -------------------------------------------
  * - The object provided to the callback will automatically have the user field
  * set
  * - The callback is always called, even if the key(s) are not present in
  * the persistant state
  *
  * @param obj Argument Object describing keys to get. 
  */
declare function getUserState(
    obj: {
        /** User to get. */
        user: User;
        /** State key to access data. */
        state_key?: State_Key;
        /** Array of keys (strings) that you want returned in the callback's
          * context.data. */
        keys: Keys;
        /** Callback function with context.data fields set to the keys/value
          * pairs from this entities state. */
        callback: Callback;
        /** Arbitrary object which has its fields copied to the callback
          * function's context.data. */
        callback_data?: Callback_Data
    }
): void;

/** 
  * Increments the value of a key in this entities' persistent state
  * -------------------------------------------
  * - If the key's value is undefined it is treated as 0, and thus set to 1
  * - Setting data into persistent state is an asynchronous operation
  *
  * @param obj Argument Object describing key to increment. 
  */
declare function incEntState(
    obj: {
        /** State key to access data. */
        state_key?: State_Key;
        /** Name of key to increment. */
        key: Key;
    }
): void;

/** 
  * Increments the value of a key in the global persistent state
  * -------------------------------------------
  * - If the key's value is undefined it is treated as 0, and thus set to 1
  * - Setting data into persistent state is an asynchronous operation
  *
  * @param obj Argument Object describing key to increment. 
  */
declare function incGlobalState(
    obj: {
        /** State key to access data. */
        state_key?: State_Key;
        /** Name of key to increment. */
        key: Key;
    }
): void;

/** 
  * Increments the value of a key in the user's persistent state
  * -------------------------------------------
  * - If the key's value is undefined it is treated as 0, and thus set to 1
  * - Setting data into persistent state is an asynchronous operation
  *
  * @param obj Argument Object describing key to increment. 
  */
declare function incUserState(
    obj: {
        /** User to change. */
        user: User;
        /** State key to access data. */
        state_key?: State_Key;
        /** Name of key to increment. */
        key: Key;
    }
): void;

/** 
  * Sets key/value pairs in this entities' persistent state
  * -------------------------------------------
  * - Setting data into persistent state is an asynchronous operation
  * - If checked key/values do not match the existing state's key/values,
  * the existing state will not be changed, and the callback's context.data will
  * have the err field set and the check field will be set to an object with the
  * existing state's key/values.
  *
  * @param obj Argument Object describing keys to set. 
  */
declare function setEntState(
    obj: {
        /** State key to access data. */
        state_key?: State_Key;
        /** Object with key/value pairs to set. */
        data: Data;
        /** Object with key/value pairs to check against existing state. Any
          * mismatch results in failure.. */
        check?: Check;
        /** Callback function when the set has completed, context.data fields
          * may include err and check. */
        callback?: Callback;
        /** Optional arbitrary object whose fields are copied to the callback
          * function's context.data. */
        callback_data?: Callback_Data
    }
): void;

/** 
  * Sets key/value pairs in the global persistent state
  * -------------------------------------------
  * - Setting data into persistent state is an asynchronous operation
  * - If checked key/values do not match the existing state's key/values,
  * the existing state will not be changed, and the callback's context.data will
  * have the err field set and the check field will be set to an object with the
  * existing state's key/values.
  *
  * @param obj Argument Object describing keys to set. 
  */
declare function setGlobalState(
    obj: {
        /** State key to access data. */
        state_key?: State_Key;
        /** Object with key/value pairs to set. */
        data: Data;
        /** Object with key/value pairs to check against existing state. Any
          * mismatch results in failure. */
        check?: Check;
        /** Callback function when the set has completed, context.data fields
          * may include err and check. */
        callback?: Callback;
        /** Optional arbitrary object whose fields are copied to the callback
          * function's context.data. */
        callback_data?: Callback_Data
    }
): void;

/** 
  * Sets a default state_key for the UserState, EntState and GlobalState
  * functions
  * -------------------------------------------
  * - If this is set, the UserState, EntState and GlobalState functions will use
  * it as their state_key if one is not specified for them.
  *
  * @param state_key Default state key to use. 
  */
declare function setStateKeyDefault(state_key?: State_Key): void;

/** 
  * Sets key/value pairs in the user's persistent state
  * -------------------------------------------
  * - Setting data into persistent state is an asynchronous operation
  * - If checked key/values do not match the existing state's key/values,
  * the existing state will not be changed, and the callback's context.data will
  * have the err field set and the check field will be set to an object with the
  * existing state's key/values.
  *
  * @param obj Argument Object describing keys to set. 
  */
declare function setUserState(
    obj: {
        /** User to set. */
        user: User;
        /** State key to access data. */
        state_key?: State_Key;
        /** Object with key/value pairs to set. */
        data: Data;
        /** Object with key/value pairs to check against existing state. Any
          * mismatch results in failure. */
        check?: Check;
        /** Callback function when the set has completed, context.data fields
          * may include err and check. */
        callback?: Callback;
        /** Optional arbitrary object whose fields are copied to the callback
          * function's context.data. */
        callback_data?: Callback_Data
    }
): void;


////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                               *** Utility ***                              //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

/** 
  * Creates a new instance of the provided object or array
  * -------------------------------------------
  * - Arrays are also valid to clone
  * - Shallow clones are simply new objects or arrays with all the top-level
  * fields or elements copied, not cloned. Thus any changes you make inside sub-
  * objects (or sub-arrays) will be reflected in both the original object and
  * clone object.
  * - Deep clones make clones of all sub-objects as well, so no changes made to
  * the original object or clone object will be reflected in the other.
  * - Deep cloning can fail, make sure you check to see if you got a useful
  * result back.
  *
  * @param obj Object to clone. 
  * @param deep Optionally clone all sub-objects. 
  */
declare function clone(obj?: Object, deep?: boolean): Object;

/** 
  * Deletes the requested property from the object
  * (equivalent to delete obj[prop])
  * -------------------------------------------
  * - There is no reason to use this instead of simply deleting a property
  * directly.
  *
  * @param obj Object to delete a value from. 
  * @param prop Property name. 
  */
declare function deleteProp(obj: Object, prop: string): undefined; //???

/** 
  * A number in the range [0..1] representing the current cost this object has
  * incurred this frame running scripts, relative to its total budget.
  */
declare function getCostBudgetUsed(): number;

/** 
  * Retrieves the requested property of the object
  * (equivalent to obj[prop])
  * -------------------------------------------
  * - There is no reason to use this instead of simply accessing a property
  * directly.
  *
  * @param obj Object to retrieve a value from. 
  * @param prop Property name. 
  */
declare function getProp(obj: Object, prop: string): any; //???

/** 
  * Returns an objects keys as strings in an array
  * -------------------------------------------
  * - Keys are not guaranteed to be in any particular order
  *
  * @param obj Object with keys to get. 
  */
declare function keys(obj: Object): Array;

/** 
  * Converts a JSON string into an object, array, or simple data type
  * -------------------------------------------
  * - Input must be valid JSON or an error will be thrown and the function will
  * return undefined
  * - stringify() with default parameters does not generate valid JSON, since
  * JSON requires quotes on keys, so parse(stringify(obj)) will not work by
  * default as a method to clone an object.
  *
  * @param str String to parse.
  */
declare function parse(str: string): Object;

/** 
  * Parses a string to return a floating point number.
  * -------------------------------------------
  *
  * @param str String to parse.
  */
declare function parseFloat(str: string): number;

/** 
  * Parses a string to return an integer number.
  * -------------------------------------------
  *
  * @param str String to parse.
  * @param radix Radix to use in parsing.
  */
declare function parseInt(str: string, radix: number/*integer*/): number; // integer

/** 
  * Sets the requested property of the object to the value
  * (equivalent to obj[prop] = value)
  * -------------------------------------------
  * - There is no reason to use this instead of simply setting the property
  * directly.
  *
  * @param obj Object to modify.
  * @param prop String to parse.
  * @param value String to parse.
  * @returns The value passed in.
  */
declare function setProp(obj: Object, prop: string, value: Object): Object;

/** 
  * Converts any object, array, or simple data type to a JSON-style readable
  * string
  * -------------------------------------------
  * - Strings are returned verbatim, not wrapped in any sort of quotation mark.
  * - Objects are returned JSON-style, but are not guaranteed to be JSON-legal,
  * since it may not quote the keys (required for JSON), writes undefined values
  * as 'undefined' instead of 'null', safely handles circular objects and
  * truncates the output beyond a certain length.
  *
  * @param obj Object to stringify.
  * @param options Options object.
  */
declare function stringify(
    obj: Object,
    options?: {
        /** Use two-space indentation. */
        indent?: boolean;
        /** Use newlines. */
        newline?: boolean;
        /** Always quote keys. */
        quote_keys?: boolean;
        /** Always include fields set to undefined. */
        include_undefined?: boolean;
        /** Limit the output length. */
        max_length?: number; // integer
        /** Limit the object inspection depth. */
        max_depth?: number // integer
    }
): string;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                           *** Array Objects ***                            //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

//  Many built- in functions on array - type objects are allowed.
//
//  The allowed functions are:
//  - indexOf
//  - lastIndexOf
//  - pop
//  - push
//  - reverse
//  - shift
//  - slice
//  - splice
//  - unshift

/** 
  * Permutes (randomizes) the order of the elements of the array and returns it.
  * -------------------------------------------
  * - The permutation is random, so calling the function is not guaranteed to
  * change the order of the elements.
  *
  * @param array Array to permute.
  */
declare function arrayPermute(array: Array): Array;

/** 
  * Sorts the array and returns it.
  * -------------------------------------------
  * - The array you provide is modified in place, and returned to you. If there
  * is an error, the function returns undefined.
  * - The optional script function should take two arguments and return a value
  * appropriate for sorting the two arguments (usually 1, -1 or 0).
  * - The budget cost of this function depends on the size of the array being
  * sorted, and the cost of the sort function itself. It is possible that no
  * sorting will be performed if it's likely that doing so would exceed the budget.
  *
  * @param array Array to sort.
  * @param script Optionally sort function name.
  */
declare function arraySort(array: Array, script?: Script): Array;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                          *** String Objects ***                            //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

//  Many built- in functions on string - type objects are allowed.
//
//  The allowed functions are:
//  - indexOf
//  - lastIndexOf
//  - replace
//  - slice
//  - split
//  - substr
//  - substring
//  - toLowerCase
//  - toUpperCase

/** 
  * Returns a string resulting from performing a find and replace on the input
  * string.
  * -------------------------------------------
  * - You can simply call replace() on a string instead of using the long form
  * of this function (e.g. 'foobar'.replace('foo', 'hat')).
  * - The modifiers parameter follows JavaScript conventions
  *   -- The default behavior is a case-sensitive find and replace of the first
  * instance of the find string.
  *   -- A 'g' in the modifiers string makes the find and replace global (e.g.
  * will find and replace all instances of the find string, rather than just
  * the first.
  *   -- A 'i' in the modifiers string makes the find case-insensitive (e.g.
  * 'foo' will match both 'foo' and 'Foo').
  *
  * @param obj Argument Object describing the replacement to perform.
  */
declare function stringReplace(
    obj: {
        /** Original string. */
        str: string;
        /** String to find. */
        find: string;
        /** String to use as replacement. */
        replace: string;
        /** String of modifiers to apply to find and replace. */
        modifiers?: string
    }
): string;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                          *** Number Objects ***                            //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

//  Many built- in functions on number - type objects are allowed.
//
//  The allowed functions are:
//  - toExponential
//  - toFixed
//  - toPrecision

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                               *** Dates ***                                //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

// Dates on the server are always integers representing UTC milliseconds since
// Jan 1, 1970, and there are a number of functions available to get and
// manipulate date values.
//
// It is important to keep in mind that if you want to display dates to a user,
// that the user could be anywhere in the world, in any timezone, using any
// language, and as a result, properly formatting a date or time for a
// particular user is a challenging task.Modern web browsers can do this
// automatically to a certain, limited degree. Thus, to make it as painless as
// possible to display dates to the user in their native format, our client will
// automatically localize dates for you in two specific circumstances:
//   - If the client sees an ISO or UTC time string anywhere in chat (e.g. say,
// error, tell, etc), it will replace that string with the localized equivalent
//   - If the client sees a <span> tag with a data-date attribute (e.g. in a
// script - created dialog or controller), it will replace the contents of the
// span with the localized equivalent of the value of the data - date attribute
//
// There is no way to customize the formatting of the automatic localization,
// though this is something we would like to support in the future.

/** 
  * Returns the time in UTC milliseconds based on the ISO or UTC time string.
  * -------------------------------------------
  * - Returned value is UTC milliseconds
  * - Allowed string formats are ISO (e.g. '2013-05-09T20:20:34.840Z') and UTC
  * (e.g. 'Thu, 09 May 2013 20:20:34 GMT'). Anything else will generate an error
  * and return undefined.
  *
  * @param string ISO or UTC time string to parse.
  */
declare function dateFromString(string: string): number;

/** 
  * Returns the time in UTC milliseconds based on the values provided for each
  * component.
  * -------------------------------------------
  * - Returned value is UTC milliseconds
  * - Follows JavaScript convention where year and date are 1-based, while
  * month, hours, minutes, seconds and milliseconds are 0-based
  * - Any value not specified is assumed to be 0, except date, which is assumed
  * to be 1
  *
  * @param string ISO or UTC time string to parse.
  */
declare function dateFromValues(
    year?: number,/* integer */
    month?: number,/* integer */
    date?: number,/* integer */
    hours?: number,/* integer */
    minutes?: number,/* integer */
    seconds?: number,/* integer */
    milliseconds?: number/* integer */
): number;

/** 
  * Returns the date portion of the UTC time string (e.g. 'Thu, 09 May 2013')
  * of the provided date in UTC milliseconds.
  * -------------------------------------------
  * - Assumes the date argument is UTC milliseconds
  *
  * @param date Date in UTC milliseconds.
  */
declare function dateToDateString(date: number/* integer */): string;
// should date be its own type/interface???

/** 
  * Returns the ISO time string (e.g. '2013-05-09T20:20:34.840Z') of
  * the provided date in UTC milliseconds.
  * -------------------------------------------
  * - Assumes the date argument is UTC milliseconds
  *
  * @param date Date in UTC milliseconds.
  */
declare function dateToISOString(date: number/* integer */): string;
// should date be its own type/interface???

/** 
  * Returns an object with the component values of the provided date in UTC
  * milliseconds.
  * -------------------------------------------
  * - Assumes the date argument is UTC milliseconds
  * - Follows JavaScript convention where year and date are 1-based, while month,
  * hours, minutes, seconds and milliseconds are 0-based
  * - The primary fields are year, month, date, hours, minutes, seconds,
  * milliseconds, the same fields or arguments
  * expected for dateFromObject and dateFromValues.
  * - Also included is a day field, which is the 0-based day of the week
  * (0 = Sunday).
  *
  * @param date Date in UTC milliseconds.
  */
declare function dateToObject(date: number/* integer */): Object;
// should date be its own type/interface???

/** 
  * Returns the time portion of the UTC time string (e.g. '20:20:34') of
  * the provided date in UTC milliseconds.
  * -------------------------------------------
  * - Assumes the date argument is UTC milliseconds
  *
  * @param date Date in UTC milliseconds.
  */
declare function dateToTimeString(date: number/* integer */): string;
// should date be its own type/interface???

/** 
  * Returns the UTC time string (e.g. 'Thu, 09 May 2013 20:20:34 GMT') of
  * the provided date in UTC milliseconds.
  * -------------------------------------------
  * - Assumes the date argument is UTC milliseconds
  *
  * @param date Date in UTC milliseconds.
  */
declare function dateToUTCString(date: number/* integer */): string;
// should date be its own type/interface???

/** 
  * Returns the current time in UTC milliseconds.
  * -------------------------------------------
  * - The value returned will not change at any point during a script frame
  */
declare function now(): number;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                                *** Math ***                                //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

// Every JavaScript Math function is exposed -
// e.g.random() returns Math.random(), atan2(y, x) returns Math.atan2(y, x).
//
// Note that unlike the actual javascript Math functions, functions that use
// angles operate in degrees, not radians.

/** 
  * Returns the x value clamped to [min .. max].
  *
  * @param x Value to clamp.
  * @param min Minimum return value.
  * @param max Maximum return value.
  */
declare function clamp(x: number, min: number, max: number): number;

/** 
  * Returns the radian value converted to degrees.
  * -------------------------------------------
  * - All math functions (except this one) expect degrees
  *
  * @param radians Radians to convert.
  */
declare function degrees(radians: number): number;

/** 
  * Returns x mod y, but handles negative numbers per modulo arithmetic - e.g.
  * in JavaScript -1 % 10 returns -1, whereas mod(-1, 10) will return 9.
  *
  * @param x Dividend.
  * @param y Divisor.
  */
declare function mod(x: number, y: number): number;

/** 
  * Returns the degree value converted to radians.
  * -------------------------------------------
  * - All math functions expect degrees.
  *
  * @param degrees Degrees to convert.
  */
declare function radians(degrees: number): number;

/** 
  * Returns a random integer in the range [min .. max].
  *
  * @param min Minimum value to possibly return.
  * @param max Maximum value to possibly return.
  */
declare function randomInt(
    min: number /* integer */,
    max: number /* integer */
): number;

/** 
  * Returns a random number in the range [min .. max).
  *
  * @param min Minimum value to possibly return.
  * @param max Maximum value, no returned value will be greater than or equal
  * to this.
  */
declare function randomRange(min: number, max: number): number;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                              *** Vectors ***                               //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

// Vectors are just a length 3 array of numbers. Except where noted, all vector
// functions operate directly on theirleftmost argument instead of returning
// a new array.

/** 
  * Returns a normalized forward vector given a rotation vector.
  * -------------------------------------------
  * - Assumes [0, 1, 0] as neutral forward.
  *
  * @param vec Rotation vector.
  */
declare function getForwardFromRot(vec: VectorROT): VectorPOS;

/** 
  * Returns a rotation vector (in euler angles) given a forward and optional up
  * vector.
  *
  * @param forward Forward vector.
  * @param up Up vector.
  */
declare function getRotFromForward(forward: VectorPOS, up: VectorPOS): VectorROT;

/** 
  * Returns a random vector on the surface of a sphere.
  *
  * @param radius Radius of the sphere.
  * @param volume Indicates the vector should be random in the sphere volume,
  * instead of on the sphere surface.
  */
declare function randomVec(radius: number, volume: boolean): VectorPOS;

/** 
  * Applies component-wise absolute value.
  *
  * @param vec Vector to transform.
  */
declare function vecAbs(vec: Vector): void;

/** 
  * Adds vec2 to vec1.
  *
  * @param vec1 Vector to add to.
  * @param vec2 Vector to add.
  */
declare function vecAdd(vec1: Vector, vec2: Vector): void;

/** 
  * Adds s to each element of vec.
  *
  * @param vec Vector to be added to.
  * @param s Number to add.
  */
declare function vecAddScalar(vec: Vector, s: number): void;

/** 
  * Adds vec2*s to vec1.
  *
  * @param vec1 Vector to add to.
  * @param vec2 Vector to scale and then add.
  * @param s Scalar.
  */
declare function vecAddScaled(vec1: Vector, vec2: Vector, s: number): void;

/** 
  * Returns angle in degrees between vec1 and vec2.
  * -------------------------------------------
  * - If both vectors are normalized it is more efficient to call
  * acos(vecDot(vec1, vec2))
  *
  * @param vec1 One of a pair of vectors to find the angle between.
  * @param vec2 One of a pair of vectors to find the angle between.
  */
declare function vecAngle(vec1: Vector, vec2: Vector): number/* angle */;

/** 
  * Applies right-handed cross product of vec1 by vec2.
  *
  * @param vec1 Vector to be cross-producted.
  * @param vec2 Vector to cross-product with.
  */
declare function vecCross(vec1: Vector, vec2: Vector): void;

/** 
  * Returns distance between vec1 and vec2.
  * -------------------------------------------
  * - vecDistanceSquared is more efficient if only doing comparisons (don't
  * need an actual distance)
  *
  * @param vec1 A position vector.
  * @param vec2 A position vector.
  */
declare function vecDistance(vec1: VectorPOS, vec2: VectorPOS): number;
/* distance? */

/** 
  * Returns squared distance between vec1 and vec2.
  * -------------------------------------------
  * - More efficient than vecDistance
  *
  * @param vec1 A position vector.
  * @param vec2 A position vector.
  */
declare function vecDistanceSquared(vec1: VectorPOS, vec2: VectorPOS): number;
/* distance? */

/** 
  * Component-wise divides vec1 by vec2.
  *
  * @param vec1 Vector to be divided.
  * @param vec2 Vector to divided by.
  */
declare function vecDiv(vec1: Vector, vec2: Vector): void;

/** 
  * Returns dot product of vec1 and vec2.
  *
  * @param vec1 Vector to dot.
  * @param vec2 Vector to dot.
  */
declare function vecDot(vec1: Vector, vec2: Vector): number/* dot product */;

/** 
  * Returns a new copy of a vector..
  *
  * @param vec Vector to dot.
  */
declare function vecDup(vec: Vector): Vector;

/** 
  * Interpolates vec1 to vec2 by s.
  *
  * @param vec1 Initial vector.
  * @param vec2 Destination vector.
  * @param s Interpolation factor (0.0 = vec1, 1.0 = vec2).
  */
declare function vecInterp(vec1: Vector, vec2: Vector, s: number): void;

/** 
  * Applies component-wise invert (i.e. [1/x, 1/y, 1/z]).
  *
  * @param vec Vector to transform.
  */
declare function vecInvert(vec: Vector): void;

/** 
  * Returns the length of a vector.
  * -------------------------------------------
  * - vecLengthSquared is more efficient if only doing comparisons (don't need
  * an actual length)
  *
  * @param vec Vector to find the length of.
  */
declare function vecLength(vec: VectorPOS): number/* lenght */;

/** 
  * Returns the squared length of a vector
  * -------------------------------------------
  * - This is more efficient than vecLength
  *
  * @param vec Vector to find the length of.
  */
declare function vecLengthSquared(vec: VectorPOS): number/* lenght */;

/** 
  * Component-wise multiplies vec1 by vec2
  *
  * @param vec1 Vector to be multiplied.
  * @param vec2 Vector to multiply by.
  */
declare function vecMul(vec1: Vector, vec2: Vector): void;

/** 
  * Multiplies vec by s
  *
  * @param vec Vector to be multiplied.
  * @param s Number to multiply by.
  */
declare function vecMulScalar(vec: Vector, s: number): void;

/** 
  * Normalizes (scales so that length is 1.0)
  *
  * @param vec Vector to transform.
  */
declare function vecNormalize(vec: VectorPOS): void;

/** 
  * Rotates the pos vector by the rotation vector around the origin
  *
  * @param pos Positional vector to rotate.
  * @param rot Amount to rotate.
  */
declare function vecPosRotate(pos: VectorPOS, rot: VectorROT): void;

/** 
  * Transforms the position from a world pos to a relative pos (relative to the
  * position of the entity running the script)
  *
  * @param vec Position to transform.
  */
declare function vecPosWorldToRel(vec: VectorPOS): void;

/** 
  * Transforms the position from a world pos to a rotation-relative relative pos
  * (relative to the position and rotation
  * of the entity running the script)
  *
  * @param vec Position to transform.
  */
declare function vecPosWorldToRotRel(vec: VectorPOS): void;

/** 
  * Inverts a rotational vector
  *
  * @param rot Rotation to invert.
  */
declare function vecRotInvert(rot: VectorROT): void;

/** 
  * Rotates the rot vector by the second rot vector.
  *
  * @param rot1 Rotational vector to rotate.
  * @param rot2 Amount to rotate.
  */
declare function vecRotRotate(rot1: VectorROT, rot2: VectorROT): void;

/** 
  * Transforms the rotation from a world rot to a relative rot (relative to
  * the rotation of the entity running the script)
  *
  * @param rot Rotation to transform.
  */
declare function vecRotWorldToRel(rot: VectorROT): void;

/** 
  * Performs slerp (quaternion interpolation of rotation) from vec1 to vec2 by s
  *
  * @param vec1 Initial rotation vector.
  * @param vec2 Destination vector.
  * @param s Interpolation factor (0.0 = vec1, 1.0 = vec2).
  */
declare function vecSlerp(vec1: VectorROT, vec2: VectorROT, s: number): void;

/** 
  * Subtracts vec2 from vec1
  *
  * @param vec1 Vector to be subtracted from.
  * @param vec2 Vector to subtract.
  */
declare function vecSub(vec1: Vector, vec2: Vector): void;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                             *** Entities ***                               //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

/** 
  * Returns true if the entity is a player
  *
  * @param ent Entity to check.
  */
declare function entIsPlayer(ent: Entity): boolean;

/** 
  * Called from a transient entity, returns the entity that created (spawned)
  * you.
  */
declare function getCreatorEnt(): Entity;

/** 
  * Retrieves the values for the requested fields from the ent, and calls
  * the callback script with the results.
  * -------------------------------------------
  * - Valid fields to request are:
  *   - 'display_name' : the displayed name, if any - may not exist on all
  * entities.
  *   - 'player' : if the target is a player.
  *   - 'pos' : position.
  *   - 'rot' : rotation.
  *   - 'linear' : world linear velocity.
  *   - 'angular' : local angular velocity.
  *   - 'gravity' : gravity.
  *   - 'owner_user' : the user that owns the entity.
  * - If the entity for which information is requested is no longer valid,
  * "destroyed" is returned in context.data.err.
  * - Currently, requesting the linear velocity of a player may give incorrect
  * values. It may return a random value,
  * or [0,0,0] even if the player is moving.
  *
  * @param obj Entity to check.
  */
declare function getEntFields(
    obj: {
        /** The entity to inspect. */
        ent: Entity;
        /** Fields to include in callback function's context.data. */
        fields: Array;
        /** Callback function with its context.data.ent set to an ent. */
        callback: Callback;
        /** Arbitrary object which has its fields copied to the callback
          * function's context.data. */
        callback_data?: Callback_Data
    }
): void;

/** 
  * Finds entities listening to a channel within a radius and calls a callback
  * script for each of them.
  * -------------------------------------------
  * - This is considered a Broadcast, and multiple Broadcasts are limited by
  * the Broadcast queue - see Script Limits
  * - Either callback or callback_done must be specified
  * - Valid fields to request are:
  *   - 'display_name' : the displayed name, if any - may not exist on all
  * entities.
  *   - 'player' : if the target is a player.
  *   - 'pos' : position.
  *   - 'rot' : rotation.
  *   - 'linear' : world linear velocity.
  *   - 'angular' : local angular velocity.
  *   - 'owner_user' : the user that owns the entity.
  * - Some fields that work with getEntFields() may be unavailable using
  * getEnts()
  *
  * @param obj Argument Object describing what entities to search for.
  */
declare function getEnts(
    obj: {
        /** The radius to search (Spherical). */
        radius: number;
        /** Per-entity callback function with its context.data.ent set to
          * an ent. */
        callback?: Callback;
        /** Final callback function called after all per-ent callbacks, with
          * context.data.ents set to an object with all ents found. */
        callback_done?: Callback;
        /** Arbitrary object which has its fields copied to the callback
          * function's context.data. */
        callback_data?: Callback_Data
        /** Channel to search for nearby entities. */
        channel?: Channel;
        /** Fields to include in callback function's context.data. */
        fields?: Array;
    }
): void;

/** 
  * Returns the ent that sent a message received by a handler.
  *
  * @param message Message Object from getMessage().
  */
declare function getMessageEnt(message?: Message): Entity;

/** 
  * Returns your own ent.
  */
declare function getSelfEnt(): Entity;

/** 
  * Reset an entity to its spawn location (or destroy if it's transient.).
  * -------------------------------------------
  * - Spawned entities are only allowed to be reset once per second. If you call
  * reset() on an entity more often than this, there will be a delay (initially
  * 1 second, max of 32 seconds) before the entity gets respawned after it is
  * destroyed.
  *
  * @param obj Argument Object describing what to reset.
  */
declare function reset(
    obj?: {
        /** The entity to reset. */
        ent?: Entity
    }
): void;

/** 
  * Reset nearby entities to their spawn location.
  * -------------------------------------------
  * - This is considered a Broadcast, and multiple Broadcasts are limited by
  * the Broadcast queue - see Script Limits
  * - Affects all prefabs within the radius, not just those spawned by the
  * script that executes the resetNear() function,
  * - Does it affect other users scripts?
  *
  * @param radius Radius of entities to reset.
  */
declare function resetNear(radius: number): void;

/** 
  * Resets (destroys) all transient entities the script has spawned.
  */
declare function resetSpawned(): void;

/** 
  * Spawns a transient entity relative to self.
  * -------------------------------------------
  * - The spawned entity automatically inherits the world scale of the spawner,
  * however the pos parameter is *not* automatically modified by the world scale
  * of the spawner.
  * - Entities spawned from a script are transient. They will be removed if
  * the containing object is moved in build mode, if the script is reset, if
  * the island goes idle, or if "Reset to Spawner" or "Reset Nearby Entities" is
  * selected from the contextual menu.
  * - Entities can not be spawned more than 10 meters from the perimeter of the
  * object. The function will silently fail if it is outside of these bounds.
  * - The number of spawned entities are limited by island size. 100 for a small
  * island, ??? for a large. Exceeding this will generate an error on
  * scriptdebug and a message to everyone around.
  * - For linear and angular velocities to have any effect, the prefab to be
  * spawned must be of type Physical Simulated.
  * - The customizer object uses its field names for the names of the
  * customizers to change, and the value of each field should be an object with
  * either a 'value' or 'param' field. The behavior of these fields is the same
  * as their behavior in customizerSet.
  * - Spawning multiple entities is limited by the Spawn queue -
  * see Script Limits
  * - In order to be able to access the data passed by the spawning entity, you
  * need to hand it over to a user function on top level and store it in local
  * state.
  *
  * @param obj Argument Object describing how and where to spawn a prefab.
  */
declare function spawn(
    obj: {
        /** The prefab to spawn. */
        prefab: Prefab;
        /** Marker of the spawner to apply to the default position, rotation and
          * scale. */
        marker_id?: string;
        /** Relative position offset from default position. */
        pos?: VectorPOS;
        /** Relative rotation offset from default rotation. */
        rot?: VectorROT;
        /** Relative scale from default scale. */
        scale?: VectorSCALE;
        /** Linear velocity applied to spawned entity. */
        linear?: VectorVEL;
        /** Angular velocity applied to spawned entity. */
        angular?: VectorVEL; //another type?
        /** Inherit the parent object's linear velocity. */
        inherit_linear?: boolean;
        /** Inherit the parent object's angular velocity. */
        inherit_angular?: boolean;
        /** Gravity used by spawned entity. */
        gravity?: VectorVEL; //another type?
        /** Object which has its fields used to set the spawned entity's
          * customizers. */
        customizers?: customizersObject;
        /** Object which has its fields copied to spawned entity's
          * context.data. */
        created_data?: someDataObject;
        /** Callback function with its context.data.ent set to the created
          * entity. */
        callback?: Callback;
        /** Object which has its fields copied to the callback function's
          * context.data. */
        callback_data?: Callback_Data;
    }
): void;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                               *** Users ***                                //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

/** 
  * Returns the user that sent a message received by a handler.
  * -------------------------------------------
  * - Returns a user, not to be confused with an entity.
  *
  * @param message Message Object from getMessage().
  */
declare function getMessageUser(message?: Message): User;

/** 
  * Returns your owner user.
  * -------------------------------------------
  * - Returns a user, not to be confused with an entity.
  */
declare function getOwnerUser(): User;

/** 
  * Retrieves the values for the requested fields from the user, and calls the
  * callback script with the results.
  * -------------------------------------------
  * - Valid fields to request are:
  *   - display_name' : the displayed name.
  *   - 'temporary': if the user is temporary.
  * - Similar in operation to getEntFields, but operates on a user instead of
  * an ent. An ent is generated for each user when they log in. A user may have
  * mutiple ents, one for each concurrent login.
  *
  * @param obj Argument Object describing what info to request.
  */
declare function getUserFields(
    obj?: {
        /** The user to inspect. */
        user: User;
        /** Fields to include in callback function's context.data. */
        fields: Array;
        /** Callback script with its context.data.user set to a user. */
        callback: Callback;
        /** Arbitrary object which has its fields copied to the callback
          * function's context.data. */
        callback_data?: Callback_Data;
    }
): void;

/** 
  * Returns true if the user has permission over yourself.
  * -------------------------------------------
  * - Current only checks the user against yourself. May be extended in
  * the future to support checks against other entities.
  *
  * @param obj Argument Argument Object describing the permission check
  * to perform.
  */
declare function getUserPermission(
    obj: {
        /** The user to check. */
        user: User
    }
): boolean;

/** 
  * Returns true if the user is a temporary user.
  * -------------------------------------------
  * - Returns a user, not to be confused with an entity.
  *
  * @param user User to check.
  */
declare function userIsTemporary(user: User): boolean;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                              *** Builds ***                                //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

/** 
  * Returns your current Build.
  */
declare function getBuild(): Build;

/** 
  * Retrieves the values for the requested fields from the Build, and calls
  * the callback script with the results.
  * -------------------------------------------
  * - Valid fields to request are:
  *   - 'owner_user' : the owning user.
  *   - 'display_name' : the displayed name.
  *   - 'description' : description.
  *   - 'tags' : tags (array of strings).
  *   - 'published' : if the build is the published version of a draft.
  *   - 'draft_build' : the draft build, if this build is published
  *   - 'published_build' : the published build, if this build is a draft
  *   - 'likes' : the total number of likes for this build
  *   - 'comments' : the total number of comments this build has received
  *   - 'views' : the total number of views this build has received
  *
  * @param obj Argument Object describing what info to request.
  */
declare function getBuildFields(
    obj: {
        /** The Build to inspect. */
        build?: Build;
        /** Fields to include in callback function's context.data. */
        fields: Array;
        /** Callback function with its context.data.build set to the Build. */
        callback: Callback;
        /** Arbitrary object which has its fields copied to the callback
          * function's context.data. */
        callback_data?: Callback_Data;
    }
): void;

/** 
  * Returns your current Build instance.
  * -------------------------------------------
  * - 0 is the default instance. Non-zero instances may limit certain
  * functionality.
  */
declare function getBuildInstance(): number;

/** 
  * Returns true if your current Build is published, or false if your current
  * Build is a draft.
  */
declare function getBuildPublished(): boolean;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                  *** Animation, Particles and Sound ***                    //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

// Particle and sound functions can take a details object which can include
// the following fields:
//   - detach - boolean indicating if the particle should be detached when
// started
// Sound specific details:
//   - See soundStart()
// Particle specific details:
//   - attach - where to attach the particle, defaults to root
//   - ignore_rotation - boolean indicating if the particle should ignore
// the angular velocity or rotation of the host
//   - overrides - Object describing what particle options to override,
// see particleStart().

/** 
  * Pushes a Sequencer and/or Movement Module onto the top of an entity's
  * sequencer stack.
  * -------------------------------------------
  * - This requires at least one of the sequencer or movemod parameters,
  * otherwise an error will be generated on scriptdebug.
  *
  * @param obj Argument Object describing sequencer to add.
  */
declare function animAddSequencer(
    obj: {
        /** Sequencer to push on entities sequencer stack. */
        sequencer?: Parameter;
        /** Movement Module to push on entities sequencer stack. */
        movemod?: Parameter;
        /** The entity stack to push sequencer on. */
        ent?: Entity;
        /** Time (in seconds) this sequencer should stay active. */
        duration?: number;
    }
): void;

/** 
  * Removes a specific or all previously set sequencers from an entity's
  * sequencer stack.
  * -------------------------------------------
  * - To remove a specific Sequencer/Movement Module pair, the sequencer and
  * movemod parameter should match a call to animAddSequencer.
  * - If neither a sequencer or movemod parameter is specified, it removes
  * everything that was pushed onto the sequencer stack
  *
  * @param obj Argument Object describing sequencer/movemod (or all) to stop.
  */
declare function animClearSequencer(
    obj?: {
        /** Sequencer to stop. */
        sequencer?: Parameter;
        /** Movement Module to stop. */
        movemod?: Parameter;
        /** The entity to stop sequencers on. */
        ent?: Entity;
    }
): void;

/** 
  * Animates the clicking player to the marker they clicked on, or specific
  * player or specific marker.
  * -------------------------------------------
  * - See Object Hosted Animation for more details on marker-attached animations.
  *
  * @param obj Argument Object describing marker to animate to (or nearest).
  */
declare function animClickMarker(
    obj?: {
        /** Marker to animate to. */
        marker_id?: string/* marker */; //own type?
        /** The entity to animate. */
        ent?: Entity;
        /** Instructs the animating client to skip the movement phase of
          * attaching to a marker, will instead simply interpolate to the marker
          * position without attempting to walk there first.. */
        skip_movement?: boolean;
    }
): void;

/** 
  * Detaches the specified entity from any animation markers they are attached
  * to.
  * -------------------------------------------
  * - See Object Hosted Animation for more details on marker-attached animations.
  *
  * @param obj Argument Object describing marker to animate to (or nearest).
  */
declare function animDetach(
    obj?: {
        /** The entity to animate. */
        ent?: Entity;
    }
): void;

/** 
  * Plays an animation by keyword.
  * -------------------------------------------
  * - If a sequencer parameter is provided and the keyword does not exist in
  * the specified sequencer, an error is generated.
  *
  * @param obj Argument Object describing animation to play.
  */
declare function animPlay(
    obj: {
        /** Animation keyword to play, ignored if the entity's sequencers do not
          * contain it. */
        keyword: string;
        /** The entity to start the animation on. */
        ent?: Entity;
        /** Sequencer to use when evaluating this keyword. */
        sequencer?: Parameter;
        /** Boolean specifying whether to interrupt the current animation,
          * or queue this animation to play after the current one finishes. */
        interrupt?: boolean;
    }
): void;

/** 
  * Flash a particle emitter.
  * -------------------------------------------
  * - For a discussion of particleStart() compared to particleFlash, and details
  * on the overrides argument, see particleStart#Notes.
  *
  * @param obj Argument Object describing particle to flash.
  */
declare function particleFlash(
    obj: {
        /** The particle parameter to flash. */
        particle: Parameter;
        /** The entity to flash the particle on. */
        ent?: Entity;
        /** Object with optional particle parameters. */
        details?: {
            /** Marker to attach particle to. */
            attach?: string/* marker name */; //own type?
            /** Detaches particle when started. */
            detach?: boolean;
            /** Don't apply host rotation to particle. */
            ignore_rotation?: boolean;
            /** Object describing what particle options to override. */
            overrides?: Object
        }
    }
): void;

/** 
  * Starts a continuous particle emitter.
  * -------------------------------------------
  * - An entity can host at most 4 simultaneous script-generated tracked
  * particle emitters, sound emitters, or labels, and 5 non-tracked
  * (flashed/detached).
  * - If a particle is started detached then it is immediately killed,
  * respecting the Kill Time particle parameter, which defaults to 1 second.
  * Because they are immediately stopped, calling particleStop on a detached
  * particle will do nothing, and therefore a unique handle is not required for
  * detached particles.
  * - Non-detached particles started with particleStart() (unlike
  * particleFlash()) are tracked so that, for example, a 2 minute particle is
  * being played and a new viewer comes into a scene 1 minute later, their
  * particle will start 1 minute in. Detached particles and those started with
  * particleFlash() however are not tracked, so only viewers who are in the
  * scene when the particle is started will see it.
  * - Acceptable keys for the 'overrides' element:
  *   - Movement
  *     - position: [number, number, number, number]
  *     - position_jitter: [number, number, number, number]
  *     - position_radial_jitter: [number, number, number, number]
  *     - velocity: [number, number, number, number]
  *     - velocity_jitter: [number, number, number, number]
  *     - velocity_radial_jitter: [number, number, number, number]
  *     - accel: [number, number, number, number]
  *     - accel_jitter: [number, number, number, number]
  *     - adjust_depth: number
  *   - Color
  *     - hue: [number, number, number, number]
  *     - hue_jitter: [number, number, number, number]
  *     - hue_time: [number, number, number, number]
  *     - saturation: [number, number, number, number]
  *     - saturation_jitter: [number, number, number, number]
  *     - saturation_time: [number, number, number, number]
  *     - value: [number, number, number, number]
  *     - value_jitter: [number, number, number, number]
  *     - value_time: [number, number, number, number]
  *     - alpha: [number, number, number, number]
  *     - alpha_jitter: [number, number, number, number]
  *     - alpha_time: [number, number, number, number]
  *   - Scale (Setting y scale only works if "Scale Linked" is unchecked in
  * source particle)
  *     - scale_x: [number, number, number, number]
  *     - scale_x_jitter: [number, number, number, number]
  *     - scale_x_time: [number, number, number, number]
  *     - scale_y: [number, number, number, number]
  *     - scale_y_jitter: [number, number, number, number]
  *     - scale_y_time: [number, number, number, number]
  * - Keys recognized, but don't appear to change the particle settings:
  *   - spawn_rate: number
  *   - spawn_per: number
  *   - lifespan: number
  * - Keys recognized, but not allowed for use in an override:
  *   - kickstart: bool
  *   - quad: bool
  *   - flip_x: bool
  *   - flip_y: bool
  *   - velocity_radial_linked: bool
  *   - scale_linked: bool
  * - Unknown, unusable or possibly missing override keys
  *   - attach_velocity
  *   - orient_by_velocity
  *
  * @param obj Argument Object describing particle to start.
  */
declare function particleStart(
    obj: {
        /** The particle parameter to start. */
        particle: Parameter;
        /** The entity to start the particle on. */
        ent?: Entity;
        /** Object with optional particle parameters. */
        details?: {
            /** Marker to attach particle to. */
            attach?: string/* marker name */; //own type?
            /** Detaches particle when started. */
            detach?: boolean;
            /** Don't apply host rotation to particle. */
            ignore_rotation?: boolean;
            /** Object describing what particle options to override. */
            overrides?: Object
        };
        /** Handle to use for stopping particle. See particleStop(). */
        handle?: string/* handle name */; //own type?
        /** Duration to keep particle emitter active, in seconds, if attached to
          * a player. */
        duration?: number/* float? */
    }
): void;

/** 
  * Stops a continuous particle emitter by handle.
  * -------------------------------------------
  * - This function is synonomous with soundStop() and labelRemove().
  *
  * @param handle Particle to stop.
  */
declare function particleStop(handle: string/* handle name */): void; //own type?

/** 
  * Emits a one-time sound event.
  * -------------------------------------------
  * - For a discussion of soundStart() compared to soundFlash(), and details
  * about kill_time, see soundStart#Notes.
  *
  * @param obj Argument Object describing sound to flash.
  */
declare function soundFlash(
    obj: {
        /** The sound parameter to flash. */
        sound: Parameter;
        /** The entity to flash the sound on. */
        ent?: Entity;
        /** Object with optional sound parameters. */
        details?: {
            /** Multiplier for sound gain (volume). 0.0 is silent, 1.0 is full
              * volume. */
            gain?: number;
            /** Multiplier for sound playback speed. */
            playback_rate?: number;
            /** If the sound loops continuously or not. */
            loop?: boolean;
            /** How quickly the sound gain falls off with distance Ex: 'linear'
              * or 'inverse'. */
            rolloff_type?: string;
            /** Distance at which sample should be at max volume. */
            min_distance?: number;
            /** Max distance at which sample can no longer be heard. */
            max_distance?: number;
            /** Max distance at which sample stops falling off. Meaningless if
              * greater than max_distance.. */
            max_falloff_distance?: number;
            /** Pan sound depending on angle. Useful for ambient sounds.
              * (Chrome Only). */
            pan?: boolean;
            /** Sounds are delayed for each client by the speed of sound
              * (343 m/s). */
            travel_delay?: boolean;
            /** Sounds are filtered so that high frequency sounds fall off with
              * distance first (Chrome Only). */
            distance_filter?: boolean;
            /** If distance_filter is set, this is the frequency in Hz where
              * the cutoff starts. */
            distance_filter_frequency?: number;
            /** Detaches sound when started. */
            detach?: boolean;
            /** How long, in seconds, until a sound finishes fading out. */
            kill_time?: number;
            /** Position offset (from root) to play sound at. */
            pos?: VectorPOS
        }
    }
): void;

/** 
  * Starts a tracked sound emitter.
  * -------------------------------------------
  * - An entity can host at most 4 simultaneous script-generated tracked
  * particle emitters, sound emitters, or labels, and 5 non-tracked
  * (flashed/detached).
  * - max_distance should always be set larger than min_distance.
  * - If a sound is played detached then it is immediately killed, respecting
  * kill_time, which defaults to 10 seconds for detached sounds. Because they
  * are immediately stopped, calling soundStop on a detached sound will do
  * nothing, and therefore a unique handle is not required for detached sounds.
  * - If a sound is played normally, the default kill_time is 1 second, so a
  * stop (either from soundStop() or the entity the sound is attached to is
  * destroyed) will cause the sound to fade out over 1 seconds. If an instant
  * stop is desired, set kill_time to 0 seconds.
  * - kill_time values less than 2 seconds fade out the sound over the specified
  * time. Values over 2 seconds play normally until the final 2 seconds and then
  * fade out. This allows short, detached sounds to play the entire clip normally.
  * - Non-detached sounds started with soundStart() (unlike soundFlash()) are
  * tracked so that, for example, a 3 minute sound is being played and a new
  * viewer comes into a scene 1 minute later, their sound will start 1 minute in.
  * Detached sounds and those started with soundFlash() however are not tracked,
  * so only viewers who are in the scene when the sound is started will hear the
  * sound.
  *
  * @param obj Argument Object describing sound to start.
  */
declare function soundStart(
    obj: {
        /** The sound parameter to start. */
        sound?: Parameter;
        /** The url for a stream (should be .ogg, but .mp3 will work for chrome
          * users). */
        url?: Parameter;
        /** The entity to start the sound on. */
        ent?: Entity;
        /** Object with optional sound parameters. */
        details?: {
            /** Multiplier for sound gain (volume). 0.0 is silent, 1.0 is full
              * volume. */
            gain?: number;
            /** Multiplier for sound playback speed. */
            playback_rate?: number;
            /** If the sound loops continuously or not. */
            loop?: boolean;
            /** How quickly the sound gain falls off with distance Ex: 'linear'
              * or 'inverse'. */
            rolloff_type?: string;
            /** Distance at which sample should be at max volume. */
            min_distance?: number;
            /** Max distance at which sample can no longer be heard. */
            max_distance?: number;
            /** Max distance at which sample stops falling off. Meaningless if
              * greater than max_distance.. */
            max_falloff_distance?: number;
            /** Pan sound depending on angle. Useful for ambient sounds.
              * (Chrome Only). */
            pan?: boolean;
            /** Sounds are delayed for each client by the speed of sound
              * (343 m/s). */
            travel_delay?: boolean;
            /** Sounds are filtered so that high frequency sounds fall off with
              * distance first (Chrome Only). */
            distance_filter?: boolean;
            /** If distance_filter is set, this is the frequency in Hz where
              * the cutoff starts. */
            distance_filter_frequency?: number;
            /** Detaches sound when started. */
            detach?: boolean;
            /** How long, in seconds, until a sound finishes fading out. */
            kill_time?: number;
            /** Position offset (from root) to play sound at. */
            pos?: VectorPOS
        };
        /** Handle to use for stopping sound. See soundStop(). */
        handle?: string/* handle name */; //own type?
        /** Duration to keep sound emitter active, in seconds, if attached to a 
          * player. */
        duration?: number/* float? */
    }
): void;

/** 
  * Stops a tracked sound emitter by handle.
  * -------------------------------------------
  * - The stopped sound will fade out based on the kill_time specified when the
  * sound was created.
  * - If you wish to stop a sound that is authored as part of the Prefab, create
  * a Customizer exposing the hidden property of the sound and use
  * customizerSetValue() to set the hidden customizer to true.
  * - This function is synonomous with particleStop() and labelRemove().
  *
  * @param handle Sound to stop.
  */
declare function soundStop(handle: string/* handle name */): void; //own type?

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                             *** Physics ***                                //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

/** 
  * Applies impulse.
  * -------------------------------------------
  * - The entity to be moved must be set to Physical Type: Simulated.
  * - Passing an array is interpreted as {impulse: array}
  *
  * @param obj Object describing the impulse to apply.
  */
declare function applyImpulse(
    obj: {
        /** The impulse direction and magnitude to apply. */
        impulse: Vector;
        /** Entity to apply impulse on. */
        ent?: Entity;
    }
): void;

/** 
  * Applies outward impulse from the scripted object to nearby ents.
  * -------------------------------------------
  * - This is considered a Broadcast, and multiple Broadcasts are limited by the
  * Broadcast queue - see Script Limits.
  * - Only affects objects that are Physical Type: Simulated, and players.
  *
  * @param obj Object describing the impulse to apply.
  */
declare function applyImpulseFrom(
    obj: {
        /** The magnitude of the impulse. */
        mag: number;
        /** The radius in which to apply the impulse. Mag falls off from center,
          * hitting 0 at this radius. */
        radius: number;
        /** Position offset from object pos
          * ([0, 1, 0] is 1m in front of object). */
        pos?: VectorPOS;
        /** Direction to apply force in, also "shapes" falloff in
          * that direction. */
        dir?: Vector;
    }
): void;

/** 
  * Gets your gravity.
  */
declare function getGravity(): VectorVEL;

/** 
  * Gets an array of your marker_ids.
  */
declare function getMarkerIDs(): Array; // array (string (marker name))

/** 
  * Gets the relative position of one of your markers by marker_id.
  *
  * @param marker_id The marker id to obtain relative position from.
  */
declare function getMarkerPos(marker_id: string/* marker name */): VectorPOS; //own marker type?

/** 
  * Gets the current world position of one of your markers by marker_id.
  *
  * @param marker_id The marker id to obtain relative position from.
  */
declare function getMarkerPosWorld(marker_id: string/* marker name */): VectorPOS; //own marker type?

/** 
  * Gets the relative rotation of one of your markers by marker_id.
  *
  * @param marker_id The marker id to obtain relative rotation from.
  */
declare function getMarkerRot(marker_id: string/* marker name */): VectorROT; //own marker type?

/** 
  * Gets the world rotation of one of your markers by marker_id.
  *
  * @param marker_id The marker id to obtain rotation from.
  */
declare function getMarkerRotWorld(marker_id: string/* marker name */): VectorROT; //own marker type?

/** 
  * Gets world position of the scripted item.
  */
declare function getPos(): VectorPOS;

/** 
  * Gets world rotation of the scripted item.
  */
declare function getRot(): VectorROT;

/** 
  * Gets world scale of the scripted item.
  */
declare function getScale(): VectorSCALE;

/** 
  * Gets angular velocity of the scripted item.
  */
declare function getVelAngular(): VectorVEL;

/** 
  * Gets angular velocity of the scripted item.
  */
declare function getVelLinear(): VectorVEL;

/** 
  * Sets rotation to point toward target.
  * -------------------------------------------
  * - Passing an array is interpreted as {pos: array}.
  * - The entity to be moved must be set to Physical Type: Movable or Simulated..
  *
  * @param obj Object describing world position to point toward.
  */
declare function pointToward(
    obj: {
        /** World position to point toward. */
        pos: VectorPOS;
        /** Entity to set rotation of. */
        ent?: Entity;
    }
): void;

/** 
  * Sets gravity.
  * -------------------------------------------
  * - Default gravity is [0, 0, -9.8].
  *
  * @param obj Object describing gravity to set.
  */
declare function setGravity(
    obj: {
        /** Gravity to set. */
        gravity: VectorVEL;
        /** Entity to set gravity on. */
        ent?: Entity;
    }
): void;

/** 
  * Sets position of an ent.
  * -------------------------------------------
  * - Passing an array is interpreted as {pos: array}.
  * - The entity to be moved must be set to Physical Type: Movable or Simulated.
  *
  * @param obj Object describing position to set.
  */
declare function setPos(
    obj: {
        /** Position to set. */
        pos: VectorPOS;
        /** Entity to set position of. */
        ent?: Entity;
    }
): void;

/** 
  * Sets position and/or rotation of an ent.
  * -------------------------------------------
  * - If both pos and rot are missing, you will get an error on scriptdebug:
  * - requires a pos or rot
  * - The entity to be moved must be set to Physical Type: Movable or Simulated.
  *
  * @param obj Object describing position and rotation to set.
  */
declare function setPosRot(
    obj: {
        /** Position to set. */
        pos: VectorPOS;
        /** Rotation to set. */
        rot: VectorROT;
        /** Entity to set position and rotation of. */
        ent?: Entity;
    }
): void;

/** 
  * Sets rotation of an ent.
  * -------------------------------------------
  * - Passing an array is interpreted as {rot: array}
  * - The entity to be moved must be set to Physical Type: Movable or Simulated.
  *
  * @param obj Object describing rotation to set.
  */
declare function setRot(
    obj: {
        /** Rotation to set. */
        rot: VectorROT;
        /** Entity to set rotation of. */
        ent?: Entity;
    }
): void;

/** 
  * Sets angular velocity.
  * -------------------------------------------
  * - The entity to be moved must be set to Physical Type: Movable or Simulated.
  * - {vel: [0, 90, 0]} rotates 90 degrees/s around your local forward axis
  * - {vel: [0, 90, 0], world: true} rotates 90 degrees/s around the world's y
  * axis
  *
  * @param obj Object describing angular velocity to set.
  */
declare function setVelAngular(
    obj: {
        /** Angular velocity to set. */
        vel: VectorVEL;
        /** Flag to specify if velocity is in world space (true) or local space
          * (false). */
        world?: boolean;
        /** Entity to set angular velocity on. */
        ent?: Entity;
    }
): void;

/** 
  * Sets linear velocity.
  * -------------------------------------------
  * - The entity to be moved must be set to Physical Type: Movable or Simulated.
  * - {vel: [0, 5, 0]} moves 5 meters/s in the direction you're currently facing
  * - {vel: [0, 5, 0], world: true} moves 5 meters/s down the world's y axis
  * regardless of the direction you're facing
  *
  * @param obj Object describing linear velocity to set.
  */
declare function setVelLinear(
    obj: {
        /** Linear velocity to set. */
        vel: VectorVEL;
        /** Flag to specify if velocity is in world space (true) or local space
          * (false). */
        world?: boolean;
        /** Entity to set linear velocity on. */
        ent?: Entity
    }
): void;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                                *** UI ***                                  //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

/** 
  * Creates a controller on the player's screen that can display status text and
  * send messages back to you..
  * -------------------------------------------
  * - texts: is an optional array of {channel, message, text, tooltip} objects.
  * Channel and message specify a channel and message the client should listen
  * for. When a matching message is seen, the message's data's text and tooltip
  * fields are displayed in the UI, replacing the previous text and/or tooltip.
  * - buttons: is an optional array of {channel, message, data, text, tooltip,
  * close} objects. Channel, message and data specify the message sent back to
  * the script when the player clicks a button.
  *
  * @param obj Argument Object describing what to display in the controller.
  */
declare function controllerCreate(
    obj: {
        /** The entity to present the controller to. */
        ent: Entity;
        /** The title of the controller. */
        title: string;
        /** Array of {channel, message, text, tooltip} objects. */
        texts?: {
            /** Message the controller listens for (on the specified channel)
            to update this text display. */
            message: Message;   // Message or string???
            /** Channel the controller listens on to update this text display. */
            channel?: Channel;
            /** Default string to display in the controller until later updated. */
            text?: string;
            /** Default string to display when mouse is over text in the
              * controller until later updated. */
            tooltip?: string;
            /** Allow this text display to listen to messages from any entity,
              * rather than just the entity that created the controller. */
            open?: boolean
        };
        /** Array of {channel, message, data, text, tooltip, close} objects. */
        buttons?: {
            /** String to identify this button, defining the message that will
            be sent back to the script when the button is clicked. */
            message: Message;   // Message or string???
            /** Channel the message will be sent on. */
            channel?: Channel;
            /** Data to be sent along with the message when this button is
              * clicked (access with getMessageData()). */
            data?: someDataObject;
            /** String to display on the button. */
            text?: string;
            /** String to display when mouse is over the button. */
            tooltip?: string;
            /** Specifies this button is a dialog close button (the X in the
              * upper-right corner). */
            close?: boolean;
        };
        /** Keep the controller around after the source entity goes away. */
        linger?: boolean
    }
): void;

/** 
  * Creates a controller on the player's screen that can display HTML and send
  * messages back to you..
  * -------------------------------------------
  * - An id can be both a listener and a messager to both send messages when
  * clicked, and receive updates with controllerMessage()
  * - The elements with ids marking them as listeners and messagers can be
  * created dynamically in response to a controllerMessage()
  * - Nested messagers are allowed, but only one will send a message per click
  * - A listener with a command will not update its content, instead it will
  * either close the controller ('close' command), or update the specified value
  * of the controller ('title', 'width', 'height' or 'padding' command) based on
  * the value in the message it received.
  * - The message data sent by a messager, which you can retrieve by calling
  * getMessageData(), may include an event field. The event field includes data
  * about the browser event that caused the messager to send the message. For
  * example, the x and y position of a mouse click, and the width and height of
  * the messager HTML element.
  * - A messager that is inside a form will automatically send the values of all
  * named sibling form elements (text, password, hidden, checkbox, radio and
  * select elements). You can retrieve this data by calling getMessageData() and
  * inspecting its form field.
  * - The maximum size for the controller contents is 600x400 - anything larger
  * than that will get scroll bars.
  *
  * @param obj Argument Object describing what to display in the controller.
  */
declare function controllerHTMLCreate(
    obj: {
        /** The entity to present the controller to. */
        ent: Entity;
        /** The title of the controller (HTML not allowed). */
        title: string;
        /** The HTML content of the controller. */
        html: string;
        /** Array of {id, message, channel} objects. */
        listeners?: {
            /** id of the HTML element that will reflect any matching messages. */
            id: string;
            /** Message the controller listens for to update this HTML element
              * (update with controllerMessage). */
            message?: Message;   // Message or string???
            /** Channel the controller listens on to update this HTML element. */
            channel?: Channel;
            /** Make the listener uses the message content to either close or
              * modify the controller itself, based on the command. */
            command?: string;
            /** Allow the listener to listen to messages from any entity, rather
              * than just the entity that created the controller. */
            open?: boolean
        };
        /** Array of {id, message, channel, data} objects . */
        messagers?: {
            /** id of the HTML element that will trigger this message when
              * clicked. */
            id: string;
            /** Message sent when this HTML element is clicked. */
            message?: Message;   // Message or string???
            /** Channel the controller communicates on for this HTML element. */
            channel?: Channel;
            /** Data to be sent along with the message when this element is
              * clicked (access with getMessageData()). */
            data?: someDataObject;
            /** Specifies this messager is a dialog close button (the X in the
              * upper-right corner). No id is needed. */
            close?: boolean;
        };
        /** Width of HTML controller (minimum is 150). */
        width?: number/* integer */;
        /** Height of HTML controller. */
        height?: number/* integer */;
        /** Padding of text and images inside of controller. */
        padding?: number/* integer */;
        /** Keep the controller around after the source entity goes away. */
        linger?: boolean
    }
): void;

/** 
  * Sends a controller message to players to update controller texts.
  * -------------------------------------------
  * - If either ent or ents is provided, it will send direct messages, otherwise
  * the message is broadcast to all nearby entities..
  * - This may be considered a Broadcast, and multiple Broadcasts are limited by
  * the Broadcast queue - see Script Limits
  * - The text and tooltip are automatically stringified if they are defined.
  * - It takes a small amount of time after a controllerCreate or
  * controllerHTMLCreate before the texts or messagers handlers to become active.
  * If a controllerMessage is sent too soon after a controller is created,
  * the message may be lost. If possible, rearrange your code so that as much of
  * the dynamic information as possible has been gathered before presenting
  * the controller the first time.
  *
  * @param obj Argument Object describing what to update in the controller.
  */
declare function controllerMessage(
    obj: {
        /** The message the controller is listening for. */
        message?: Message;   // Message or string???
        /** The text to use as a replacement. */
        text?: string;
        /** Tooltip for the text. */
        tooltip?: string;
        /** Channel for the message. */
        channel?: Channel;
        /** The entity of the controller to update. */
        ent?: Entity
        /** Array of {message, text, tooltip} objects. */
        messages?: Array<{ message: string; text?: string; tooltip?: string }>;  // !?!?!?!?!?!
        /** The entities of the controllers to update. */
        ents?: Entities
    }
): void;

/** 
  * Creates a dialog on the player's screen.
  * -------------------------------------------
  * - Either text or url must be specified, but not both.
  * - The maximum size for url contents is 600x400 - anything larger than that
  * will get scroll bars.
  * - If a url is specified, the default behavior for clicking on the link,
  * rather than the button(s), is whichever button is first. The buttons are
  * displayed in the order specified in the url_targets array.
  * - If a url is specified, the external page can send messages back to the
  * source entity using the javascript postMessage function. For example:
  *   - window.parent.postMessage({channel: 'dialog', message: 'message',
  *   data: {say: 'Hello World'}}, 'https://a.cloudparty.com');
  *   - This feature is experimental and subject to change
  * - Similarly, the external page can send messages back to the main window
  * regarding focus and blur state so the main window can properly manage its
  * active state. For example:
  *   - window.onfocus = function() { window.parent.postMessage({event: {type: 
  *   'focus'}}, 'https://a.cloudparty.com'); };
  *   - window.onblur = function() { window.parent.postMessage({event: {type: 
  *   'blur'}}, 'https://a.cloudparty.com'); };
  *   - This feature is experimental and subject to change
  *
  * @param obj Argument Object describing what to display in the dialog.
  */
declare function dialogCreate(
    obj: {
        /** The entity to present the dialog to. */
        ent: Entity;
        /** The internal name of the dialog. The client will only display one
          * dialog per name, additional dialogs will be ignored.. */
        name?: string;
        /** The title of the dialog (HTML not allowed). */
        title: string;
        /** The text of the dialog (HTML is allowed). */
        text?: string;
        /** The full url to display. */
        url?: string;
        /** How to open the url. Options are 'frame' and 'blank'.. */
        url_targets?: Array/* string??? */;
        /** Width of dialog. */
        width?: number/* integer */;
        /** Height of dialog. */
        height?: number/* integer */;
        /** Padding of text and images inside dialog.. */
        padding?: number/* integer */
    }
): void;

/** 
  * Adds a customizable label to a player.
  * -------------------------------------------
  * - An entity can host at most 4 simultaneous script-generated tracked
  * particle emitters, sound emitters, and labels.
  * - Colors are specified using HTML/CSS colors, e.g. #RGB, #RRGGBB, or color
  * names.
  * - Labels added to non-players will not be visible under normal circumstances
  * (they can be shown with /entity_ui_object_name 1, and if you have
  * a compelling use for them, let Cloud Party know and we can probably get that
  * working in an appropriate matter).
  *
  * @param obj Argument Object describing the label and its parameters.
  */
declare function labelAdd(
    obj: {
        /** The text contents of the label. Limited to 20 characters. */
        text: string;
        /** The entity to add the label to. Should be a player. */
        ent?: Entity;
        /** Object with optional styling parameters. */
        style?: {
            /** Text color. */
            color?: string;
            /** Background color. */
            backgroundColor?: string;
            /** Border color. */
            borderColor?: string
        };
        /** Handle to use for removing the label. See labelRemove(). */
        handle?: string/* handle name */;
        /** Duration to keep label active, in seconds, if attached to a player. */
        duration?: number /* float */
    }
): void;

/** 
  * Removes a label by handle.
  * -------------------------------------------
  * - This function is synonomous with particleStop() and soundStop().
  *
  * @param handle Label to remove.
  */
declare function labelRemove(handle: string/* handle name */): void;

/** 
  * Sets an ent's tooltip, will remove the tooltip if the tooltip text is empty.
  * -------------------------------------------
  * - Passing a string is interpreted as {tooltip: string}.
  *
  * @param obj Argument Object describing what to display in the controller.
  */
declare function setTooltip(
    obj: {
        /** The text of the tooltip. */
        tooltip: string;
        /** The entity to set the Tooltip on. */
        ent?: Entity;
    }
);

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                          *** Script Calling ***                            //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

/** 
  * Calls a function by name, passes the optional data.
  * -------------------------------------------
  * - Passing a string is interpreted as {script: string}.
  * - Only provided for completeness. The same can be accomplished by using
  * the function name. Ex: myFunction() or myFunction( {foo: 'bar'} )
  * - The key 'script' is somewhat misleading. It is technically a function that
  * it is calling.
  *
  * @param obj Object describing function to call.
  */
declare function call(
    obj: {
        /** Name of function to call. */
        script: string/* function name */;
        /** Arbitrary object passed as context.data. */
        data?: someDataObject;
    }
): any;

/** 
  * Checks if a script function exists by name
  *
  * @param func Name of function to check.
  */
declare function getFunction(func: string/* function name */): string/* function name */;

/** 
  * Returns the handler object (context.handler) in a function called by
  * a handler.
  */
declare function getHandler(): Context.handler;

/** 
  * Returns the handler data object in a function called by a handler
  *
  * @param handler Handler Object from getHandler().
  */
declare function getHandlerData(handler?: Handler): HandlerData;

/** 
  * Returns the message object received by a handler
  */
declare function getMessage(): Message;

/** 
  * Returns the message object received by a handler
  */
declare function getMessageData(message: Message): MessageData;

/** 
  * Returns the timer object (context.timer) in a function called by a timer
  */
declare function getTimer(): Timer;

/** 
  * Returns the timer object data in a function called by a timer
  */
declare function getTimerData(timer: Timer): TimerData;

/** 
  * Creates a new handler
  * -------------------------------------------
  * - See Script Messages for a list of pre-defined channels and messages.
  *
  * @param handler Object describing handler to create().
  */
declare function handlerCreate(handler: Handler): void;

/** 
  * Destroys an existing handler
  *
  * @param name The name of the handler to destroy.
  */
declare function handlerDestroy(name: HandlerName): void;

/** 
  * Disables or enables a handler
  *
  * @param name The name of the handler to disable/enable.
  * @param disabled Flag to disable/enable handler (true disables handler).
  */
declare function handlerSetDisabled(name: HandlerName, disabled?: boolean): void;

/** 
  * Disables or enables a handler
  *
  * @param name The name of the function to disable/enable.
  * @param disabled Flag to disable/enable function (true disables function).
  */
declare function scriptSetDisabled(
    name: string/* function name */,
    disabled: boolean
): void;

/** 
  * Creates a new timer.
  * -------------------------------------------
  * - A jitter of 0.5 and a period of 10 means each period is anywhere from 9.5
  * to 10.5 seconds. If no jitter is specified, the period time is always as
  * specified.
  * - When specifying a period only, the timer will fire immediately, and then
  * again every set number of seconds. If you do not want it to fire immediately,
  * specify a delay also.
  * - The minimum time between timer events is currently .066 seconds (15 times
  * a second). Period values below that will be set to .066.
  *
  * @param timer Object describing timer to create.
  */
declare function timerCreate(timer: Timer): void;

/** 
  * Destroys an existing timer
  *
  * @param name The name of the timer to destroy.
  */
declare function timerDestroy(name: TimerName): void;

/** 
  * Pauses or unpauses a timer.
  *
  * @param name The name of the timer to pause/unpause.
  * @param paused Flag to stop/start timer (true pauses timer)
  */
declare function timerSetPaused(name: TimerName, paused: boolean): void;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                        *** Player Interaction ***                          //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

interface IBUILD extends Object{

}

interface ITeleportDestination {
    /** Target Build. */
    build?: IBUILD;
    /** Target Position. */
    pos: VectorPOS;
    /** Target yaw, in degrees. */
    yaw: number;
}

/** 
  * Teleports a player entity to a new Build or location.
  * -------------------------------------------
  * - Requires confirmation from the user if there is a Build change
  * - In-Build teleports will trigger the teleport movement controller
  * - Can only be called as a result of a click message handler
  * - You can get these values from your URL:
  * https://www.cloudparty.com/loc/2000/-10.4,-9.6,0.2,0
  * Breakdown is:
  * /loc/build/pos1,pos2,pos3,yaw,
  * so :
  * {build: 2000, pos: [-10.4,-9.6,0.2], yaw: 0}
  *
  * @param obj Object describing teleport destination.
  */
declare function teleport(obj: ITeleportDestination): void;

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
