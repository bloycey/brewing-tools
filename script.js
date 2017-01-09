

/* jshint browser: true */



/* /ABV CALCULATOR APP /

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
    sweetAlert('Please set your Starting Gravity');
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
    sweetAlert("Maximum 10 Hops Allowed");
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
    sweetAlert("You must leave at least 1 hop addition!");
    sweetAlert("You must leave at least 1 hop addition!");
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
    

/*document.getElementById("ibu-calculator").reset();*/
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
var z;
var originalCount;
var fillerBar = document.querySelector(".filler");
var firstHops;
var secondHops;
var thirdHops = "";
var fourthHops = "";
var fifthHops = "";
var sixthHops = "";
var seventhHops = "";
var eighthHops = "";
var ninthHops = "";
var tenthHops = "";
var firstHopsSeconds;
var secondHopsSeconds;
var thirdHopsSeconds;
var numberOfAdditions = 2;


function setTimer() {
//originalCount = document.getElementById("set-timer").value;
    
firstHops = parseInt(document.getElementById("hopmins1").value) * 60;  
secondHops = parseInt(document.getElementById("hopmins2").value) * 60;  
thirdHops = parseInt(document.getElementById("hopmins3").value) * 60; 
fourthHops = parseInt(document.getElementById("hopmins4").value) * 60;
fifthHops = parseInt(document.getElementById("hopmins5").value) * 60;
sixthHops = parseInt(document.getElementById("hopmins6").value) * 60;
seventhHops = parseInt(document.getElementById("hopmins7").value) * 60;
eighthHops = parseInt(document.getElementById("hopmins8").value) * 60;
ninthHops = parseInt(document.getElementById("hopmins9").value) * 60;
tenthHops = parseInt(document.getElementById("hopmins10").value) * 60;
    
firstHopsSeconds = parseInt(document.getElementById("hopmins1").value) * 60;
secondHopsSeconds = parseInt(document.getElementById("hopmins2").value) * 60;
thirdHopsSeconds = parseInt(document.getElementById("hopmins3").value) * 60;
    
i = firstHops; 
}

// PASS THIS FUNCTION SOMETHING...



document.getElementById("timer-start").addEventListener('click',function(){
    document.getElementById("timer-stop").style.display = "block";
    document.getElementById("timer-start").style.display = "none";
});

document.getElementById("timer-stop").addEventListener('click',function(){
    document.getElementById("timer-start").style.display = "block";
    document.getElementById("timer-stop").style.display = "none";
});


/*
$( "#timer-start" ).click(function() {
$( "#timer-stop" ).show();
$( "#timer-start" ).hide();    
});

$( "#timer-stop" ).click(function() {
$( "#timer-start" ).show();
$( "#timer-stop" ).hide();
});

*/



function countDown(currentTime, timeUntilNextAddition) {


document.getElementById("timer-stop").addEventListener('click',function(){
    console.log("Stop clicked");
    window.location.reload();
});
    
    console.log(currentTime);
    currentTime--;
    var audio = new Audio('css/audio/Seinfeld.mp3');
    audio.preload = "auto";
    audio.loop = true;
    var x = (currentTime / 60).toFixed(0);
    
    if (x >= 1) {
      document.getElementById("timer").innerHTML = "~ " + x + " minutes left";   
    } else {
      document.getElementById("timer").innerHTML = "Less than 1 minute left!";  
    };
   
    
   if (currentTime == firstHops -1) {    
    audio.play();
    sweetAlert({
        title: "Begin Boil",
        text: "Begin your boil and add your first hop addition now!"
    }, function () {
        audio.pause();
        setTimeout(function() {
            countDown(currentTime, timeUntilNextAddition);
        },1000)});
        
    } else if (currentTime > timeUntilNextAddition) {
        setTimeout(function() {
            countDown(currentTime, timeUntilNextAddition);
        },1000);
    
    
    } else if (currentTime == secondHops) {
        audio.play();
        sweetAlert({
            title: "Second Hops",
            text: "Add your second hop addition now!"
        }, function () {
            document.querySelector(".icon-2").style.display = "initial";
            audio.pause();
            setTimeout(function() {
            countDown(secondHops, thirdHops);
        },1000)});
          
    
    } else if (currentTime == thirdHops) {
        audio.play();
        sweetAlert({
            title: "Third Hops",
            text: "Add your third hop addition now!"
        }, function () {
        document.querySelector(".icon-3").style.display = "initial";
          audio.pause();
          setTimeout(function() {
            countDown(thirdHops, fourthHops);
        },1000)});
         
    
    } else if (currentTime == fourthHops) {
        audio.play();
        sweetAlert({
            title: "Fourth Hops",
            text: "Add your fourth hop addition now!"
        }, function () {
        document.querySelector(".icon-4").style.display = "initial";
        audio.pause();
         setTimeout(function() {
            countDown(fourthHops, fifthHops);
        },1000)});
            
        
     } else if (currentTime == fifthHops) {
        audio.play();
         sweetAlert({
            title: "Fifth Hops",
            text: "Add your fifth hop addition now!"
        }, function () {
             document.querySelector(".icon-5").style.display = "initial";
            audio.pause();
           setTimeout(function() {
            countDown(fifthHops, sixthHops);
        },1000)});
       
     
     } else if (currentTime == sixthHops) {
         audio.play();
         sweetAlert({
            title: "Sixth Hops",
            text: "Add your sixth hop addition now!"
        }, function () {
        document.querySelector(".icon-6").style.display = "initial";
        audio.pause();
          setTimeout(function() {
            countDown(sixthHops, seventhHops);
        },1000)});
       
    } else if (currentTime == seventhHops) {
        audio.play();
        sweetAlert({
            title: "Seventh Hops",
            text: "Add your seventh hop addition now!"
        }, function () {
        document.querySelector(".icon-7").style.display = "initial";
        audio.pause();
         setTimeout(function() {
            countDown(seventhHops, eighthHops);
        },1000)});
        
    } else if (currentTime == eighthHops) {
        audio.play();
        sweetAlert({
            title: "Eighth Hops",
            text: "Add your eighth hop addition now!"
        }, function () {
            document.querySelector(".icon-8").style.display = "initial";
            audio.pause();
          setTimeout(function() {
            countDown(eighthHops, ninthHops);
        },1000)});
       
      } else if (currentTime == ninthHops) {
        audio.play();
          sweetAlert({
            title: "Ninth Hops",
            text: "Add your ninth hop addition now!"
        }, function () {
        document.querySelector(".icon-9").style.display = "initial";
        audio.pause();
         setTimeout(function() {
            countDown(ninthHops, tenthHops);
        },1000)});
       
      } else if (currentTime == tenthHops) {
        audio.play();
          sweetAlert({
            title: "Tenth Hops",
            text: "Add your tenth hop addition now!"
        }, function () {
        document.querySelector(".icon-10").style.display = "initial";
        audio.pause();
           setTimeout(function() {
            countDown(tenthHops, 0);
        },1000)});
         
    } else if (currentTime == 0) {
        audio.play();
        sweetAlert({
            title: "Boil Completed",
            text: "Your boil is done. You're one step closer to beer. :)"
        }, function () {
         audio.pause();
        document.getElementById("timer").innerHTML = "Boil Completed";
        document.getElementById("timer-stop").style.display = "none";
        document.getElementById("timer-start").style.display = "block";
        });
    } else {
        setTimeout(function() {
            countDown(currentTime, 0);
        },1000);
    }
};



function addAddition() {
    
    // Need to create these variables.
    if(numberOfAdditions < 10) {
        
    numberOfAdditions++;
    
    //document.getElementById("addition" + numberOfAdditions).reset();
    //document.querySelector(".ibus-contributed" + numberOfHops).innerHTML = "";
    document.getElementById("addition" + numberOfAdditions).style.display = "block";   

} else {
    sweetAlert("Maximum 10 Hop Additions Allowed");
}
    
};

function removeAddition() {
    
    if(numberOfAdditions > 2) {
    document.getElementById("hopmins" + numberOfAdditions).value ="";
    document.getElementById("addition" + numberOfAdditions).style.display = "none";
    //document.getElementById("addition" + numberOfAdditions).innerHTML = "";
    numberOfAdditions--;
    
    } else {
    sweetAlert("You must leave at least 2 hop additions!");
    }
    
}





/************ TO ADD *****************/

// Add tick box after 'ok' popup next to hop addition row.
// Stylize. 














        
    

    
        
    









































































