# advent-of-code-~~2021 2022 2023~~ 2024
My stupid solutions to the AoC of ~~2021 2022 2023~~ 2024

These are all my solutions for the AoC of ~~2021 2022 2023~~ 2024 in typescript

## How to run
If you want to run this (I don't know why you would, there's better solutions out there) you can follow the same way as every other TS project ever:

Note: needless to say, but I'll say it anyway, you need [Node.js LTS](https://nodejs.org/en/)

Install packages:
```
npm i
```

To run development locally (will auto restart the program on file updates):
```
npm run dev
```

This was made using VS Code so all instructions are for VS Code in specific. With that said.  
To debug you need to attach a debugger to the terminal and run the follow command.
```
npm run dev:inspect
```
Note: This does not refresh when you chance a file, so you need to restart this process when you make changes.  

In VS Code you can alternatively use the "Debug" configuration in the "Run and Debug" panel of VS Code. It'll automatically start the terminal in debug mode and run this command and attach the debugger.

Tests were made using the built-in test runners of node.
```
npm run test
```

Similarly to the dev if you want to debug tests you can run
```
npm run test:inspect
```

You can also use the "Debug test"  configuration. This will run just the tests for the file you're on. For example, open the `day1.ts` file and run that configuration and it'll try to run the `day1.test.ts` file.

The only other thing to note is that if you want to download the input of your puzzles automatically you need to create a `.env` and add your session id and the year of the puzzle (obviously it's 2024, no other year will give you correct results, but this saves me trouble for next year). Just like in the `.env.example`  
If you don't want to set this up, look in the cache section that coincidentally is the next one.

The session id value you can find if you open dev tools in the advent of code website, go to the cookies section and find the value for the `session` cookie. Copy it and paste it in the `.env` file and you're good to go.

### Cache

The cache folder is where all the inputs live, if you set up the `.env` file like explained above you don't need to worry, they'll be downloaded to this folder. If you don't want to do that, you can download the inputs from the puzzle and save it as a `txt` file with the number of the day as the file name (example: `1.txt` for the day 1 puzzle input).

### For the record:
<details open>
  <summary>All the puzzle results</summary>
  <p>
    
```
Day 1: Part 1 (3246517) | Part 2 (29379307) | 13.38130000000001ms
Day 2: Part 1 (341) | Part 2 (404) | 1.950400000000002ms
```
  </p>
</details>

<details>
  <summary>My personal stats</summary>
  <p>
  
```
      --------Part 1--------   --------Part 2--------
Day       Time   Rank  Score       Time   Rank  Score
  2   05:38:48  44858      0   07:51:25  38422      0
  1   18:38:14  98006      0   18:41:29  91989      0
```
  </p>
</details>

###### Disclaimer: I'm only writing this so the code page is not completely empty, this makes it more pleasing even if it's completely useless otherwise. ~~not like anyone is reading this anyway, but if you are have a nice day~~
