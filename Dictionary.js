/*
CLASS:      Dictionary
AUTHOR:     Eddie Butkaliuk
REMARKS:    A class implementing a dictionary data structure.
            Uses separate chaining to handle collisions.
*/


"use strict"

const Hashable = require("./Hashable");
const Pair = require("./Pair");
const Console = require("console");

class Dictionary
{
    #size;
    #isEmpty;
    constructor(size)
    {
        if(arguments.length === 1) {
            this.#size = size;
            this._pairs = new Array(size);
            this.#isEmpty = true;
        }
        else
            throw new Error("Wrong arguments for Dictionary constructor");
    }

    //puts a new key - value pair in the dictionary if it does not exist
    //if a pair with given key exists, it edits the value of it to passed value
    //k is a Hashable object, v is anything
    put(k, v)
    {
        this.#checkTypeKey(k);
        this.#isEmpty = false;

        let newPair = new Pair(k, v);                       //create a new pair. This will automatically generate its hash code
        let index = newPair.hashableKey.hashVal % this.#size;   //get the index where this pair would be in the dictionary
        let currPair = this._pairs[index];                  //get the pair current at that index
        let prevPair;                                       //holds the pair before the current pair.
        let found = false;

        //try to find the pair with that key. Loop till found or end is reached
        while(currPair !== undefined && currPair !== null && !found)
        {
            if(currPair.hashableKey.equals(newPair.hashableKey))
                found = true;
            else
            {
                prevPair = currPair;
                currPair = currPair.next;
            }
        }

        if(found)
            currPair.value = v;
        else
        {
            //check if I need to add to array index or to end of linked list at that index
            if(prevPair === undefined)
                this._pairs[index] = newPair;           //loop did not run, and !found, so there is nothing stored at first index
            else
                prevPair.next = newPair;                //loop ran, so prevPair is last node in list at index in array
        }

    }

    get(k)
    {
        this.#checkTypeKey(k);
        let index = k.hashVal % this.#size;   //get the index where this key would be in the dictionary
        let currPair = this._pairs[index];

        //check if there is anything stored at this index
        if(this._pairs[index] === undefined)
            return undefined;           //if not, pair with current key does not exist

        //if here, there is something stored at that index

        //loop through all items at that index
        while(currPair !== null && currPair !== undefined)
        {
            if (currPair.hashableKey.equals(k))          //if current item's key is the same as the passed key
                return currPair.value;

            currPair = currPair.next;
        }//return true


        //if here, no item with passed key exists.
        return undefined;

    }

    contains(k)
    {
        this.#checkTypeKey(k);
        let index = k.hashVal % this.#size;   //get the index where this key would be in the dictionary
        let currPair = this._pairs[index];

        //check if there is anything stored at this index
        if(this._pairs[index] === undefined)
            return false;           //if not, pair with current key does not exist

        //if here, there is something stored at that index

        //loop through all items at that index
        while(currPair !== null && currPair !== undefined)
        {
            if (currPair.hashableKey.equals(k))          //if current item's key is the same as the passed key
                return true;

            currPair = currPair.next;
        }//return true


        //if here, no item with passed key exists.
        return false;
    }

    isEmpty()
    {
        return this.#isEmpty;
    }

    #checkTypeKey(key)
    {
        if(!('equals' in key && typeof(key.equals) === 'function' && 'hashVal' in key && typeof(key.hashVal) === 'number'))
            throw new Error("Wrong type passed as key;");
    }
}

module.exports = Dictionary;