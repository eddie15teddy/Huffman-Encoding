/*
CLASS:      Node
AUTHOR:     Eddie Butkaliuk
REMARKS:    A basic node with a left, right children and label
*/

'use strict';
const Console = require("console");

class Node
{
    constructor(label)
    {
        this._left = null;
        this._right = null;

        if(arguments[0] !== null)
            this._label = label;
        else
            this._label = null;     //label is a char when the node is a leaf node

    }

    get left() { return this._left;}
    get right() {return this._right;}
    get label() {return this._label;}

    set left(leftNode) { this._left = leftNode;}
    set right(rightNode) {this._right = rightNode;}
    set label(label) {this._label = label;}

}

module.exports = Node;