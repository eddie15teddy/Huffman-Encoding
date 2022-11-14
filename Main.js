//-----------------------------------------
// NAME		: Eddie Butkaliuk
// STUDENT NUMBER	: 007910587
// COURSE		: COMP 2150
// INSTRUCTOR	: Ali Neshati
// ASSIGNMENT	: assignment #4
// QUESTION	: question #1
//
// REMARKS: This is the main class for this program.
//          This program takes a text files and encodes it using Huffman encoding.
//-----

let HuffmanEncoder = require("./HuffmanEncoder");
let encoder = new HuffmanEncoder("hamlet.txt");
encoder.encode();

