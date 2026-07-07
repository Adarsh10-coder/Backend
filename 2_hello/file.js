const fs = require("fs");

/*
    # sync
    fs.writeFileSync("./text.txt", "Hello world");

    # async
    fs.writeFile("./text.txt", "Hello world async", (err) => {});
*/

//todo #sync ---> it return result and if there any error it throw error
//todo #async ---> it expect we give it a callback function and it have error and result

/* 
    # sync
    const result = fs.readFileSync("./contacts.txt", "utf-8");
    console.log(result);

    # async
    fs.readFile("./contacts.txt", "utf-8", (err, result) => {
        if(err){
            console.log("Error", err);
        }
        else{
            console.log(result);
        }
    });
*/

//! other functions of fs
    fs.appendFileSync("./test.txt", `${Date.now()} Hey there\n`);
    fs.cpSync("./test.txt", "./copy.txt");
    fs.unlinkSync("./copy.txt");
    console.log(fs.statSync("./test.txt"));

