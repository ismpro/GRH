const fs = require("fs");

let text = fs.readFileSync("./bot.txt").toString();

let texts = text.split(";%#\r\n")

let output = [];

let i = 0;
let iForm = 1;

for (const text of texts) {
    let arr = text.split("\r\n").filter(t=> t)

    let str = `<div style="margin-top: 50px;">
                    <div class="row">
                        <div class="col">
                            <p>${++i}. ${arr.shift()}</p>
                        </div>
                    </div>
                <div class="row">\n`;

    for (const tt of arr) {
        str += `<div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="question-${i}" id="formCheck-${++iForm}">
                        <label class="form-check-label" for="formCheck-${iForm}">${tt}</label>
                    </div>
                </div>\n`
    }

    str += `</div>
    </div>`;

    output.push(str)

}

console.log(output.join("\r\n"))