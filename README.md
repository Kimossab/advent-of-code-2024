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
Day 1: Part 1 (3246517) | Part 2 (29379307) | 13.143699999999995ms
Day 2: Part 1 (341) | Part 2 (404) | 2.283900000000017ms
Day 3: Part 1 (190604937) | Part 2 (82857512) | 0.8140000000000214ms
Day 4: Part 1 (2530) | Part 2 (1921) | 31.859499999999997ms
Day 5: Part 1 (5091) | Part 2 (4681) | 2.550900000000013ms
Day 6: Part 1 (5242) | Part 2 (1424) | 633.5679ms
Day 7: Part 1 (2941973819040) | Part 2 (249943041417600) | 342.9969000000001ms
Day 8: Part 1 (280) | Part 2 (958) | 1.1818000000000666ms
Day 9: Part 1 (6323641412437) | Part 2 (6351801932670) | 166.7190999999998ms
Day 10: Part 1 (796) | Part 2 (1942) | 5.5991999999998825ms
Day 11: Part 1 (211306) | Part 2 (250783680217283) | 112.93600000000015ms
```
  </p>
</details>

<details>
  <summary>My personal stats</summary>
  <p>
  
```
      --------Part 1--------   --------Part 2--------
Day       Time   Rank  Score       Time   Rank  Score
 11   07:18:25  29390      0   07:56:53  20481      0
 10   07:33:58  24752      0   07:36:39  23656      0
  9   06:16:52  23270      0   06:54:31  15191      0
  8   09:37:27  31254      0   09:45:33  28647      0
  7   14:13:41  42341      0   14:21:58  39328      0
  6   06:32:22  33322      0   09:20:16  23555      0
  5   06:05:16  34291      0   06:13:50  26570      0
  4   14:13:46  63732      0   14:18:37  55912      0
  3   05:04:43  44205      0   05:32:23  36814      0
  2   05:38:48  44858      0   07:51:25  38422      0
  1   18:38:14  98006      0   18:41:29  91989      0
```
  </p>
</details>

###### Disclaimer: I'm only writing this so the code page is not completely empty, this makes it more pleasing even if it's completely useless otherwise. ~~not like anyone is reading this anyway, but if you are have a nice day~~
