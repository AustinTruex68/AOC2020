const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'passports.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    const pp = data.split("\n\n");
    let answer = 0;

    for (let i = 0; i < pp.length; i++) {
        let pItem = pp[i].replace(/(\r\n|\n|\r)/gm, " ").split(" ");
        let validItemCnt = 0;
        for (let y = 0; y < pItem.length; y++) {
            let l = pItem[y].split(":");
            let isValidItem = false;
            if(l[0] !== "cid")
              isValidItem = validate(l[0], l[1]);

            if (isValidItem)
                validItemCnt += 1;
        }

        if (validItemCnt == 7)
            answer += 1;

    }

    function validate(info, val) {
        let validItem = false;
        switch (info) {
            case "byr":
                if (val.length != 4 || isNaN(val))
                    return false;
                if (Number(val) < 1920 || Number(val) > 2002)
                    return false;
                return true;

            case "iyr":
                if (val.length != 4 || isNaN(val))
                    return false;
                if (Number(val) < 2010 || Number(val) > 2020)
                    return false;
                return true;

            case "eyr":
                if (val.length != 4 || isNaN(val))
                    return false;
                if (Number(val) < 2020 || Number(val) > 2030)
                    return false;
                return true;

            case "hgt":
                if (val.indexOf("cm") > -1) {
                    if (Number(val.slice(0, -2)) >= 150 && Number(val.slice(0, -2)) <= 193)
                        return true;
                } else {
                if (Number(val.slice(0, -2)) >= 59 && Number(val.slice(0, -2)) <= 76)
                    return true;
                }

                return false;

            case "hcl":
                if (val.charAt(0) !== "#")
                    return false;
                if (val.length != 7)
                    return false;
                let v = val.slice(0, 1);
                for (let y = 1; y < v.length; y++)
                    if (v[y] != "0" &&
                        v[y] != "1" &&
                        v[y] != "2" &&
                        v[y] != "3" &&
                        v[y] != "4" &&
                        v[y] != "5" &&
                        v[y] != "6" &&
                        v[y] != "7" &&
                        v[y] != "8" &&
                        v[y] != "9" &&
                        v[y] != "a" &&
                        v[y] != "b" &&
                        v[y] != "c" &&
                        v[y] != "d" &&
                        v[y] != "e" &&
                        v[y] != "f")
                        return false;

                return true;

            case "ecl":
                if (val !== "amb" &&
                    val !== "blu" &&
                    val !== "brn" &&
                    val !== "gry" &&
                    val !== "grn" &&
                    val !== "hzl" &&
                    val !== "oth")
                    return false;

                return true;

            case "pid":
                if (isNaN(val) || val.length !== 9)
                    return false;
                return true;

            default:
                return true;

        }
    }

    console.log(answer);

});