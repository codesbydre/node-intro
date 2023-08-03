// ## **Step 3**

// Copy over your ***step2.js*** code to ***step3.js***.

// Add a feature where, on the command line, you can *optionally* provide an argument to output to a file instead of printing to the console. The argument should look like this: `--out output-filename.txt readfile-or-url`.

// Current features should still work the same.

// However, if --out follows your script name, it should take the next argument and use that as the path to write to.
//Example:

// $node step3.js --out new.txt one.txt
// $# no output, but new.txt contains contents of one.txt

// $node step3.js --out new.txt  http://google.com
// $# no output, but new.txt contains google's HTML

//Make sure you handle errors trying to write to the file
const fs = require("fs");
const axios = require("axios");

function cat(path, out) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    }
    handleOutput(data, out);
  });
}

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, out);
  } catch (err) {
    console.log(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

function handleOutput(content, out) {
  if (out) {
    fs.writeFile(out, content, "utf8", function (err) {
      if (err) {
        console.log(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(content);
  }
}

let path;
let out;
if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.startsWith("http://") || path.startsWith("https://")) {
  webCat(path, out);
} else {
  cat(path, out);
}

// const pathOrUrl = process.argv[2];

// if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
//   webCat(pathOrUrl);
// } else {
//   cat(pathOrUrl);
// }
