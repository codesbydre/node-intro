// ## **Step 1**

// In ***step1.js***, write a function, ***cat***.

// It should take one argument, ***path***, and it should read the file with that path, and print the contents of that file.

// Then, write some code that calls that function, allowing you to specify the path argument via the command line.
// If you give it the path of a non-existent file, it should print that error and halt the script execution
const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.kill(1);
    }
    console.log(data);
  });
}

const path = process.argv[2];

cat(path);
