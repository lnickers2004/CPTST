
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

interface State_Key extends Object {

}

interface User extends Object {

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
