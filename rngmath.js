function clearSummon(){
  $("#Breed1").text("");
  $("#Health1").text("");
  $("#Aspect1").text("");
  $("#Power1").text("");
  $("#Basecolour1").text("");
  $("#Genotype1").text("");
  $("#Bodytype1").text("");
  $("#Phenobase1").text("");
  $("#Phenotype1").text("");
  $("#Gender1").text("");
  $("#Markmut1").text("");
  $("#Mutation1").text("");
  $("#total").text("");
}

isChimera = new Boolean;

$(document).ready(function(){
$("#randomizer").click(function(){

$rngBreed = $("input[type='radio'][name='breed']:checked").val();
$RNGgeno = 1;

if($rngBreed === "Breed 1" || $rngBreed === "Breed 2" || $rngBreed === "Random"){
      $RNGgeno = 1;
    }
  calculations($RNGgeno);
  });
});

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function calculations($RNGgeno){
  clearSummon();

  isChimera = false;

/*-------------------------------- START CALCULATING -------------------------------------------*/
  for(i = 0; i  < $RNGgeno; i++){
  console.log("----- CLICKED -----");
$rngBreed = $("input[type='radio'][name='breed']:checked").val();
$rngRarity = $("input[type='radio'][name='rarity']:checked").val();
  console.log("Breed: " + $rngBreed);
  console.log("Rarity: " + $rngRarity);

  $PHENO = "";
  $PBASE = "";
  $BASE = [];
  $GENO = [];
  $CHIMBASE = [];
  $CHIMPBASE = [];
  $CHIMGENO = [];
  $CHIMPHENO = [];
  $Breed = "";
  $Aspect = "";
  $gAspect = "";
  $gPower = "";
  $gBodytype = "";
  $gMutation = "";
  $gMarkmut = "";

/*-------------------------------- PICK A BASE -------------------------------------------*/
  $BaseA = ["BA"];
  $BaseB = ["BB"];
  $BaseC = ["BC"];

  const sBases = ["BA","BB","BC"];
  const randBase = Math.floor(Math.random() * sBases.length);
  const randBase2 = Math.floor(Math.random() * sBases.length);
  $BASE.push(sBases[randBase]);
  $CHIMBASE.push(sBases[randBase2]);

      if($BASE.slice(0,1).toString() === $BaseA.toString()){
        $PBASE = "Base A";
      }
      if($BASE.slice(0,1).toString() === $BaseB.toString()){
        $PBASE = "Base B";
      }
      if($BASE.slice(0,1).toString() === $BaseC.toString()){
        $PBASE = "Base C";
      }
//------------------------------------------------------------------
      if($CHIMBASE.slice(0,1).toString() === $BaseA.toString()){
        $CHIMPBASE = "Base A";
      }
      if($CHIMBASE.slice(0,1).toString() === $BaseB.toString()){
        $CHIMPBASE = "Base B";
      }
      if($CHIMBASE.slice(0,1).toString() === $BaseC.toString()){
        $CHIMPBASE = "Base C";
      }

/*-------------------------------- PICK A BREED -------------------------------------------*/
const allBreeds = ["Breed 1","Breed 2","Breed 3"];
const randALL = Math.floor(Math.random() * allBreeds.length);

if($rngBreed === "Breed 1"){
  $Breed = "Breed 1";
}
if($rngBreed === "Breed 2"){
  $Breed = "Breed 2";
}
if($rngBreed === "Breed 3"){
  $Breed = "Breed 3";
}
if($rngBreed === "Random"){
  $Breed = allBreeds[randALL];
}

// GENDER
$num = Math.floor((Math.random() * 2) + 1);
if($num < 2){
  $Gender = "Female";
} else {
  $Gender = "Male";
}

// HEALTH
  $Health = "Healthy";
  $Status = "Rank 1";

/*-------------------------------- PICK A BODYTYPE -------------------------------------------*/

if($rngRarity === "Common"){
  $bodyNum = (Math.floor(Math.random() * 20) + 1);
  if($bodyNum <= 15){
    $gBodytype = "Type 1";
  }
  if($bodyNum > 15 && $bodyNum <= 18){
    $gBodytype = "Type 2";
  }
  if($bodyNum > 18 && $bodyNum <= 20){
    $gBodytype = "Type 3";
  }
} else if($rngRarity === "Uncommon" || $rngRarity === "Rare"){
  $bodyNum = (Math.floor(Math.random() * 20) + 1);
  if($bodyNum <= 10){
    $gBodytype = "Type 1";
  }
  if($bodyNum > 10 && $bodyNum <= 15){
    $gBodytype = "Type 2";
  }
  if($bodyNum > 15 && $bodyNum <= 20){
    $gBodytype = "Type 3";
  }
}

/*-------------------------------- PICK AN Aspect -------------------------------------------*/
$affNum = (Math.floor(Math.random() * 15) + 1);
if($affNum <= 5){
  $gAspect = "Aspect 1";
}
if($affNum > 5 && $affNum <= 10){
  $gAspect = "Aspect 2";
}
if($affNum > 10 && $affNum <= 15){
  $gAspect = "Aspect 3";
}

/*-------------------------------- PICK A MARKMUT -------------------------------------------*/
const markMuts = ["ALBINO |","LEUCISTIC |","MELANISTIC |"];
const randMM = Math.floor(Math.random() * markMuts.length);

$number = Math.floor((Math.random() * 100) + 1);
if($number > 0 && $number <= 2){
  $gMarkmut = markMuts[randMM]
}
if($number > 8 && $number <= 10){
    $gMarkmut = "CHIMERA |";
    isChimera = true;
  } else {
    isChimera = false;
  }
if($number > 10){
  $gMarkmut = "";
}

/*-------------------------------- PICK A PHYS MUT -------------------------------------------*/
var physMuts = ["MUT 1","MUT 2","MUT 3","MUT 4","MUT 5"];
var randPM = Math.floor(Math.random() * physMuts.length);

if($rngRarity === "Common"){
  $number = Math.floor((Math.random() * 100) + 1);
if($number == 0 && $number < 10){
    $gMutation = physMuts[randPM];
  }
if($number > 10){
    $gMutation += "";
  }
}

if($rngRarity === "Uncommon"){
  $number = Math.floor((Math.random() * 100) + 1);
if($number == 0 && $number < 20){
    $gMutation = physMuts[randPM];
  }
if($number > 20){
    $gMutation += "";
  }
}

if($rngRarity === "Bone"){
  $number = Math.floor((Math.random() * 100) + 1);
if($number == 0 && $number < 30){
    $gMutation = physMuts[randPM];
  }
if($number > 30){
    $gMutation += "";
  }
}

/*-------------------------------- MAKE THE GENO/PHENO -------------------------------------------*/
var genoArray = [];
var genoArray2 = [];
var phenoArray = [];
var phenoArray2 = [];
var commonGenes = [];
var commonGenes2 = [];
var uncommonGenes = [];
var uncommonGenes2 = [];
var rareGenes = [];
var rareGenes2 = [];
$markTotal = "";
$numC = 0;
$numUC = 0;
$numR = 0;
$numC2 = 0;
$numUC2 = 0;
$numR2 = 0;
$totalC = 0;
$totalUC = 0;
$totalR = 0;

function makeGeno(){

  commonOrder = ["n1","n2","n3","n4","n5","n6"];
  uncommonOrder = ["n7","n8","n9"];
  rareOrder = ["n10","n0"];


if($rngRarity === "Common"){
  $.ajax({
          url: "gcommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.cGenes, function(i, c) {
              commonGenes.push(c.rec);
            });
          }
        });
  $.ajax({
          url: "guncommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.uGenes, function(i, uc) {
              uncommonGenes.push(uc.rec);
            });
          }
        });
  $.ajax({
          url: "grare.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.rGenes, function(i, r) {
              rareGenes.push(r.rec);
            });
          }
        });
              $newNum = Math.floor(Math.random() * 100);
              if($newNum <= 5){
                $numR = 1;
              }
              $new2 = Math.floor((Math.random() * 5) + 1);
              if($new2 <= 3){
                $numUC = 0;
              } else if($new2 == 4){
                $numUC = 1;
              } else if($new2 == 5){
                $numUC = 2;
              }
              $numC = (5 - ($numUC + $numR));

        console.log("Common: " + $numC);
        console.log("Uncommon: " + $numUC);
        console.log("Rare: " + $numR);

        var newC = commonGenes.sort(function() {
          return 0.5 - Math.random();
        });
        var newCommon = newC.slice(commonGenes, $numC).sort(function(a,b){
          return commonOrder.indexOf(a) - commonOrder.indexOf(b);
        });

        var newUC = uncommonGenes.sort(function() {
          return 0.5 - Math.random();
        });
        var newUncommon = newUC.slice(uncommonGenes, $numUC).sort(function(a,b){
          return uncommonOrder.indexOf(a) - uncommonOrder.indexOf(b);
        });

        var newR = rareGenes.sort(function() {
          return 0.5 - Math.random();
        });
        var newRare = newR.slice(rareGenes, $numR).sort(function(a,b){
          return rareOrder.indexOf(a) - rareOrder.indexOf(b);
        });

          genoArray = newCommon.concat(newUncommon, newRare);
}

if($rngRarity === "Uncommon"){
  $.ajax({
          url: "gcommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.cGenes, function(i, c) {
              commonGenes.push(c.rec);
            });
          }
        });
  $.ajax({
          url: "guncommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.uGenes, function(i, uc) {
              uncommonGenes.push(uc.rec);
            });
          }
        });
  $.ajax({
          url: "grare.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.rGenes, function(i, r) {
              rareGenes.push(r.rec);
            });
          }
        });
        $newNum = Math.floor(Math.random() * 100);
        console.log($newNum);
        if($newNum <= 20){
          $numR = 1;
        }
        $numUC = Math.floor((Math.random() * 4) + 1);
        $numC = (Math.floor((Math.random() * 2) + 5) - ($numUC + $numR));

        console.log("Common: " + $numC);
        console.log("Uncommon: " + $numUC);
        console.log("Rare: " + $numR);

        var newC = commonGenes.sort(function() {
          return 0.5 - Math.random();
        });
        var newCommon = newC.slice(commonGenes, $numC).sort(function(a,b){
          return commonOrder.indexOf(a) - commonOrder.indexOf(b);
        });

        var newUC = uncommonGenes.sort(function() {
          return 0.5 - Math.random();
        });
        var newUncommon = newUC.slice(uncommonGenes, $numUC).sort(function(a,b){
          return uncommonOrder.indexOf(a) - uncommonOrder.indexOf(b);
        });

        var newR = rareGenes.sort(function() {
          return 0.5 - Math.random();
        });
        var newRare = newR.slice(rareGenes, $numR).sort(function(a,b){
          return rareOrder.indexOf(a) - rareOrder.indexOf(b);
        });

          genoArray = newCommon.concat(newUncommon, newRare);
}

if($rngRarity === "Rare"){
  $.ajax({
          url: "gcommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.cGenes, function(i, c) {
              commonGenes.push(c.rec);
            });
          }
        });
  $.ajax({
          url: "guncommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.uGenes, function(i, uc) {
              uncommonGenes.push(uc.rec);
            });
          }
        });
  $.ajax({
          url: "grare.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.rGenes, function(i, r) {
              rareGenes.push(r.rec);
            });
          }
        });

        $newNum = Math.floor((Math.random() * 20) + 1);
        if($newNum <= 10){
          $numR = 0;
        } else if($newNum > 10 && $newNum <= 20){
          $numR = 1;
        }
        $numUC = Math.floor((Math.random() * 4) + 1);
        $numC = (Math.floor((Math.random() * 2) + 5) - ($numUC + $numR));

        console.log("Common: " + $numC);
        console.log("Uncommon: " + $numUC);
        console.log("Rare: " + $numR);

        var newC = commonGenes.sort(function() {
          return 0.5 - Math.random();
        });
        var newCommon = newC.slice(commonGenes, $numC).sort(function(a,b){
          return commonOrder.indexOf(a) - commonOrder.indexOf(b);
        });

        var newUC = uncommonGenes.sort(function() {
          return 0.5 - Math.random();
        });
        var newUncommon = newUC.slice(uncommonGenes, $numUC).sort(function(a,b){
          return uncommonOrder.indexOf(a) - uncommonOrder.indexOf(b);
        });

        var newR = rareGenes.sort(function() {
          return 0.5 - Math.random();
        });
        var newRare = newR.slice(rareGenes, $numR).sort(function(a,b){
          return rareOrder.indexOf(a) - rareOrder.indexOf(b);
        });

          genoArray = newCommon.concat(newUncommon, newRare);
}


$.ajax({
        url: "gcommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.cGenes, function(i, c) {
            if(genoArray.includes(c.rec)){
            phenoArray.push(c.phen);
          }
        });
      }
    });
$.ajax({
        url: "guncommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.uGenes, function(i, u) {
            if(genoArray.includes(u.rec)){
            phenoArray.push(u.phen);
          }
        });
      }
    });
$.ajax({
        url: "grare.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.rGenes, function(i, r) {
            if(genoArray.includes(r.rec)){
            phenoArray.push(r.phen);
          }
        });
      }
    });

    $totalC = $numC;
    $totalUC = $numUC;
    $totalR = $numR;

}

function makeChim(){

  commonOrder = ["n1","n2","n3","n4","n5","n6"];
  uncommonOrder = ["n7","n8","n9"];
  rareOrder = ["n10","n0"];


if($rngRarity === "Common"){
  $.ajax({
          url: "gcommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.cGenes, function(i, c) {
              commonGenes2.push(c.rec);
            });
          }
        });
  $.ajax({
          url: "guncommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.uGenes, function(i, uc) {
              uncommonGenes2.push(uc.rec);
            });
          }
        });
              $new2 = Math.floor((Math.random() * 4) + 1);
              if($new2 <= 3){
                $numUC2 = 0;
              } else if($new2 == 4){
                $numUC2 = 1;
              }
              $numC2 = Math.floor((Math.random() * 4));

        var newC2 = commonGenes2.sort(function() {
          return 0.5 - Math.random();
        });
        var newCommon2 = newC2.slice(commonGenes2, $numC2).sort(function(a,b){
          return commonOrder.indexOf(a) - commonOrder.indexOf(b);
        });

        var newUC2 = uncommonGenes2.sort(function() {
          return 0.5 - Math.random();
        });
        var newUncommon2 = newUC2.slice(uncommonGenes2, $numUC2).sort(function(a,b){
          return uncommonOrder.indexOf(a) - uncommonOrder.indexOf(b);
        });

          genoArray2 = newCommon2.concat(newUncommon2);
}

if($rngRarity === "Uncommon"){
  $.ajax({
          url: "gcommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.cGenes, function(i, c) {
              commonGenes2.push(c.rec);
            });
          }
        });
  $.ajax({
          url: "guncommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.uGenes, function(i, uc) {
              uncommonGenes2.push(uc.rec);
            });
          }
        });
  $.ajax({
          url: "grare.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.rGenes, function(i, r) {
              rareGenes2.push(r.rec);
            });
          }
        });
        $newNum = Math.floor(Math.random() * 10);
        console.log($newNum);
        if($newNum == 10){
          $numR2 = 1;
        } else {
          $numR2 = 0;
        }
        $numUC2 = Math.floor((Math.random() * 2));
        $numC2 = Math.floor((Math.random() * 4));

        var newC2 = commonGenes2.sort(function() {
          return 0.5 - Math.random();
        });
        var newCommon2 = newC2.slice(commonGenes2, $numC2).sort(function(a,b){
          return commonOrder.indexOf(a) - commonOrder.indexOf(b);
        });

        var newUC2 = uncommonGenes2.sort(function() {
          return 0.5 - Math.random();
        });
        var newUncommon2 = newUC2.slice(uncommonGenes2, $numUC2).sort(function(a,b){
          return uncommonOrder.indexOf(a) - uncommonOrder.indexOf(b);
        });

        var newR2 = rareGenes2.sort(function() {
          return 0.5 - Math.random();
        });
        var newRare2 = newR2.slice(rareGenes2, $numR2).sort(function(a,b){
          return rareOrder.indexOf(a) - rareOrder.indexOf(b);
        });

          genoArray2 = newCommon2.concat(newUncommon2, newRare2);
}

if($rngRarity === "Rare"){
  $.ajax({
          url: "gcommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.cGenes, function(i, c) {
              commonGenes2.push(c.rec);
            });
          }
        });
  $.ajax({
          url: "guncommon.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.uGenes, function(i, uc) {
              uncommonGenes2.push(uc.rec);
            });
          }
        });
  $.ajax({
          url: "grare.json",
          async: false,
          dataType: 'json',
          success: function(data) {
            $.each(data.rGenes, function(i, r) {
              rareGenes2.push(r.rec);
            });
          }
        });

        $newNum = Math.floor((Math.random() * 50) + 1);
        if($newNum <= 10){
          $numR2 = 1;
        } else if($newNum > 10){
          $numR2 = 0;
        }
        $numUC2 = Math.floor((Math.random() * 3));
        $numC2 = Math.floor((Math.random() * 4));

        var newC2 = commonGenes2.sort(function() {
          return 0.5 - Math.random();
        });
        var newCommon2 = newC2.slice(commonGenes2, $numC2).sort(function(a,b){
          return commonOrder.indexOf(a) - commonOrder.indexOf(b);
        });

        var newUC2 = uncommonGenes2.sort(function() {
          return 0.5 - Math.random();
        });
        var newUncommon2 = newUC2.slice(uncommonGenes2, $numUC2).sort(function(a,b){
          return uncommonOrder.indexOf(a) - uncommonOrder.indexOf(b);
        });

        var newR2 = rareGenes2.sort(function() {
          return 0.5 - Math.random();
        });
        var newRare2 = newR2.slice(rareGenes2, $numR2).sort(function(a,b){
          return rareOrder.indexOf(a) - rareOrder.indexOf(b);
        });

          genoArray2 = newCommon2.concat(newUncommon2, newRare2);
}


$.ajax({
        url: "gcommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.cGenes, function(i, c) {
            if(genoArray2.includes(c.rec)){
            phenoArray2.push(c.phen);
          }
        });
      }
    });
$.ajax({
        url: "guncommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.uGenes, function(i, u) {
            if(genoArray2.includes(u.rec)){
            phenoArray2.push(u.phen);
          }
        });
      }
    });
$.ajax({
        url: "grare.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.rGenes, function(i, r) {
            if(genoArray2.includes(r.rec)){
            phenoArray2.push(r.phen);
          }
        });
      }
    });

}

makeGeno();


console.log(genoArray);
$phenoString = phenoArray.join(", ");
$babyGenes = genoArray.join("/");
$babyPheno = $phenoString.replace(/("[^"]+"|\w+)$/, "and $1");


$GENO = $babyGenes;
$PHENO = $babyPheno;

if(isChimera == true){
  makeChim();

  console.log(genoArray2);
  $phenoString2 = phenoArray2.join(", ");
  $babyGenes2 = genoArray2.join("/");
    if(genoArray2.length > 1){
      $babyPheno2 = $phenoString2.replace(/("[^"]+"|\w+)$/, "and $1");
    } else {
      $babyPheno2 = $phenoString2;
    }

    $totalC = $numC + $numC2;
    $totalUC = $numUC + $numUC2;
    $totalR = $numR + $numR2;

  $CHIMGENO = $babyGenes2;
  $CHIMPHENO = $babyPheno2;
}


/*-------------------------------- PUT IT ALL TOGETHER -------------------------------------------*/

$("#Breed" + (i + 1)).text($Breed);
$("#Health" + (i + 1)).text($Status + " - " + $Health);
$("#Genotype" + (i + 1)).text($BASE + "/" + $GENO);
$("#Phenotype"+ (i + 1)).text($PBASE + " with " + $PHENO);
$("#Gender"+ (i + 1)).text($Gender + " - ");
$("#Aspect" + (i + 1)).text($gAspect);
$("#Power" + (i + 1)).text($gPower);
$("#Bodytype" + (i + 1)).text($gBodytype + ", ");
$("#Markmut" + (i + 1)).text($gMarkmut + " ");
$("#Mutation" + (i + 1)).text($gMutation);
$("#total").text($totalC + ' common | ' + $totalUC + ' uncommon | ' + $totalR + ' rare');
if(isChimera == true && $babyGenes2.length < 1){
  $("#Genotype"+ (i + 1)).text($BASE + "/" + $GENO + "//" + $CHIMBASE);
  $("#Phenotype"+ (i + 1)).text($PBASE + ", with " + $PHENO + " // " + $CHIMPBASE);
} else if(isChimera == true){
$("#Genotype" + (i + 1)).text($BASE + "/" + $GENO + "//" + $CHIMBASE + "/" + $CHIMGENO);
$("#Phenotype"+ (i + 1)).text($PBASE + ", with " + $PHENO + " // " + $CHIMPBASE + " with " + $CHIMPHENO);
}
}
}
