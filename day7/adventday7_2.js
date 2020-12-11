const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'bagrules.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    // bag
    // {
    //     id: 0,
    //     name: 'plaid beige',
    //     contains: [2, 5],
    //     containedIn: [3, 9]
    // }
    const rawBags = data.split("\n");
    const bName = new RegExp(/.+?(?= bag)/, 'g');
    const re = new RegExp(/([0-9]+)(.*?)(bag)/, 'g');
    const re2 = new RegExp(/\ (.*)/, 'g')
    const numRe = new RegExp(/([0-9]+)/, 'g')
    const filledBags = buildBags();
    const answer = findComboCount(findBagId("shiny gold"));
    console.log(answer);

    function findBagId(name){
        let idOf = filledBags.map(e => e.name).indexOf(name);
        return idOf;
    }

    function findComboCount(bId){
        let toFind = filledBags[bId];
        let unique = toFind.contains;
        let idsCounted = [];
        for(let i = 0; i < unique.length; i++){
            idsCounted.push(unique[i])
            checkConnecting(unique[i], idsCounted);
        }

        return idsCounted.length;
    }

    function checkConnecting(bId, idsCounted){
        let connecting = filledBags[bId];
        let unique = connecting.contains;
        for(let i =0; i < unique.length; i++){
            idsCounted.push(unique[i])
            checkConnecting(unique[i], idsCounted);
        }

        return idsCounted;
    }

    function buildBags() {
        let bags = [];
        // assign all ids
        for (let i = 0; i < rawBags.length; i++) {
            bags.push({
                id: i,
                name: rawBags[i].match(bName)[0],
                contains: [],
                containedIn: []
            })
        }

        for (let i = 0; i < rawBags.length; i++) {
            let id = i;
            let bagSplit = rawBags[i].match(re);
            if(!bagSplit){
                bags[i].contains = [];
                continue;
            }
            for (let x = 0; x < bagSplit.length; x++) {
                let bN = bagSplit[x].match(bName)[0].match(re2)[0].trim();
                let num = Number(bagSplit[x].match(bName)[0].match(numRe)[0]);
                const idOf = bags.map(e => e.name).indexOf(bN);
                for(let k = 0; k < num; k++){
                    bags[id].contains.push(idOf);
                    bags[idOf].containedIn.push(id);
                }
            }
        }
        return bags;
    }

});