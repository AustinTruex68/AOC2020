const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'seats.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) =>{
    const seats = data.split("\n");
    let highest = 0;
    for(let i = 0; i < seats.length; i++){
       let seat = seats[i]
       const rowCheck = seatCheck(seat, [0, 127], 0);
       const colCheck = seatLocCheck(seat, [0, 7], 7)
       
       const sId = ((rowCheck * 8) + colCheck);
       if(sId > highest)
         highest = sId;
    }

    function seatLocCheck(seat, range, idx){
      let r = range;
      if(idx == 10)
        return range[0];
      else
        r = narrowSeat(seat[idx], range)
      idx++;
      return seatLocCheck(seat, r, idx)
    }

    function seatCheck(seat, range, idx){
        let r = range;
        if(idx == 8)
          return range[0];
        else
          r = narrowSeat(seat[idx], range)
        idx++;
        return seatCheck(seat, r, idx)
    }

    function narrowSeat(lH, range){
      if(lH === "F" || lH === "L")
        return [range[0], Math.floor(range[1] - ((range[1] - range[0]) /2))];
      else if(lH === "B" || lH === "R")
        return [Math.ceil(range[1] - ((range[1] - range[0]) /2)), range[1]]
    }

    console.log(highest);
});