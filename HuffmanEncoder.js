

'use strict'
const fs = require('fs');
const StringHash = require("./StringHash");
const Dict = require("./Dictionary");
const HuffmanTree = require("./HuffmanTree");

class HuffmanEncoder
{
    constructor(filename)
    {
        if(arguments.length !== 1)
        {}
        this._inputFile = filename;
        this._outputFile = filename + ".huff";
    }

    encode()
    {

        //READ THE FILE AND CREATE ARRAY
        let contents = fs.readFileSync(this._inputFile, "utf8");
        let frequencies = new Array(129);  //there are 128 possible chat values
        frequencies.fill(0);                    //fill the array with 0s
        let proportions = new Array(129);  //there are 128 possible chat values
        proportions.fill(0);
        let uniqueCharCount = 0;                      //the number of unique chars in the input file
        let dict = new Dict(30);
        let trees;                                    //an array of trees for huffman encoding

        //COUNT THE FREQUENCY OF EACH CHAR
        for(let i = 0; i < contents.length; i ++)
        {
            let ind = StringHash.charToCode(contents[i]);
            frequencies[ind]++;
        }

        //COUNT THE PROPORTION OF EACH CHAR
        //go through all the frequencies, and find the proportion of that char in the file
        for(let i = 0; i < frequencies.length; i++)
            proportions[i] = frequencies[i]/contents.length;

        //ADD THE CHARS TO THE DICTIONARY
        //The char is the key, the proportion is the value.

        //go through all the proportions
        for(let i = 0; i < proportions.length; i++)
        {
            //if this proportion is not 0, add it to the dictionary
            if (proportions[i] !== 0) {
                uniqueCharCount++;

                let key = new StringHash(String.fromCharCode(i))    //the char is the key
                dict.put(key, proportions[i]);                      //the proportion is the value
            }
        }

        //CREATE A HUFFMAN TREE FOR EACH CHAR
        // he weights are the percentages.
        trees = new Array(uniqueCharCount)
        let index = 0;
        for(let i = 0; i < proportions.length; i ++)
        {
            if(proportions[i] !== 0)
            {
                let label = StringHash.codeToChar(i)
                trees[index] = new HuffmanTree(label, proportions[i]);
                index++;
            }
        }


        //COMBINE INTO ONE TREE
        let treesLength = trees.length;
        while(treesLength !== 1)
        {
            //find the two smallest trees in trees
            let A = this.#findSmallestTrees(trees);
            let smallestTree1 = A[0];
            let smallestTree2 = A[1];
            let smallestIndex1 = A[2];
            let smallestIndex2 = A[3];
            //create a new tree out of 2 smallest trees

            let newTree = new HuffmanTree(smallestTree1, smallestTree2);

            let newTrees = new Array(treesLength-1);
            let indexInNew = 1;
            newTrees[0] = newTree;
            for(let j = 0; j < trees.length; j++)
            {
                if(j !== smallestIndex1 && j !==smallestIndex2) {
                    newTrees[indexInNew] = trees[j];
                    indexInNew ++;
                }
            }
            trees = newTrees;
            treesLength--;
        }

        let T = trees[0]; //store the one tree in T


        //MAKE OUTPUT FILE
        //calculate Huffman code for each char in the file

        for(let i = 0; i < contents.length; i++)
        {
            fs.appendFileSync(this._outputFile, T.getHuffmanCode(contents[i]));
            if(i < contents.length -1)
                fs.appendFileSync(this._outputFile," "); //add space if not at the last char
        }

        fs.appendFileSync(this._outputFile, "\n");
    }

    //finds 2 smallest trees in the array of trees
    //returns them and their indices in an array
    //index map: 0 - the smallest tree; 1 - index of the smallest tree; 2 - the second-smallest tree; 3 - index of the second-smallest tree
    #findSmallestTrees(trees)
    {
        let smallestTree1 = new HuffmanTree("Z", 1.1);          //tree bigger than possible
        let smallestTree2 = new HuffmanTree("Z", 1.1);          //tree bigger than possible
        let smallestIndex1 = 0;
        let smallestIndex2 = 0;
        let treesLength = trees.length;

        //find the smallest tree
        for (let i = 0; i < treesLength; i++)
        {
            if (trees[i].compareTo(smallestTree1) < 0) {
                smallestIndex2 = smallestIndex1;
                smallestIndex2 = smallestIndex1;
                smallestTree1 = trees[i];
                smallestIndex1 = i;
            }

            else if(trees[i].compareTo(smallestTree2) < 0 && trees[i].compareTo(smallestTree1) !== 0 )
            {
                smallestIndex2 = i;
                smallestTree2 = trees[i];
            }
        }

        //find the second-smallest tree (smallest tree whos index does not === smallestIndex1
        for (let i = 0; i < treesLength; i++)
        {
            if (trees[i].compareTo(smallestTree2) < 0 && i !== smallestIndex1)
            {
                smallestTree2 = trees[i];
                smallestIndex2 = i;
            }
        }


        let retA = new Array(4);
        retA[0] = smallestTree1;
        retA[1] = smallestTree2;
        retA[2] = smallestIndex1;
        retA[3] = smallestIndex2;

        return retA;
    }
}

module.exports = HuffmanEncoder;