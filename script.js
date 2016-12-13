

/* jshint browser: true */



/* /ABV CALCULATOR APP - CHANGE 7 /

// Brewing calculator.

var startingGravity = prompt('What is your starting gravity?');

var finalGravity = prompt('What is your final gravity?');

var abv = (startingGravity - finalGravity) * 131.25;

alert('Your ABV is approximately ' + abv.toFixed(2) + '%');

*/

var startingGravity;
var finalGravity;
var abv;

function calcGrav() {
    startingGravity = document.getElementById("starting-grav").value;
    finalGravity = document.getElementById("final-grav").value;
    abv = (startingGravity - finalGravity) * 131.25;
    document.querySelector(".grav-result").innerHTML = "Your ABV is approximately " + abv.toFixed(2) + "%";  
}


/* IBU CALCULATOR*/ 

/*var batchSize = 19;

var grams = [35, 15, 10, 5];
var percentAa = [10, 12, 7, 5];
var minsBoil = [60, 20, 10, 0];
var utilisation =[];
var ibus = [];*/


var batchSize = 19;
var numberOfHops = 1;

var grams = [];
var percentAa = [];
var minsBoil = [];
var utilisation =[];
var ibus = [];
var ga;



function getIbuData() {
 

//First check if the Starting Gravity has been filled out. If so, get the Gravity Adjustment (ga), otherwise prompt them to fill it out.
    
if ((document.getElementById("sg").value) == false) {
    alert('Please set your Starting Gravity');
    return;
} else {
 ga = ((document.getElementById("sg").value) - 1.050) / 0.2;   
}     
    
// Now let's get the rest of the data from the DOM.
 for(i=1; i <= numberOfHops; i++) {
    grams[i] = document.getElementById("grams" + i).value;  
    percentAa[i] = document.getElementById("aa" + i).value;  
    minsBoil[i] = document.getElementById("minsboil" + i).value;
 };
      

    //If there's something there (or if there's NOT nothing there), grab it.
    
    if((document.getElementById("batch").value) != false) {
    batchSize = document.getElementById("batch").value;
}
    
// Now we can use the data to calc the Utilisation.
    utilisation = minsBoil.map(utilCalc);
    
    // Next we can work out the individual IBUs contributed.
    for (var i = 1; i <= grams.length - 1; i++) {
    ibus[i] = (utilisation[i] * ((percentAa[i] / 100) * (grams[i] * 0.035274) * 7462) / (batchSize / 3.7854) * (1 + ga)).toFixed(2)/1;
};
    // This calculates the Total IBUs.
    var totalIbu = ibus.reduce(function(a, b){return a+b;})
    
    //Display and check all data
    
    console.log(grams);
    console.log(percentAa);
    console.log(minsBoil);
    console.log(utilisation);
    console.log(ibus);
    console.log('The total IBU for this beer is ' + totalIbu);
    
for (var i = 1; i <= numberOfHops; i++) {
 
    document.querySelector(".ibus-contributed" + i).innerHTML = ibus[i];   
    
};
    
document.querySelector(".ibu-total").innerHTML = "TOTAL IBU: " + totalIbu.toFixed(2); 
    
    for (var i = 1; i <= numberOfHops; i++) {
 console.log('Hop addition ' + (i) + ' contributes ' + ibus[i] + ' IBU.'); 
        };
    
    hopSummarys();
    
};


function hopSummarys() {
    for (var i = 1; i <= numberOfHops; i++) {
        console.log('Hop addition ' + (i) + ' is ' + grams[i] + ' grams of ' + percentAa[i] + '%AA hops, added at ' + minsBoil[i] + ' minutes.'); 
    }
}

// Pulled from this chart: http://www.straighttothepint.com/ibu-calculator/ 

function utilCalc(Boil) {
if (Boil == 0) {
    return 0;
}    
else if (Boil <= (5)) {
   return 0.05;
} else if (Boil > (5) && Boil <= 10) {
    return 0.06;
} else if (Boil > (10) && Boil <= 15) {
    return 0.08;
} else if (Boil > (15) && Boil <= 20) {
    return 0.101;
} else if (Boil > (20) && Boil <= 25) {
    return 0.121;
} else if (Boil > (25) && Boil <= 30) {
    return 0.153;
 } else if (Boil > (30) && Boil <= 35) {
    return 0.188;
 } else if (Boil > (35) && Boil <= 40) {
    return 0.228;
 } else if (Boil > (40) && Boil <= 45) {
    return 0.269;
 } else if (Boil > (45) && Boil <= 50) {
    return 0.281;    
} else if (Boil > (50)) {
    return 0.30;
}
};


function addHops() {
    
    if(numberOfHops < 10) {
        
    numberOfHops++;
    
    document.getElementById("hop" + numberOfHops).reset();
    document.querySelector(".ibus-contributed" + numberOfHops).innerHTML = "";
    document.getElementById("hop" + numberOfHops).style.display = "block";   

} else {
    alert("Maximum 10 Hops Allowed");
}
    
};

function removeHops() {
    
    if(numberOfHops > 1) {
    document.getElementById("hop" + numberOfHops).reset();
    document.getElementById("hop" + numberOfHops).style.display = "none";
    grams[numberOfHops] = 0;
    percentAa[numberOfHops] = 0;
    minsBoil[numberOfHops] = 0;
    numberOfHops--;
    
    } else {
    alert("You must leave at least 1 hop addition!");
    }
    
}

function reset() {

batchSize = 19;
numberOfHops = 1;
ga = undefined;

//This is a neat way of clearing the arrays. 
grams.length= 0;
percentAa.length = 0;
minsBoil.length = 0;
utilisation.length = 0;
ibus.length = 0;
    

document.getElementById("ibu-calculator").reset();
document.getElementById("batch").value = "";
document.getElementById("sg").value = "";
document.querySelector(".ibus-contributed1").innerHTML = "";
document.querySelector(".ibu-total").innerHTML = "";

    
document.getElementById("hop2").style.display = "none";  
document.getElementById("hop3").style.display = "none";  
document.getElementById("hop4").style.display = "none";  
document.getElementById("hop5").style.display = "none";  
document.getElementById("hop6").style.display = "none";  
document.getElementById("hop7").style.display = "none";
document.getElementById("hop8").style.display = "none";
document.getElementById("hop9").style.display = "none";
document.getElementById("hop10").style.display = "none";


};



/************ TO ADD *****************/

/*
Consider moving to Rager formula which adjusts for higher gravity beers. 

IBU = (OUNCES OF HOPS * %UTILIZATION * %ALPHA * 7462) / (Batch Volume* (1 + GA))
GA = (Boil Gravity - 1.050) / 0.2 //GRAVITY ADJUSTMENT

^^^DONE

Would need to update Utilisation table too.
Would need to add form space for Original Gravity. 
*/




/* TIMER */


var i;
var originalCount;
var fillerBar = document.querySelector(".filler");


function setTimer() {
originalCount = document.getElementById("set-timer").value;
i = originalCount; 
}


function countDown() {
    document.getElementById("timer").innerHTML = i;
    i--;
    fillerBar.style.height = ((i / originalCount)* 100) + "%"; 
    if(i > 0){
        setTimeout(countDown, 1000);
    } else if (i=1){
      document.getElementById("timer").innerHTML = "Time is up!";  
    }    
            
        };


/************ TO ADD *****************/
/*
function countDown() {
    document.getElementById("timer").innerHTML = i;
    i--;
    fillerBar.style.height = ((i / originalCount)* 100) + "%"; 
    if(i > 0){
        setTimeout(countDown, 1000);
    } else if (i=1){
      document.getElementById("timer").innerHTML = "Time is up!";  
    }    
            
        };
*/
/*


// Set Total timer duration.
//Add reset button.
//Add sound at completion.
//Need to convert to minutes.
//Need to chain timers together.


*/




/*if (i == 5) {
    document.querySelector(".filler").
}*/












        
    

    
        
    









































































