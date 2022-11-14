/*
CLASS:      Pair
AUTHOR:     Eddie Butkaliuk
REMARKS:    A Pair is a pair holding a value and a key. Has next field for node like capabilities.
*/

"use strict"
class Pair
{


    constructor(hashableKey, value) {
        if(arguments.length !== 2)
            throw new Error("Wrong arguments in Pair class");
        else
        {
            this._hashableKey = hashableKey;
            this._value =  value;
            this._next = null;
        }

    }

    get hashableKey() {return this._hashableKey}
    get next(){return this._next}
    get value(){return this._value}

    set next(nextPair) {this._next = nextPair}
    set value(newValue) {this._value = newValue}
}

module.exports = Pair;