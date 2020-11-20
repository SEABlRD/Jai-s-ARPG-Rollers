function clearBabies(){
  $("#errortext1").text("");
  $("#Baby1").text("");
  $("#Breed1").text("");
  $("#Health1").text("");
  $("#Aspect1").text("");
  $("#Power1").text("");
  $("#Genotype1").text("");
    $("#Chimgeno1").text("");
  $("#Bodytype1").text("");
  $("#Phenotype1").text("");
    $("#Chimpheno1").text("");
  $("#Gender1").text("");
  $("#Markmut1").text("");
  $("#Mutation1").text("");
  $("#Baby2").text("");
  $("#Breed2").text("");
  $("#Health2").text("");
  $("#Aspect2").text("");
  $("#Power2").text("");
  $("#Genotype2").text("");
    $("#Chimgeno2").text("");
  $("#Bodytype2").text("");
  $("#Phenotype2").text("");
    $("#Chimpheno2").text("");
  $("#Gender2").text("");
  $("#Markmut2").text("");
  $("#Mutation2").text("");
  $("#Baby3").text("");
  $("#Breed3").text("");
  $("#Health3").text("");
  $("#Aspect3").text("");
  $("#Power3").text("");
  $("#Genotype3").text("");
    $("#Chimpheno3").text("");
  $("#Bodytype3").text("");
  $("#Phenotype3").text("");
    $("#Chimpheno3").text("");
  $("#Gender3").text("");
  $("#Markmut3").text("");
  $("#Mutation3").text("");
}

// this checks that all of the parent info is correct
// if the parent info is incorrect, it turns false
    allCorrect = new Boolean;
// This checks if the Chimera mutation is present
// If Chimera is present, it turns True
    isChimera = new Boolean;

/*-------------------------------- HOW MANY BABIES -------------------------------------------*/

$(document).ready(function(){
$("#randomizer").click(function(){

$P1Breed = $("#sire-breed").find(":selected").text();
$P2Breed = $("#dam-breed").find(":selected").text();
$Babies = 1;


if($P1Breed === "Breed 1" || $P2Breed === "Breed 1"){
      $num = Math.floor((Math.random() * 100) + 1);
      if($num > 66){
        $Babies = 3;
      }
      if($num <= 66 && $num > 33){
        $Babies = 2;
      }
      if($num <= 33){
        $Babies = 1;
      }
    }
if($P1Breed === "Breed 2" || $P2Breed === "Breed 2"){
      $num = Math.floor((Math.random() * 100) + 1);
      if($num > 50){
        $Babies = 2;
      } else {
        $Babies = 1;
      }
    }
if($P1Breed === "Breed 3" || $P2Breed === "Breed 3"){
      $Babies = 1;
    }

calculations($Babies);

});
});

/*--------------------------------- BABY FUNCTION ------------------------------------------*/

function calculations($Babies){
    clearBabies();

    $P1Breed = $("#sire-breed").find(":selected").text();
    $P2Breed = $("#dam-breed").find(":selected").text();
    $P1Aspect = $("#sire-Aspect").find(":selected").text();
    $P2Aspect = $("#dam-Aspect").find(":selected").text();
    $P1Bodytype = $("#sire-Bodytype").find(":selected").text();
    $P2Bodytype = $("#dam-Bodytype").find(":selected").text();
    $ParentGeno1 = $("#P1").val().split("/");
    $ParentGeno2 = $("#P2").val().split("/");
    $DadGenes = $ParentGeno1.slice(1);
    $MomGenes = $ParentGeno2.slice(1);

    $errormessage = "";

    allCorrect = true;
    isChimera = false;

// THESE ARE THE BASE ABBREVIATIONS
    $BaseA = ["BA"];
    $BaseB = ["BB"];
    $BaseC = ["BC"];

    for(i = 0; i  < $Babies; i++){
    $BASE = [];
    $GENO = [];
    $PHENO = "";
    $PBASE = "";
    $CHIMBASE = [];
    $CHIMPBASE = [];
    $CHIMGENO = [];
    $CHIMPHENO = [];
    $BAspect = "";
    $BBodytype = "";
    $BMutation = "";
    $BMarkmut = "";


// FLIP A COIN AND PICK EITHER DAD'S BASE OR MOM'S BASE
    let $DadBase = $ParentGeno1[0];
    let $MomBase = $ParentGeno2[0];

    const sBases = ["BA","BB","BC"];
    const randBase = Math.floor(Math.random() * sBases.length);

      if((document.getElementById("P1").value.length == 0) || (document.getElementById("P2").value.length == 0)){
        alert("Geno string missing!");
        allCorrect = false;
      } else {
        if($DadBase && $MomBase){
          $number = Math.floor((Math.random() * 100) + 1);
          if($number <= 45){
            $BASE.push($DadBase);
          } else if($number > 45 && $number <= 90){
            $BASE.push($MomBase);
          } else if($number > 90){
            $BASE.push(sBases[randBase]);
          }
        }
      }

console.log("----- CLICKED -----");
console.log("Successful: " + allCorrect);


// HOW THE BASE WILL SHOW UP IN THE PHENO
      if($BASE.slice(0,1).toString() === $BaseA.toString()){
        $PBASE = "Base A";
      }
      if($BASE.slice(0,1).toString() === $BaseB.toString()){
        $PBASE = "Base B";
      }
      if($BASE.slice(0,1).toString() === $BaseC.toString()){
        $PBASE = "Base C";
      }

makeGeno();
$GENO = $babyGenes;
$PHENO = $babyPheno;


/*----------------------------- BREED / GENDER / Aspect ----------------------------------*/

      $Breed = "";
      $Aspect = "";

      if($P1Breed === "Breed" || $P2Breed === "Breed"){
        alert("Please pick a breed!");
        allCorrect = false;
      }

// Breed 1
      if($P1Breed === "Breed 1" && $P2Breed === "Breed 1"){
        $Breed = "Breed 1";
      }

        if($P1Breed === "Breed 1" && $P2Breed === "Breed 2"){
          alert("That's not a valid pair!");
          allCorrect = false;
        }
        if($P1Breed === "Breed 1" && $P2Breed === "Breed 3"){
          alert("That's not a valid pair!");
          allCorrect = false;
        }

/*---------------------------------------------------------*/

// Breed 2
        if($P1Breed === "Breed 2" && $P2Breed === "Breed 2"){
          $Breed = "Breed 2";
        }

        if($P1Breed === "Breed 2" && $P2Breed === "Breed 1"){
          alert("That's not a valid pair!");
          allCorrect = false;
        }
        if($P1Breed === "Breed 2" && $P2Breed === "Breed 3"){
          alert("That's not a valid pair!");
          allCorrect = false;
        }

/*---------------------------------------------------------*/

// Breed 3
        if($P1Breed === "Breed 3" && $P2Breed === "Breed 3"){
          $Breed = "Breed 3";
        }

        if($P1Breed === "Breed 3" && $P2Breed === "Breed 1"){
          alert("That's not a valid pair!");
          allCorrect = false;
        }
        if($P1Breed === "Breed 3" && $P2Breed === "Breed 2"){
          alert("That's not a valid pair!");
          allCorrect = false;
        }

/*---------------------------------------------------------*/

// GENDER
      $Gender = "";
      $num = Math.floor((Math.random() * 2) + 1);
      if($num < 2){
        $Gender = "Female";
      } else {
        $Gender = "Male";
      }

// HEALTH
      $Health = "Healthy";
      $Status = "Rank 1";
      const diseases = ["Blind","Frail","Deaf","Lame"];
      const randHealth = Math.floor(Math.random() * diseases.length);

      if($("#inbred").is(":checked")){
            $number = Math.floor((Math.random() * 50) + 1);
            if($number <= 30){
            $Status = "Inbred";
            $Health = "Stillborn";
          } else if($number > 30 && $number <= 45){
            $Status = "Inbred";
            $Health = (diseases[randHealth]);
          } else if($number > 45 && $number <= 50){
            $Status = "Inbred";
          }
        }

// ASPECTS
      if($P1Aspect === "Aspect" || $P2Aspect === "Aspect"){
        alert("Please pick an Aspect!");
        allCorrect = false;
      }

      if($P1Aspect && $P2Aspect){
        $num = Math.floor((Math.random() * 100) + 1);
        if($num <= 50){
          $BAspect = $P1Aspect;
        }
        if($num <= 100 && $num > 50){
          $BAspect = $P2Aspect;
        }
      }


/*----------------------------------- BODY TYPES / MUTATIONS ----------------------------------------*/

// BODY TYPES
      if($P1Bodytype === "Bodytype" || $P2Bodytype === "Bodytype"){
         alert("Please pick a bodytype!");
         allCorrect = false;
      }

      if($P1Bodytype && $P2Bodytype){
        $num = Math.floor((Math.random() * 100) + 1);
        if($num <= 50){
          $BBodytype = $P1Bodytype;
        }
        if($num > 50){
          $BBodytype = $P2Bodytype;
        }
      }
// MUTATIONS: MARKINGS
const markMuts = ["ALBINO |","LEUCISTIC |","MELANISTIC |"];
const randMM = Math.floor(Math.random() * markMuts.length);

        $number = Math.floor((Math.random() * 100) + 1);
        if($number > 0 && $number <= 8){
          $BMarkmut = markMuts[randMM];
        }
        if($number > 8 && $number <= 10){
          $BMarkmut += "CHIMERA |";
          isChimera = true;
        } else {
          isChimera = false;
        }
        if($number > 10){
          $BMarkmut = "";
        }

// MAKE CHIMERA GENO
        if(isChimera == true){
          $number = Math.floor((Math.random() * 100) + 2);
            if($number <= 45){
              $CHIMBASE.push($DadBase);
            } else if($number > 45 && $number <= 90){
              $CHIMBASE.push($MomBase);
            } else if($number > 90){
              $CHIMBASE.push(sBases[randBase]);
            }
          if($CHIMBASE.slice(0,1).toString() === $BaseA.toString()){
            $CHIMPBASE = "Base A";
          }
          if($CHIMBASE.slice(0,1).toString() === $BaseB.toString()){
            $CHIMPBASE = "Base B";
          }
          if($CHIMBASE.slice(0,1).toString() === $BaseC.toString()){
            $CHIMPBASE = "Base C";
          }

          makeChim();
          $CHIMGENO = $babyGenes2;
          $CHIMPHENO = $babyPheno2;
        }


// MUTATIONS: PHYSICAL

  var physMuts = ["MUT 1","MUT 2","MUT 3","MUT 4","MUT 5"];
  var randPM = Math.floor(Math.random() * physMuts.length);

        $number = Math.floor((Math.random() * 100) + 1);
        if($number == 0 && $number < 20){
            $BMutation = physMuts[randPM];
          }
        if($number > 20){
            $BMutation += "";
          }



/*-------------------------------- PUT IT ALL TOGETHER -------------------------------------------*/

if($("#rank").is(":checked")){
      $number = Math.floor((Math.random() * 2) + 1);
      console.log($number);
      if($number < 2){
      allCorrect = false;
    }
  }

       if(allCorrect === false){
        $("#errortext" + (i + 1)).text("The breeding was unsuccessful.");
      } else {
        $("#Baby" + (i + 1)).text((i + 1) + ") ");
        $("#Gender"+ (i + 1)).text($Gender + " - ");
        $("#Breed" + (i + 1)).text($Breed);
        $("#Health" + (i + 1)).text($Status + " - " + $Health);
        $("#Genotype"+ (i + 1)).text($BASE);
        $("#Phenotype"+ (i + 1)).text($PBASE);
        $("#Aspect" + (i + 1)).text($BAspect + " Aspect");
        $("#Bodytype" + (i + 1)).text($BBodytype + ", ");
        $("#Markmut" + (i + 1)).text($BMarkmut + " ");
        $("#Mutation" + (i + 1)).text($BMutation);
        if($babyGenes.length > 0){
          $("#Genotype" + (i + 1)).text($BASE + "/" + $GENO);
          $("#Phenotype"+ (i + 1)).text($PBASE + ", with " + $PHENO);
        }
        if(isChimera == true && $babyGenes2.length < 1){
            $("#Chimgeno"+ (i + 1)).text("//" + $CHIMBASE);
            $("#Chimpheno"+ (i + 1)).text(" // " + $CHIMPBASE);
        } else if(isChimera == true){
          $("#Chimgeno" + (i + 1)).text("//" + $CHIMBASE + "/" + $CHIMGENO);
          $("#Chimpheno"+ (i + 1)).text(" // " + $CHIMPBASE + ", with " + $CHIMPHENO);
        }
        }

  }
}
