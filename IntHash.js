/*
CLASS:      IntHash
AUTHOR:     Eddie Butkaliuk
REMARKS:    Child of Hashable. Represents a Hashable object that stores an int value
*/

'use strict'
const Hashable = require("./Hashable");

class IntHash extends Hashable
{
    constructor(key) {
        if(arguments.length !== 1)
            throw new Error("Wrong arguments in IntHash.")
        super(key);

        //set hash value
        this._hashValue = key;

    }

    equals(otherKey) {
        return this.key === otherKey.key;
    }

    get hashVal() { return this._hashValue; }
}


module.exports = IntHash;