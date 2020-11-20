function clearActivity(){
// This is called at the beginning of the roll, to clear out any previous text!
  $("#errortext1").text("");
  $("#p1-flavor1").text("");
  $("#p1-result1").text("");
  $("#p1-comp1").text("");
  $("#topsplit1").text("");
  $("#p2-flavor1").text("");
  $("#p2-result1").text("");
  $("#p2-comp1").text("");
  $("#bottomsplit1").text("");
  $("#p3-flavor1").text("");
  $("#p3-result1").text("");
  $("#p3-comp1").text("");
}

// This is a boolean that checks if everything is copacetic. At the beginning of the roll, this is set to "true".
// If at any point something is entered incorrectly, this switches to "false".
allCorrect = new Boolean;

$(document).ready(function(){
  // This is the button function. Once this is pressed, it generates the roll.
$("#randomizer").click(function(){

// This reads the 'Participants' radio button values to see how many 'players' are participating in the activity.
// There is a maximum of 3 players in this roller, and they all get results on the same roll.
  $playNum = $("input[type='radio'][name='participants']:checked").val();
  $ActivityGo = 1;

// In theory this could be used to dynamically determine how many 'plays' are in each roll.
// However, since I'm lazy, I have all three plays going on the same roll, hence the $ActivityGo only running once.
  if($playNum === "1"){
        $ActivityGo = 1;
      }
  if($playNum === "2"){
        $ActivityGo = 1;
      }
  if($playNum === "3"){
        $ActivityGo = 1;
      }

// This calls the calculations function based on how many $ActivityGo numbers there are. However, as mentioned earlier,
// I am lazy and there is only one $ActivityGo for all three players, so it only calls once. In theory, though, it is possible
// to set up the code so that it calculates each 'player' individually.
    calculations($ActivityGo);
  });
});

// This uses the same principle as the $playnum variable from above. However, it bypasses using a variable and  pulls its info directly from
// the individual buttons themselves. Depending on the number selected, this will hide or show the appropriate number of 'player' input fields.
// If a number of players lower than the current number is clicked (ex. going from 3 players, down to 1) then the two unused 'player' input fields will reset.
function partyCheck(){
  if(document.getElementById('part3').checked){
      document.getElementById('player2').style.display = 'block';
      document.getElementById('player3').style.display = 'block';
  }
   if(document.getElementById('part2').checked){
       document.getElementById('player2').style.display = 'block';
       document.getElementById('player3').style.display = 'none';
       document.getElementById('p3').value="";
       document.getElementById('p3-aspect').value=0;
       document.getElementById('p3-breed').value=0;
       document.getElementById('p3-rank').value=0;
   }
   if(document.getElementById('part1').checked){
       document.getElementById('player2').style.display = 'none';
       document.getElementById('p2').value="";
       document.getElementById('p2-aspect').value=0;
       document.getElementById('p2-breed').value=0;
       document.getElementById('p2-rank').value=0;
       document.getElementById('player3').style.display = 'none';
       document.getElementById('p3').value="";
       document.getElementById('p3-aspect').value=0;
       document.getElementById('p3-breed').value=0;
       document.getElementById('p3-rank').value=0;
   }
}

// This is similar to the partyCheck() in that it reads info from the radio buttons that determine the type of activity.
// This function will switch between hiding/showing which Companion checkbox is available based on the activity selected.
// On top of that, if a new activity button is clicked, the companion checkbox for the other activity automatically unchecks.
function comCheck(){
  if(document.getElementById('Hunting').checked){
      document.getElementById('huntCompanion').style.display = 'block';
      document.getElementById('scavCompanion').style.display = 'none';
      document.getElementById('scavCom').checked = false;
  }
   if(document.getElementById('Scavenging').checked){
     document.getElementById('huntCompanion').style.display = 'none';
     document.getElementById('huntCom').checked = false;
     document.getElementById('scavCompanion').style.display = 'block';
   }
}

// This is the Big Boy. Everything in this function is what makes the roller tick.
function calculations($ActivityGo){
  clearActivity();
  allCorrect = true;

// All these variables/objects retrieve data from the page's form inputs. The data that they get changes depending on what you
// assign for it to read. For example, 'val()' will read the input's assigned value, while 'text()' will read the input's text.
// An input's value does not neccesarily match the text, as I will explain later.
  $activity = $("input[type='radio'][name='activity']:checked").val();
  $biome = $("#biome").find(":selected").val();
  $P1Name = $("#p1").val();
  $P2Name = $("#p2").val();
  $P3Name = $("#p3").val();
  $P1Breed = $("#p1-breed").find(":selected").val();
  $P2Breed = $("#p2-breed").find(":selected").val();
  $P3Breed = $("#p3-breed").find(":selected").val();
  $P1Aspect = $("#p1-aspect").find(":selected").text();
  $P2Aspect = $("#p2-aspect").find(":selected").text();
  $P3Aspect = $("#p3-aspect").find(":selected").text();
  $P1Rank = $("#p1-rank").find(":selected").val();
  $P2Rank = $("#p2-rank").find(":selected").val();
  $P3Rank = $("#p3-rank").find(":selected").val();

// These variables are empty, and will be filled/used later in the code. They will be used for the flavor and result text for each player in the roll
// as well as for any companion result that occurs in the roll.
  $P1Flavor = "";
  $P1Result = "";
  $P2Flavor = "";
  $P2Result = "";
  $P3Flavor = "";
  $P3Result = "";
  $P1Comp = "";
  $P2Comp = "";
  $P3Comp = "";

// These variables are arrays that will be populated depending on the selected activity and the biome value (which we saw in the above variable list).
// The list of biomes in the dropdown are assigned aspect values, which is what is actually being read and not the dropdown text.
// What this means is that, while all the biomes are different, they are classified into three main 'values': one, two, and three.
// There is a fourth value of 'Gen', for general. This is used with the 'Unspecified' biome, and does not use any aspect array when generating
// the list of flavor text results.
  var genSuccess = [];
  var oneSuccess = [];
  var twoSuccess = [];
  var threeSuccess = [];
  var genFail = [];
  var oneFail = [];
  var twoFail = [];
  var threeFail = [];
  // Each aspect has its own array of results, plus the generic flavor messages. The next two arrays are used to compile the relevant info into a single array.
  var activitySuccess = [];
  var activityFail = [];

// these log info in the console panel. If you don't know how to open this, right click anywhere on your page and hit 'Inspect Element'
// This will open up a sidebar. At the top of the side bar, you will be able to select 'console'.
  console.log("--- CLICKED ---");
  console.log($biome + " " + $activity);

for(i = 0; i  < $ActivityGo; i++){
// I use Ajax because it allows me to pull data from my json files and also bypass the async. Pulling data from a JSON file to use within the same roll
// cannot be done otherwise, because '$.getJSON' is asynchronous with the webpage.
// Each JSON file contains simply contains an array in JSON format. It's used for arrays that are larger or that take up a lot of space in your source code.
// In my JSONs, each array contains four objects (one for each aspect + gen). Each object is also its own array, and contains a number of Fail and Success messages.
// The following Ajax bits are used to pull objects I request from the two JSON files I specity: huntResult.json, and scavResult.json. Once the requested objects are
// retrieved, they are 'pushed' to the appropriate array from the above list. This means that I'm not using all the arrays at once and only using the ones that are
// relevant to the element/activity that was selected.

// This 'if' statement is called only if the Hunting activity is selected, meaning that all of the messages in here will be from the 'huntResult.json' file.
if($activity == "Hunting"){
  $.ajax({
          url: "huntResult.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.gen, function(i, s) {
              genSuccess.push(s.success);
            });
          }
        });
    $.ajax({
            url: "huntResult.json",
            async: false,
            dataType: 'json',
            success: function(data) {
              $.each(data.gen, function(i, f) {
                genFail.push(f.fail);
              });
            }
          });
// This reads the info from the above Ajax and assigns the Gen arrays to the main success/fail arrays.
    if($biome == "Unspecified"){
          activitySuccess = genSuccess;
          activityFail = genFail;
      }
    if($biome == "1"){
      $.ajax({
              url: "huntResult.json",
              async: false,
              dataType: 'json',
              success: function(data) {
                $.each(data.one, function(i, s) {
                  oneSuccess.push(s.success);
                });
              }
            });
        $.ajax({
                url: "huntResult.json",
                async: false,
                dataType: 'json',
                success: function(data) {
                  $.each(data.one, function(i, f) {
                    oneFail.push(f.fail);
                  });
                }
              });
// This reads the info from the above Ajax and combines the one and Gen arrays into the main success/fail arrays.
        activitySuccess = genSuccess.concat(oneSuccess);
        activityFail = genFail.concat(oneFail);
    }
    if($biome == "2"){
      $.ajax({
              url: "huntResult.json",
              async: false,
              dataType: 'json',
              success: function(data) {
                $.each(data.two, function(i, s) {
                  twoSuccess.push(s.success);
                });
              }
            });
        $.ajax({
                url: "huntResult.json",
                async: false,
                dataType: 'json',
                success: function(data) {
                  $.each(data.two, function(i, f) {
                    twoFail.push(f.fail);
                  });
                }
              });
// This reads the info from the above Ajax and combines the two and Gen arrays into the main success/fail arrays.
          activitySuccess = genSuccess.concat(twoSuccess);
          activityFail = genFail.concat(twoFail);
    }
    if($biome == "3"){
      $.ajax({
              url: "huntResult.json",
              async: false,
              dataType: 'json',
              success: function(data) {
                $.each(data.three, function(i, s) {
                  threeSuccess.push(s.success);
                });
              }
            });
        $.ajax({
                url: "huntResult.json",
                async: false,
                dataType: 'json',
                success: function(data) {
                  $.each(data.three, function(i, f) {
                    threeFail.push(f.fail);
                  });
                }
              });
// This reads the info from the above Ajax and combines the three and Gen arrays into the main success/fail arrays.
        activitySuccess = genSuccess.concat(threeSuccess);
        activityFail = genFail.concat(threeFail);
    }
}

// This 'if' statement is only called if the Scavenging activity is slected, meaning that all of the messages in here will be from the 'scavResult.json' file.
if($activity == "Scavenging"){
  $.ajax({
          url: "scavResult.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.gen, function(i, s) {
              genSuccess.push(s.success);
            });
          }
        });
    $.ajax({
            url: "scavResult.json",
            async: false,
            dataType: 'json',
            success: function(data) {
              $.each(data.gen, function(i, f) {
                genFail.push(f.fail);
              });
            }
          });
// This reads the info from the above Ajax and assigns the Gen array to the main success/fail arrays.
    if($biome == "Unspecified"){
      activitySuccess = genSuccess;
      activityFail = genFail;
      }
    if($biome == "one"){
      $.ajax({
              url: "scavResult.json",
              async: false,
              dataType: 'json',
              success: function(data) {
                $.each(data.one, function(i, s) {
                  oneSuccess.push(s.success);
                });
              }
            });
        $.ajax({
                url: "scavResult.json",
                async: false,
                dataType: 'json',
                success: function(data) {
                  $.each(data.one, function(i, f) {
                    oneFail.push(f.fail);
                  });
                }
              });
// This reads the info from the above Ajax and combines the one and Gen arrays into the main success/fail arrays.
        activitySuccess = genSuccess.concat(oneSuccess);
        activityFail = genFail.concat(oneFail);
    }
    if($biome == "two"){
      $.ajax({
              url: "scavResult.json",
              async: false,
              dataType: 'json',
              success: function(data) {
                $.each(data.two, function(i, s) {
                  twoSuccess.push(s.success);
                });
              }
            });
        $.ajax({
                url: "scavResult.json",
                async: false,
                dataType: 'json',
                success: function(data) {
                  $.each(data.two, function(i, f) {
                    twoFail.push(f.fail);
                  });
                }
              });
// This reads the info from the above Ajax and combines the two and Gen arrays into the main success/fail arrays.
        activitySuccess = genSuccess.concat(twoSuccess);
        activityFail = genFail.concat(twoFail);
    }
    if($biome == "three"){
      $.ajax({
              url: "scavResult.json",
              async: false,
              dataType: 'json',
              success: function(data) {
                $.each(data.three, function(i, s) {
                  threeSuccess.push(s.success);
                });
              }
            });
        $.ajax({
                url: "scavResult.json",
                async: false,
                dataType: 'json',
                success: function(data) {
                  $.each(data.three, function(i, f) {
                    threeFail.push(f.fail);
                  });
                }
              });
// This reads the info from the above Ajax and combines the three and Gen arrays into the main success/fail arrays.
        activitySuccess = genSuccess.concat(threeSuccess);
        activityFail = genFail.concat(threeFail);
    }
}

// These constants use the combo of Math.floor and Math.random to choose one random item in the arrays assigned to each activity, three times.
// So regardless of whether the player has succeeded or failed, there is already one success message and one failure message prepared for the outcome.
const randSuccess1 = Math.floor(Math.random() * activitySuccess.length);
const randFail1 = Math.floor(Math.random() * activityFail.length);
const randSuccess2 = Math.floor(Math.random() * activitySuccess.length);
const randFail2 = Math.floor(Math.random() * activityFail.length);
const randSuccess3 = Math.floor(Math.random() * activitySuccess.length);
const randFail3 = Math.floor(Math.random() * activityFail.length);

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// The code below is related to the actual RNG part of the roll. Now that most of the preparation part is done, all that remains to do is use the info we've
// gathered up until this point, and plug it into the roll. I'll only comment the SINGLE PLAYER section, since the principle remains the same for the
// TWO PLAYERS and THREE PLAYERS sections.

/*----------------------------- SINGLE PLAYER ----------------------------------*/
  if(document.getElementById('part1').checked){
    console.log($P1Breed + " " + $P1Aspect + " " + $P1Rank);

// This uses the 'allCOrrent' boolean from before. What this does is that it runs a quick check of all the input fields for this player
// including the Name text field, and the Breed, Aspect, and Rank dropdowns. If any of these fields are blank or on their default option,
// the boolean switches to false and an alert is put on the screen that tells the user which 'player' is missing an input.
    if((document.getElementById("p1").value.length == 0) || $P1Breed == "Breed" || $P1Aspect == "Aspect" || $P1Rank == "Rank"){
      allCorrect = false;
      alert("Something missing from P1");
    }

// If the Hunting activity is chosen, this is the 'if' statement that will play. What happens is that a random number between 1 and 100 will be drawn,
// and this will determine the success or failure of the roll. If you recall the long list of variables from above, this bit includes the '$PxRank' variables.
// The '$PxRank' reads the values of the Rank dropdown, which have hidden values (similar to the biome aspects above) that define the success rate of the player
// depending on which rank is selected. Mortal is 25, Touched is 50, Herald is 75, and Ambassador is 100. These values indicate the range for each rank, meaning that
// if the randomly generated number is within the rank's range (for example, Mortal would need for the number to be between 1-25) then a success message is output
// but if the number is higher than the rank's range (for Mortal that would be 26-100) then the failure message is output instead. Ambassador, at 100 range, means
// that the success is always guaranteed.
    if($activity == "Hunting"){
$num1 = Math.floor((Math.random() * 100) + 1);
      // This 'if' is the one that determines if the randomly generated number is equal to the Rank value or less
      if($num1 <= $P1Rank){
        // This next bit fills the empty '$P1Flavor' variable from earlier. It uses the 'activitySuccess' array, with the randomly chosen list item
        // to decide which flavor text to use for the roll.
        $P1Flavor = activitySuccess[randSuccess1];
        // This next 'if' is specific to the Biome. If the player's Aspect matches the Biome type, they have a chance to earn an elemental lootbox.
        // this chance is 20% of their Rank value (So for Mortal rank, they have a 25% chance of success, with a 5% chance of earning the elemental box)
        if($P1Aspect == $biome && $num1 <= $P1Rank/5){
          $P1Result = " has returned with a " + $P1Breed + " Hunting haul, and a " + $biome + " Hunting haul."
        } else {
          // If the player's element does not match the biome, they can only earn the regular lootbox.
          $P1Result = " has returned with a " + $P1Breed + " Hunting haul."
        }
        // If the hutning companion checkbox is checked, there is a chance that the player's companion will rerieve an additional small lootbox (upon player success)
        // This chance is 50% of the player's Rank value, and is independent of the elemental lootbox chance. (However, this only occurs if the player succeeds)
        if($("#huntCom").is(":checked")){
          $com1 = Math.floor((Math.random() * 100) + 1);
          if($com1 <= $P1Rank/2){
          $P1Comp = "-> Your " + $activity + " companion found an additional Small Hunting haul."
          }
        }
        // If the number generated is over the player's Rank value, they fail the roll.
      } else if($num1 > $P1Rank){
        // This bit fills the empty '$P1Flavor' variable from earlier. It uses the 'activityFail' array, with the randomly chosen list item
        // to decide which flavor text to use for the roll.
        $P1Flavor = activityFail[randFail1];
        $P1Result = " has not found any prey."
      }
    }

// The same explanation as above is used for the Scavenging portion as well, therefore I will not repeat it.
    if($activity == "Scavenging"){
$num1 = Math.floor((Math.random() * 100) + 1);
      if($num1 <= $P1Rank){
        $P1Flavor = activitySuccess[randSuccess1];
        if($P1Aspect == $biome && $num1 <= $P1Rank/5){
          $P1Result = " has returned with a " + $biome + " Scavenged Loot, and a " + $biome + " Scavenged Loot."
        } else {
          $P1Result = " has returned with a " + $P1Breed + " Scavenged Loot."
        }
        if($("#scavCom").is(":checked")){
          $com1 = Math.floor((Math.random() * 100) + 1);
             if($com1 <= $P1Rank/2){
             $P1Comp = "-> Your " + $activity + " companion found an additional Small Scavenged loot."
           }
         }
      } else if($num1 > $P1Rank){
        $P1Flavor = activityFail[randFail1];
        $P1Result = " did not bring anything home."
      }
    }
  }

/*----------------------------- TWO PLAYERS ----------------------------------*/
  if(document.getElementById('part2').checked){
    console.log($P1Breed + " " + $P1Aspect + " " + $P1Rank);
    console.log($P2Breed + " " + $P2Aspect + " " + $P2Rank);

    if((document.getElementById("p1").value.length == 0) || $P1Breed == "Breed" || $P1Aspect == "Aspect" || $P1Rank == "Rank"){
      allCorrect = false;
      alert("Something missing from P1");
    }
    if((document.getElementById("p2").value.length == 0) || $P2Breed == "Breed" || $P2Aspect == "Aspect" || $P2Rank == "Rank"){
      allCorrect = false;
      alert("Something missing from P2");
    }

    if($activity == "Hunting"){
$num1 = Math.floor((Math.random() * 100) + 1);
      if($num1 <= $P1Rank){
        $P1Flavor = activitySuccess[randSuccess1];
        if($P1Aspect == $biome && $num1 <= $P1Rank/5){
          $P1Result = " has returned with a " + $P1Breed + " Hunting haul, and a " + $biome + " Hunting haul."
        } else {
          $P1Result = " has returned with a " + $P1Breed + " Hunting haul."
        }
        if($("#huntCom").is(":checked")){
          $com1 = Math.floor((Math.random() * 100) + 1);
          if($com1 <= $P1Rank/2){
          $P1Comp = "-> Your " + $activity + " companion found an additional Small Hunting haul."
          }
        }
      } else if($num1 > $P1Rank){
        $P1Flavor = activityFail[randFail1];
        $P1Result = " has not found any prey."
      }

$num2 = Math.floor((Math.random() * 100) + 1);
      if($num2 <= $P2Rank){
        $P2Flavor = activitySuccess[randSuccess2];
        if($P2Aspect == $biome && $num2 <= $P2Rank/5){
          $P2Result = " has returned with a " + $P2Breed + " Hunting haul, and a " + $biome + " Hunting haul."
        } else {
          $P2Result = " has returned with a " + $P2Breed + " Hunting haul."
        }
        if($("#huntCom").is(":checked")){
          $com2 = Math.floor((Math.random() * 100) + 1);
          if($com2 <= $P2Rank/2){
          $P2Comp = "-> Your " + $activity + " companion found an additional Small Hunting haul."
          }
        }

      } else if($num2 > $P2Rank){
        $P2Flavor = activityFail[randFail2];
        $P2Result = " has not found any prey."
      }
    }
    if($activity == "Scavenging"){
$num1 = Math.floor((Math.random() * 100) + 1);
      if($num1 <= $P1Rank){
        $P1Flavor = activitySuccess[randSuccess1];
        if($P1Aspect == $biome && $num1 <= $P1Rank/5){
          $P1Result = " has returned with a " + $P1Breed + " Scavenged Loot, and a " + $biome + " Scavenged Loot."
        } else {
          $P1Result = " has returned with a " + $P1Breed + " Scavenged Loot."
        }
        if($("#scavCom").is(":checked")){
          $com1 = Math.floor((Math.random() * 100) + 1);
             if($com1 <= $P1Rank/2){
             $P1Comp = "-> Your " + $activity + " companion found an additional Small Scavenged loot."
           }
         }
      } else if($num1 > $P1Rank){
        $P1Flavor = activityFail[randFail1];
        $P1Result = " did not bring anything home."
      }

$num2 = Math.floor((Math.random() * 100) + 1);
      if($num2 <= $P2Rank){
        $P2Flavor = activitySuccess[randSuccess2];
        if($P2Aspect == $biome && $num2 <= $P2Rank/5){
          $P2Result = " has returned with a " + $P2Breed + " Scavenged Loot, and a " + $biome + " Scavenged Loot."
        } else {
          $P2Result = " has returned with a " + $P2Breed + " Scavenged Loot."
        }
        if($("#scavCom").is(":checked")){
          $com2 = Math.floor((Math.random() * 100) + 1);
             if($com2 <= $P2Rank/2){
             $P2Comp = "-> Your " + $activity + " companion found an additional Small Scavenged loot."
           }
         }
      } else if($num2 > $P2Rank){
        $P2Flavor = activityFail[randFail2];
        $P2Result = " did not bring anything home."
      }
    }
  }

/*----------------------------- THREE PLAYERS ----------------------------------*/
  if(document.getElementById('part3').checked){
    console.log($P1Breed + " " + $P1Aspect + " " + $P1Rank);
    console.log($P2Breed + " " + $P2Aspect + " " + $P2Rank);
    console.log($P3Breed + " " + $P3Aspect + " " + $P3Rank);

    if((document.getElementById("p1").value.length == 0) || $P1Breed == "Breed" || $P1Aspect == "Aspect" || $P1Rank == "Rank"){
      allCorrect = false;
      alert("Something missing from P1");
    }
    if((document.getElementById("p2").value.length == 0) || $P2Breed == "Breed" || $P2Aspect == "Aspect" || $P2Rank == "Rank"){
      allCorrect = false;
      alert("Something missing from P2");
    }
    if((document.getElementById("p3").value.length == 0) || $P3Breed == "Breed" || $P3Aspect == "Aspect" || $P3Rank == "Rank"){
      allCorrect = false;
      alert("Something missing from P3");
    }

    if($activity == "Hunting"){
$num1 = Math.floor((Math.random() * 100) + 1);
      if($num1 <= $P1Rank){
        $P1Flavor = activitySuccess[randSuccess1];
        if($P1Aspect == $biome && $num1 <= $P1Rank/5){
          $P1Result = " has returned with a " + $P1Breed + " Hunting haul, and a " + $biome + " Hunting haul."
        } else {
          $P1Result = " has returned with a " + $P1Breed + " Hunting haul."
        }
        if($("#huntCom").is(":checked")){
          $com1 = Math.floor((Math.random() * 100) + 1);
          if($com1 <= $P1Rank/2){
          $P1Comp = "-> Your " + $activity + " companion found an additional Small Hunting haul."
          }
        }
      } else if($num1 > $P1Rank){
        $P1Flavor = activityFail[randFail1];
        $P1Result = " has not found any prey."
      }

$num2 = Math.floor((Math.random() * 100) + 1);
      if($num2 <= $P2Rank){
        $P2Flavor = activitySuccess[randSuccess2];
        if($P2Aspect == $biome && $num2 <= $P2Rank/5){
          $P2Result = " has returned with a " + $P2Breed + " Hunting haul, and a " + $biome + " Hunting haul."
        } else {
          $P2Result = " has returned with a " + $P2Breed + " Hunting haul."
        }
        if($("#huntCom").is(":checked")){
          $com2 = Math.floor((Math.random() * 100) + 1);
          if($com2 <= $P2Rank/2){
          $P2Comp = "-> Your " + $activity + " companion found an additional Small Hunting haul."
          }
        }
      } else if($num2 > $P2Rank){
        $P2Flavor = activityFail[randFail2];
        $P2Result = " has not found any prey."
      }

$num3 = Math.floor((Math.random() * 100) + 1);
      if($num3 <= $P3Rank){
        $P3Flavor = activitySuccess[randSuccess3];
        if($P3Aspect == $biome && $num3 <= $P3Rank/5){
          $P3Result = " has returned with a " + $P3Breed + " Hunting haul, and a " + $biome + " Hunting haul."
        } else {
          $P3Result = " has returned with a " + $P3Breed + " Hunting haul."
        }
        if($("#huntCom").is(":checked")){
          $com3 = Math.floor((Math.random() * 100) + 1);
          if($com3 <= $P3Rank/2){
          $P3Comp = "-> Your " + $activity + " companion found an additional Small Hunting haul."
          }
        }
      } else if($num3 > $P3Rank){
        $P3Flavor = activityFail[randFail3];
        $P3Result = " has not found any prey."
      }
    }
    if($activity == "Scavenging"){
$num1 = Math.floor((Math.random() * 100) + 1);
      if($num1 <= $P1Rank){
        $P1Flavor = activitySuccess[randSuccess1];
        if($P1Aspect == $biome && $num1 <= $P1Rank/5){
          $P1Result = " has returned with a " + $P1Breed + " Scavenged Loot, and a " + $biome + " Scavenged Loot."
        } else {
          $P1Result = " has returned with a " + $P1Breed + " Scavenged Loot."
        }
        if($("#scavCom").is(":checked")){
          $com1 = Math.floor((Math.random() * 100) + 1);
             if($com1 <= $P1Rank/2){
             $P1Comp = "-> Your " + $activity + " companion found an additional Small Scavenged loot."
           }
         }
      } else if($num1 > $P1Rank){
        $P1Flavor = activityFail[randFail1];
        $P1Result = " did not bring anything home."
      }

$num2 = Math.floor((Math.random() * 100) + 1);
      if($num2 <= $P2Rank){
        $P2Flavor = activitySuccess[randSuccess2];
        if($P2Aspect == $biome && $num2 <= $P2Rank/5){
          $P2Result = " has returned with a " + $P2Breed + " Scavenged loot, and a " + $biome + " Scavenged loot."
        } else {
          $P2Result = " has returned with a " + $P2Breed + " Scavenged loot."
        }
        if($("#scavCom").is(":checked")){
          $com2 = Math.floor((Math.random() * 100) + 1);
             if($com2 <= $P2Rank/2){
             $P2Comp = "-> Your " + $activity + " companion found an additional Small Scavenged loot."
           }
         }
      } else if($num2 > $P2Rank){
        $P2Flavor = activityFail[randFail2];
        $P2Result = " did not bring anything home."
      }

$num3 = Math.floor((Math.random() * 100) + 1);
      if($num3 <= $P3Rank){
        $P3Flavor = activitySuccess[randSuccess3];
        if($P3Aspect == $biome && $num3 <= $P3Rank/5){
          $P3Result = " has returned with a " + $P3Breed + " Scavenged Loot, and a " + $biome + " Scavenged Loot."
        } else {
          $P3Result = " has returned with a " + $P3Breed + " Scavenged Loot."
        }
        if($("#scavCom").is(":checked")){
          $com3 = Math.floor((Math.random() * 100) + 1);
             if($com3 <= $P3Rank/2){
             $P3Comp = "-> Your " + $activity + " companion found an additional Small Scavenged loot."
           }
         }
      } else if($num3 > $P3Rank){
        $P3Flavor = activityFail[randFail3];
        $P3Result = " did not bring anything home."
      }
    }
  }

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// Now the final touches! This next part is entirely for populating the results box with text.
// The first 'if' covers whether the 'allCorrect' boolean is true or false. If the allCorrent is false, then the results box will show the error message.
  if(allCorrect === false){
   $("#errortext" + (i + 1)).text("Something went wrong.");
  } else {
  // If the allCorrect remains true up until this point, then the roll will proceed to print into the results box!
  // The next part here prints only the first player's info, since the number of participants selected is One (1)
    if(document.getElementById('part1').checked){
      $("#p1-flavor" + (i + 1)).text($P1Name + $P1Flavor);
      $("#p1-result" + (i + 1)).text("-> " + $P1Name + $P1Result);
      $("#p1-comp" + (i + 1)).text($P1Comp);
    }
    // The next part prints the info for players 1 and 2, since the number of participants selected is Two (2)
    if(document.getElementById('part2').checked){
      $("#p1-flavor" + (i + 1)).text($P1Name + $P1Flavor);
      $("#p1-result" + (i + 1)).text("-> " + $P1Name + $P1Result);
      $("#p1-comp" + (i + 1)).text($P1Comp);
      $("#topsplit" + (i + 1)).text("------------");
      $("#p2-flavor" + (i + 1)).text($P2Name + $P2Flavor);
      $("#p2-result" + (i + 1)).text("-> " + $P2Name + $P2Result);
      $("#p2-comp" + (i + 1)).text($P2Comp);
    }
    // The last part prints the info for all three players, since the number of participants is Three (3)
    if(document.getElementById('part3').checked){
       $("#p1-flavor" + (i + 1)).text($P1Name + $P1Flavor);
       $("#p1-result" + (i + 1)).text("-> " + $P1Name + $P1Result);
       $("#p1-comp" + (i + 1)).text($P1Comp);
       $("#topsplit" + (i + 1)).text("----------");
       $("#p2-flavor" + (i + 1)).text($P2Name + $P2Flavor);
       $("#p2-result" + (i + 1)).text("-> " + $P2Name + $P2Result);
       $("#p2-comp" + (i + 1)).text($P2Comp);
       $("#bottomsplit" + (i + 1)).text("---------");
       $("#p3-flavor" + (i + 1)).text($P3Name + $P3Flavor);
       $("#p3-result" + (i + 1)).text("-> " + $P3Name + $P3Result);
       $("#p3-comp" + (i + 1)).text($P3Comp);
     }

// That's it, you made it to the end of the Activity Roller code! Thanks so much for checking this out, and I hope it has been informative to how the code generally works!
// Unfortunately I'm neither an expert nor a teacher, so I fear my explanations for the code may have been lacking the actual technical aspect, but at the very least
// I'm hoping there is enough for a beginner-intermediate coder to go off of!
 }
}
}
