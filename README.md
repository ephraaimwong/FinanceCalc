# FinanceCalc -- The Money Bowl

OU CS3203 Software Engineering

## What is The Money Bowl??

The money bowl is a web-based tool to empower people of all backgrounds with the tools they need to take control over their financial matters.

Installation Instructions: Hop onto [The Money Bowl](https://ephraaimwong.github.io/FinanceCalc/Landing%20Page/) and get started today!

Compiler: [Visual Studio Code](https://code.visualstudio.com/download)

Optional (but useful git version control tool): [GitHub Desktop](https://desktop.github.com/download/)

Languages: HTML5, CSS3, JavaScript ES2023

Unit Testing: Node, NPM, Jest

Libraries: [Chart.js](https://cdn.jsdelivr.net/npm/chart.js), [FileSaver.js](https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js), [Sheet.js](https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/xlsx.full.min.js), DOM-Purify

### Contents

1) [Landing Page](https://ephraaimwong.github.io/FinanceCalc/Landing%20Page/index.html)

   Contributor(s): Ephraim, Daniel, Nthati

   Home that acts as an introduction as well as main navigation page to between the several calculators. GUI logic allows clickable buttons that direct users to the labelled calculator of choice.
2) [Arithmetic Calculator](https://ephraaimwong.github.io/FinanceCalc/Basic%20Calc/basicCalc2.html)

   Contributor(s): Ephraim

   Calculator App employing Shunting Yard alogorithm that ensures PEMDAS in calculations. The calculator is represented by means of traditional labelled buttons with equation display and result display fields. User can also use their keyboards as I/O device to directly enter or copy their equations into the equation display field.
3) [Simple Interest Calculator](https://ephraaimwong.github.io/FinanceCalc/Simple%20Interest/simpleInterestCalc.html)

   Contributor(s): Daniel, Nthati

   User-Friendly tool which takes in principal, interest rate and term, generating break down of interest in a schedule.
   This tool helps stuff like Auto Loans, Personal Loans, etc...
4) [Compound Interest Calculator](https://ephraaimwong.github.io/FinanceCalc/CompoundInterest/compoundInCalc4.html) 

   Contributor(s): Jarett, Ephraim

   User-Friendly tool which generates a breakdown schedule of compounded interest.
   This tool helps retirement planning, investment, stocks/bonds, fixed deposits, etc...
5) [Amortized Interest Schedule](https://ephraaimwong.github.io/FinanceCalc/Amort%20Interest/amortizationSchedule.html)

   Contributor(s): Ephraim

   User-Friendly tool that generates loan payments and breakdown between principal and interest as per using [Amortization Formula](https://www.highradius.com/resources/Blog/amortization-schedule-formula/).
   This tool helps mortgage loans, giving users a detailed breakdown of monthly payments, loan summary and useful graph to clearly illustrate the payment of principal v. interest over time.
6) Contact Support

   Contributor(s): Javid

   User-Friendly contact page for users to submit suggestions and feedback for continued development of the product.

Future Development Ideas:

1) Re-Finance Interest Comparison
2) Adjusted Monetary Value of Loan vs Inflation
3) Investment Calculations
4) Retirement Fund (25*yearly expenses, 4% rule)
5) Budgeting Tools

Contribution Guidelines:

1. Communicate which feature you will be working on via [discord](https://discord.gg/2tQTmb4dsb).
2. Clone local copy of .main branch via

   Option 1: CLI `ssh git clone <git@github.com:ephraaimwong/FinanceCalc.git>`

   Option 2: [Github Desktop](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop)
3. Establish a new branch for your feature via

   Option 1: CLI

   ```
   git branch <branch-name>
   git checkout <branch-name>
   ```

   or `git checkout -b <branch-name>` for a shorthand branch and switch.

   Option 2: [Github Desktop](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop)

   Follow the instructions of the guide
4. Periodically fetch updated .main into your feature branch to stay up to date on latest commits.
5. Ensure that you provide updates to the team periodically.
6. Create Jest unit tests in each specific feature directory.

   1. Download [Node(v20.18.0) and NPM(10.8.2)](https://nodejs.org/en/download/prebuilt-installer)
   2. Check that Node and npm is properly installed:

      ```
      node -v
      //should show v20.18.0
      npm -v
      //should show 10.8.2
      ```
   3. Move to directory in local machine containing feature `cd <featureName>`
   4. Create package.json (`npm init -y` creates default template)
   5. Install Jest as development dependency `npm i --save-dev jest`
   6. Configure Jest for jsdom environment (our program is browser not node based). package.json should look similar to this:

      ```
       {
        "name": "financecalc",
        "version": "1.0.0",
        "description": "OU CS3203 Software Engineering",
        "main": "index.js",
        "scripts": {
          "test": "jest" //change to jest from whatever
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
      /* this segment configures jsdom environment
        "devDependencies": {
          "jest": "^29.7.0",
          "jest-environment-jsdom": "^29.7.0"
        },
        "jest": {
          "testEnvironment": "jest-environment-jsdom"
        }
      }
      */
      ```
   7. Create a mirror test file `<fileName>.test.js` where all units tests will be coded in.
   8. run tests `npm test`!
   9. Recommended tutorials to start Jest unit testing:

      Brief
      [![alt text](https://img.youtube.com/vi/FgnxcUQ5vho/0.jpg)](https://www.youtube.com/watch?v=FgnxcUQ5vho)

      Detailed
      [![alt text](https://img.youtube.com/vi/zuKbR4Q428o/0.jpg)](https://www.youtube.com/watch?v=zuKbR4Q428o)
7. Start working.
   Communicate Communicate Communicate...

License Information:
Copyright 2024 Ephraim W.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Contact Information:
