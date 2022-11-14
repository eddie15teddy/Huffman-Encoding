/*
CLASS:      HuffmanTree
AUTHOR:     Eddie Butkaliuk
REMARKS:    Class implementing a Huffman tree.
*/

'use strict';

const Node = require("./Node");

class HuffmanTree
{
    constructor(label, weight)
    {
        if(arguments.length !== 2)
            throw new Error("Wrong arguments passed to HuffmanTree");
        else if(HuffmanTree.#isHuffmanTree(arguments[0]) && HuffmanTree.#isHuffmanTree(arguments[1]))
        {
            //making a tree from two subtrees (each of the first two arguments are HuffmanTree objects).

            this._weight = arguments[0].weight + arguments[1].weight;
            this._root = new Node();
            this._root.left = arguments[0].root;
            this._root.right = arguments[1].root;
        }
        else
        {
            //making a new tree
            this._weight = weight;
            this._root = new Node(label);
        }
    }

    //returns the huffman code for the label passed
    getHuffmanCode(label)
    {
       return this.#getHuffmanCodeR(label, this._root, "");
    }

    #getHuffmanCodeR(label, topNode, pathSoFar)
    {
        let pathL = pathSoFar + "0";
        let pathR = pathSoFar + "1";
        let pathToReturn;

        if(topNode.left === null)
        {//topNode is the leaf node.
            if(topNode.label === label)
                return pathSoFar;
            else
                return null;
        }
        else
        {//top node has child nodes
            pathL = this.#getHuffmanCodeR(label, topNode.left, pathL);
            pathR = this.#getHuffmanCodeR(label, topNode.right, pathR);


            if(pathL != null)
                pathToReturn =  pathL;
            else if(pathR != null)
                pathToReturn =  pathR;

            return pathToReturn;
        }
    }

    get root() {return this._root;}
    get weight() {return this._weight;}

    compareTo(otherTree)
    {
        if(!HuffmanTree.#isHuffmanTree(otherTree))
            throw new Error("Not a tree was passed to the HuffmanTree's compareTo function");

        if(this._weight < otherTree.weight)
        {//this tree comes before parameter tree
            return -1;
        }
        else if(this._weight > otherTree.weight)
        {//parameter tree comes before this tree
            return 1;
        }
        else
        {//the two trees have equal weight
            let thisLowest = HuffmanTree.#getLowestLeaf(this._root).label;
            let otherLowest = HuffmanTree.#getLowestLeaf(otherTree.root).label;

            if(thisLowest < otherLowest)
                return -1;
            else if (thisLowest > otherLowest)
                return 1;
            else
                return 0;
        }
    }

    //returns the leaf node with the lowest label.
    static #getLowestLeaf(rootNode)
    {
        if(rootNode.left == null)       //if this is the only node in the tree, it is als the lowest node
            return rootNode;
        else if(rootNode.left.left === null && rootNode.right.right === null)
        {//the rootNode only has two nodes. Check which one is lower
            if(rootNode.left.label < rootNode.right.label)
                return rootNode.left;
            else
                return  rootNode.right;
        }
        else
        {//the root node has more than 2 leaf nodes.
            let lowestLNode =  HuffmanTree.#getLowestLeaf(rootNode.left);
            let lowestRNode = HuffmanTree.#getLowestLeaf(rootNode.right);

            if(lowestLNode.label < lowestRNode.label)
                return lowestLNode;
            else
                return lowestRNode;
        }
    }

    static #isHuffmanTree(something)
    {
        return typeof (something) === 'object' && '_weight' in something && '_root' in something;
    }

}

module.exports = HuffmanTree;