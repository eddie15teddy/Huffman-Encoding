/*
CLASS:      Hashable
AUTHOR:     Eddie Butkaliuk
REMARKS:    Abstract class for hash classes
*/


'use strict'

class Hashable
{
    constructor(key)
    {
        if(this.constructor === Hashable)
            throw new Error("Hashable is abstract and cannot be created.");
        this._key = key;
    }

    //abstract method
    equals(x)
    {
        throw new Error("Missing equals method in subclass.");
    }

    //abstract method
    get hashVal()
    {
        throw new Error("Missing hasValue getter in subclass.");
    }

    get key() {return this._key}
}

module.exports = Hashable;