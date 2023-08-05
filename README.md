# Genetic Transportation of Products

This is personal project to solve the problem of loading multiple products in a truck using genetic algorithms. 

Demo: https://mikhail-konstantinou.github.io/genetic-products-transportation/

## Problem description

Let's assume that a company has a truck that can ship goods. Each product that is loaded into the truck has a different potential profit whereas other products take up more space than others. The question is: how can we ensure that the truck is loaded with products that maximize the profit? In other words, which products shall the company load in the truck to get the maximum profit? 

The number of possible solutions for this problem are... over a million! For only 10 products, there are about 39.916.800 possible combinations! It is quite exhaustive to iterate all possible combinations and choose the best combination. What if we want to add more products in the future? Every complication will only increase the number of possible solutions.

In this project, we used genetic algorithms which seems to be a perfect fit for this kind of problems! 

## Implementation

The project has been implemented using the following:

- Bulma CSS framework
- Alpine.js
- Typescript

## Installation

It does not require any particular installation. You only need to open the file `index.html`. If you would like to build the source code though, you need to run the following command:

```
npm install
```

## Special thanks

This project is inspired by the course [The Ultimate Beginners Guide to Genetic Algorithms in Python](https://www.udemy.com/course/the-ultimate-beginners-guide-to-genetic-algorithms-in-python/). The problem of loading products in a truck with a genetic algorithms solutions is inspired by this course, although the implementation is totally different and the problem is modified to support multiple quantities of a product. 