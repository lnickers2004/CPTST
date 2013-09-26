
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
  * - The primary fields are year, month, date, hours, minutes, seconds, milliseconds, the same fields or arguments
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
