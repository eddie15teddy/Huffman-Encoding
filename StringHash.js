/*
CLASS:      IntHash
AUTHOR:     Eddie Butkaliuk
REMARKS:    Child of Hashable. Represents a Hashable object that stores a string value
*/

'use strict'
const Hashable = require("./Hashable");

class StringHash extends Hashable
{
    #prime;
    constructor(key) {
        if(arguments.length !== 1)
            throw new Error("Wrong arguments in IntHash.")
        super(key);

        this.#prime = 7;

        //set hash value
        this._hashValue = 0;
        for(let i = 0; i < key.length; i++)
        {
            this._hashValue += StringHash.charToCode(key) * Math.pow(this.#prime, key.length-(i+1));
        }

    }

    equals(otherKey) {
        return this.key === otherKey.key;
    }

    get hashVal() { return this._hashValue; }

    //returns the ascii code of char, where the code for "—" is 128
    static charToCode(char)
    {
        if(char !== "—")
            return char.charCodeAt(0)
        else
            return 128;
    }

    //returns the ascii char at code, where ascii[128] = "—"
    static codeToChar(code)
    {
        if(code !== 128)
            return String.fromCharCode(code);
        else
            return "—";
    }
}

module.exports = StringHash;