// these are the passrates. rather than tying all the numbers individually,
// they are declared at the top and easily editable in case the rates change
  var cRecrate = 45;
  var cDomrate = 100;
  var uRecrate = 20;
  var uDomrate = 50;
  var rRecrate = 10;
  var rDomrate = 30;
  var urRecrate = 5;
  var urDomrate = 15;

function makeGeno(){
  // these empty arrays will contain the raw geno and pheno values
  // these are later turned into text strings and pushed to the ful geno
  var genoArray = [];
  var phenoArray = [];



/*--------------------------------------------------------------------------------------*/
/*-------------------------------- CALC HELL -------------------------------------------*/
/*--------------------------------------------------------------------------------------*/

// common genes calc
$.ajax({
        url: "gcommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.cGenes, function(i, c) {
            if($DadGenes.includes(c.rec) || $DadGenes.includes(c.dom) || $MomGenes.includes(c.rec) || $MomGenes.includes(c.dom)){
              $passrate = Math.floor((Math.random() * 100) + 1);
            //  console.log($passrate);
              if($passrate > 0){
                // if dad or mom have XX gene...
                  if($DadGenes.includes(c.dom) || $MomGenes.includes(c.dom)){
                    if($passrate <= cDomrate && $passrate > (cDomrate/5)){
                      genoArray.push(c.rec);
                      // if dad AND mom have XX gene...
                    } else if($DadGenes.includes(c.dom) && $MomGenes.includes(c.dom)){
                        if($passrate <= ((cDomrate/5) * 2)){
                          genoArray.push(c.dom);
                      } // if dad has XX and mom has nX
                    } else if($DadGenes.includes(c.dom) && $MomGenes.includes(c.rec)){
                        if($passrate <= (cDomrate/5)){
                          genoArray.push(c.dom);
                      } // if dad has nX and mom has XX
                    } else if($DadGenes.includes(c.rec) && $MomGenes.includes(c.dom)){
                        if($passrate <= (cDomrate/5)){
                          genoArray.push(c.dom);
                      }
                    } // if dad AND mom have nX gene....
                  } else if($DadGenes.includes(c.rec) && $MomGenes.includes(c.rec)){
                      if($passrate <= (cRecrate/5)){
                        genoArray.push(c.dom);
                    } else if($passrate > (cRecrate/5) && $passrate <= (cRecrate*2)){
                      genoArray.push(c.rec);
                    } // if either dad or mom as nX
                  } else if($DadGenes.includes(c.rec) || $MomGenes.includes(c.rec)){
                    if($passrate <= cRecrate){
                      genoArray.push(c.rec);
                    }
                  }
                }
              }
          });
        }
      });

// uncommon genes calc
$.ajax({
        url: "guncommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.uGenes, function(i, u) {
            if($DadGenes.includes(u.rec) || $DadGenes.includes(u.dom) || $MomGenes.includes(u.rec) || $MomGenes.includes(u.dom)){
              $passrate = Math.floor((Math.random() * 100) + 1);
              //console.log($passrate);
              if($passrate > 0){
                // if dad or mom have XX gene...
                  if($DadGenes.includes(u.dom) || $MomGenes.includes(u.dom)){
                    if($passrate <= uDomrate && $passrate > (uDomrate/5)){
                      genoArray.push(u.rec);
                      // if dad AND mom have XX gene...
                    } else if($DadGenes.includes(u.dom) && $MomGenes.includes(u.dom)){
                        if($passrate <= ((uDomrate/5) * 2)){
                          genoArray.push(u.dom);
                      } // if dad has XX and mom has nX
                    } else if($DadGenes.includes(u.dom) && $MomGenes.includes(u.rec)){
                        if($passrate <= (uDomrate/5)){
                          genoArray.push(u.dom);
                      } // if dad has nX and mom has XX
                    } else if($DadGenes.includes(u.rec) && $MomGenes.includes(u.dom)){
                        if($passrate <= (uDomrate/5)){
                          genoArray.push(u.dom);
                      }
                    } // if dad AND mom have nX gene....
                  } else if($DadGenes.includes(u.rec) && $MomGenes.includes(u.rec)){
                      if($passrate <= (uRecrate/5)){
                        genoArray.push(u.dom);
                    } else if($passrate > (uRecrate/5) && $passrate <= (uRecrate*2)){
                      genoArray.push(u.rec);
                    } // if either dad or mom has nX
                  } else if($DadGenes.includes(u.rec) || $MomGenes.includes(u.rec)){
                    if($passrate <= uRecrate){
                      genoArray.push(u.rec);
                    }
                  }
                }
              }
          });
        }
      });

// rare genes calc
$.ajax({
        url: "grare.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.rGenes, function(i, r) {
            if($DadGenes.includes(r.rec) || $DadGenes.includes(r.dom) || $MomGenes.includes(r.rec) || $MomGenes.includes(r.dom)){
              $passrate = Math.floor((Math.random() * 100) + 1);
            //  console.log($passrate);
              if($passrate > 0){
                // if dad or mom have XX gene...
                  if($DadGenes.includes(r.dom) || $MomGenes.includes(r.dom)){
                    if($passrate <= rDomrate && $passrate > (rDomrate/5)){
                      genoArray.push(r.rec);
                      // if dad AND mom have XX gene...
                    } else if($DadGenes.includes(r.dom) && $MomGenes.includes(r.dom)){
                        if($passrate <= ((rDomrate/5) * 2)){
                          genoArray.push(r.dom);
                      } // if dad has XX and mom has nX
                    } else if($DadGenes.includes(r.dom) && $MomGenes.includes(r.rec)){
                        if($passrate <= (rDomrate/5)){
                          genoArray.push(r.dom);
                      } // if dad has nX and mom has XX
                    } else if($DadGenes.includes(r.rec) && $MomGenes.includes(r.dom)){
                        if($passrate <= (rDomrate/5)){
                          genoArray.push(r.dom);
                      }
                    } // if dad AND mom have nX gene....
                  } else if($DadGenes.includes(r.rec) && $MomGenes.includes(r.rec)){
                      if($passrate <= (rRecrate/5)){
                        genoArray.push(r.dom);
                    } else if($passrate > (rRecrate/5) && $passrate <= (rRecrate*2)){
                      genoArray.push(r.rec);
                    }  // if either dad or mom has nX
                  } else if($DadGenes.includes(r.rec) || $MomGenes.includes(r.rec)){
                    if($passrate <= rRecrate){
                      genoArray.push(r.rec);

                    }
                  }
                }
              }
          });
        }
      });

// ultra-rare genes calc
$.ajax({
        url: "gultrarare.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.urGenes, function(i, ur) {
            if($DadGenes.includes(ur.rec) || $DadGenes.includes(ur.dom) || $MomGenes.includes(ur.rec) || $MomGenes.includes(ur.dom)){
              $passrate = Math.floor((Math.random() * 100) + 1);
            //  console.log($passrate);
              if($passrate > 0){
                // if dad or mom have XX gene...
                  if($DadGenes.includes(ur.dom) || $MomGenes.includes(ur.dom)){
                    if($passrate <= urDomrate && $passrate > (urDomrate/5)){
                      genoArray.push(ur.rec);
                      // if dad AND mom have XX gene...
                    } else if($DadGenes.includes(ur.dom) && $MomGenes.includes(ur.dom)){
                        if($passrate <= ((urDomrate/5) * 2)){
                          genoArray.push(ur.dom);
                      } // if dad has XX and mom has nX
                    } else if($DadGenes.includes(ur.dom) && $MomGenes.includes(ur.rec)){
                        if($passrate <= (urDomrate/5)){
                          genoArray.push(ur.dom);
                      } // if dad has nX and mom has XX
                    } else if($DadGenes.includes(ur.rec) && $MomGenes.includes(ur.dom)){
                        if($passrate <= (urDomrate/5)){
                          genoArray.push(ur.dom);
                      }
                    } // if dad AND mom have nX gene....
                  } else if($DadGenes.includes(ur.rec) && $MomGenes.includes(ur.rec)){
                      if($passrate <= (urRecrate/5)){
                        genoArray.push(ur.dom);
                    } else if($passrate > (urRecrate/5) && $passrate <= (urRecrate*2)){
                      genoArray.push(ur.rec);
                    } // if either dad or mom has nX
                  } else if($DadGenes.includes(ur.rec) || $MomGenes.includes(ur.rec)){
                    if($passrate <= urRecrate){
                      genoArray.push(ur.rec);
                    }
                  }
                }
              }
          });
        }
      });

/*--------------------------------------------------------------------------------------*/
/*------------------------------- PHENO STRING -----------------------------------------*/
/*--------------------------------------------------------------------------------------*/

// common pheno
$.ajax({
        url: "gcommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.cGenes, function(i, c) {
            if(genoArray.includes(c.rec) || genoArray.includes(c.dom)){
            phenoArray.push(c.phen);
          }
        });
      }
    });

//uncommon pheno
$.ajax({
        url: "guncommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.uGenes, function(i, u) {
            if(genoArray.includes(u.rec) || genoArray.includes(u.dom)){
            phenoArray.push(u.phen);
          }
        });
      }
    });

// rare pheno
$.ajax({
        url: "grare.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.rGenes, function(i, r) {
            if(genoArray.includes(r.rec) || genoArray.includes(r.dom)){
            phenoArray.push(r.phen);
          }
        });
      }
    });

// ur pheno
$.ajax({
        url: "gultrarare.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.urGenes, function(i, ur) {
            if(genoArray.includes(ur.rec) || genoArray.includes(ur.dom)){
            phenoArray.push(ur.phen);
          }
        });
      }
    });


/*------------------------------- COMPILE GENO -----------------------------------------*/

$phenoString = phenoArray.join(", ");
$babyGenes = genoArray.join("/");
  if(genoArray.length > 1){
    $babyPheno = $phenoString.replace(/("[^"]+"|\w+)$/, "and $1");
  } else {
    $babyPheno = $phenoString;
  }

  console.log("Geno: " + $babyGenes);
  console.log("Pheno: " + $babyPheno);
}

function makeChim(){
  // these empty arrays will contain the raw geno and pheno values
  // these are later turned into text strings and pushed to the ful geno
  var genoArray2 = [];
  var phenoArray2 = [];



/*--------------------------------------------------------------------------------------*/
/*-------------------------------- CALC HELL -------------------------------------------*/
/*--------------------------------------------------------------------------------------*/

// common genes calc
$.ajax({
        url: "gcommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.cGenes, function(i, c) {
            if($DadGenes.includes(c.rec) || $DadGenes.includes(c.dom) || $MomGenes.includes(c.rec) || $MomGenes.includes(c.dom)){
              $passrate = Math.floor((Math.random() * 100) + 1);
            //  console.log($passrate);
              if($passrate > 0){
                // if dad or mom have XX gene...
                  if($DadGenes.includes(c.dom) || $MomGenes.includes(c.dom)){
                    if($passrate <= cDomrate && $passrate > (cDomrate/5)){
                      genoArray2.push(c.rec);
                      // if dad AND mom have XX gene...
                    } else if($DadGenes.includes(c.dom) && $MomGenes.includes(c.dom)){
                        if($passrate <= ((cDomrate/5) * 2)){
                          genoArray2.push(c.dom);
                      } // if dad has XX and mom has nX
                    } else if($DadGenes.includes(c.dom) && $MomGenes.includes(c.rec)){
                        if($passrate <= (cDomrate/5)){
                          genoArray2.push(c.dom);
                      } // if dad has nX and mom has XX
                    } else if($DadGenes.includes(c.rec) && $MomGenes.includes(c.dom)){
                        if($passrate <= (cDomrate/5)){
                          genoArray2.push(c.dom);
                      }
                    } // if dad AND mom have nX gene....
                  } else if($DadGenes.includes(c.rec) && $MomGenes.includes(c.rec)){
                      if($passrate <= (cRecrate/5)){
                        genoArray2.push(c.dom);
                    } else if($passrate > (cRecrate/5) && $passrate <= (cRecrate*2)){
                      genoArray2.push(c.rec);
                    } // if either dad or mom as nX
                  } else if($DadGenes.includes(c.rec) || $MomGenes.includes(c.rec)){
                    if($passrate <= cRecrate){
                      genoArray2.push(c.rec);
                    }
                  }
                }
              }
          });
        }
      });

// uncommon genes calc
$.ajax({
        url: "guncommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.uGenes, function(i, u) {
            if($DadGenes.includes(u.rec) || $DadGenes.includes(u.dom) || $MomGenes.includes(u.rec) || $MomGenes.includes(u.dom)){
              $passrate = Math.floor((Math.random() * 100) + 1);
              //console.log($passrate);
              if($passrate > 0){
                // if dad or mom have XX gene...
                  if($DadGenes.includes(u.dom) || $MomGenes.includes(u.dom)){
                    if($passrate <= uDomrate && $passrate > (uDomrate/5)){
                      genoArray2.push(u.rec);
                      // if dad AND mom have XX gene...
                    } else if($DadGenes.includes(u.dom) && $MomGenes.includes(u.dom)){
                        if($passrate <= ((uDomrate/5) * 2)){
                          genoArray2.push(u.dom);
                      } // if dad has XX and mom has nX
                    } else if($DadGenes.includes(u.dom) && $MomGenes.includes(u.rec)){
                        if($passrate <= (uDomrate/5)){
                          genoArray2.push(u.dom);
                      } // if dad has nX and mom has XX
                    } else if($DadGenes.includes(u.rec) && $MomGenes.includes(u.dom)){
                        if($passrate <= (uDomrate/5)){
                          genoArray2.push(u.dom);
                      }
                    } // if dad AND mom have nX gene....
                  } else if($DadGenes.includes(u.rec) && $MomGenes.includes(u.rec)){
                      if($passrate <= (uRecrate/5)){
                        genoArray2.push(u.dom);
                    } else if($passrate > (uRecrate/5) && $passrate <= (uRecrate*2)){
                      genoArray2.push(u.rec);
                    } // if either dad or mom has nX
                  } else if($DadGenes.includes(u.rec) || $MomGenes.includes(u.rec)){
                    if($passrate <= uRecrate){
                      genoArray2.push(u.rec);
                    }
                  }
                }
              }
          });
        }
      });

// rare genes calc
$.ajax({
        url: "grare.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.rGenes, function(i, r) {
            if($DadGenes.includes(r.rec) || $DadGenes.includes(r.dom) || $MomGenes.includes(r.rec) || $MomGenes.includes(r.dom)){
              $passrate = Math.floor((Math.random() * 100) + 1);
            //  console.log($passrate);
              if($passrate > 0){
                // if dad or mom have XX gene...
                  if($DadGenes.includes(r.dom) || $MomGenes.includes(r.dom)){
                    if($passrate <= rDomrate && $passrate > (rDomrate/5)){
                      genoArray2.push(r.rec);
                      // if dad AND mom have XX gene...
                    } else if($DadGenes.includes(r.dom) && $MomGenes.includes(r.dom)){
                        if($passrate <= ((rDomrate/5) * 2)){
                          genoArray2.push(r.dom);
                      } // if dad has XX and mom has nX
                    } else if($DadGenes.includes(r.dom) && $MomGenes.includes(r.rec)){
                        if($passrate <= (rDomrate/5)){
                          genoArray2.push(r.dom);
                      } // if dad has nX and mom has XX
                    } else if($DadGenes.includes(r.rec) && $MomGenes.includes(r.dom)){
                        if($passrate <= (rDomrate/5)){
                          genoArray2.push(r.dom);
                      }
                    } // if dad AND mom have nX gene....
                  } else if($DadGenes.includes(r.rec) && $MomGenes.includes(r.rec)){
                      if($passrate <= (rRecrate/5)){
                        genoArray2.push(r.dom);
                    } else if($passrate > (rRecrate/5) && $passrate <= (rRecrate*2)){
                      genoArray2.push(r.rec);
                    }  // if either dad or mom has nX
                  } else if($DadGenes.includes(r.rec) || $MomGenes.includes(r.rec)){
                    if($passrate <= rRecrate){
                      genoArray2.push(r.rec);

                    }
                  }
                }
              }
          });
        }
      });

// ultra-rare genes calc
$.ajax({
        url: "gultrarare.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.urGenes, function(i, ur) {
            if($DadGenes.includes(ur.rec) || $DadGenes.includes(ur.dom) || $MomGenes.includes(ur.rec) || $MomGenes.includes(ur.dom)){
              $passrate = Math.floor((Math.random() * 100) + 1);
            //  console.log($passrate);
              if($passrate > 0){
                // if dad or mom have XX gene...
                  if($DadGenes.includes(ur.dom) || $MomGenes.includes(ur.dom)){
                    if($passrate <= urDomrate && $passrate > (urDomrate/5)){
                      genoArray2.push(ur.rec);
                      // if dad AND mom have XX gene...
                    } else if($DadGenes.includes(ur.dom) && $MomGenes.includes(ur.dom)){
                        if($passrate <= ((urDomrate/5) * 2)){
                          genoArray2.push(ur.dom);
                      } // if dad has XX and mom has nX
                    } else if($DadGenes.includes(ur.dom) && $MomGenes.includes(ur.rec)){
                        if($passrate <= (urDomrate/5)){
                          genoArray2.push(ur.dom);
                      } // if dad has nX and mom has XX
                    } else if($DadGenes.includes(ur.rec) && $MomGenes.includes(ur.dom)){
                        if($passrate <= (urDomrate/5)){
                          genoArray2.push(ur.dom);
                      }
                    } // if dad AND mom have nX gene....
                  } else if($DadGenes.includes(ur.rec) && $MomGenes.includes(ur.rec)){
                      if($passrate <= (urRecrate/5)){
                        genoArray2.push(ur.dom);
                    } else if($passrate > (urRecrate/5) && $passrate <= (urRecrate*2)){
                      genoArray2.push(ur.rec);
                    } // if either dad or mom has nX
                  } else if($DadGenes.includes(ur.rec) || $MomGenes.includes(ur.rec)){
                    if($passrate <= urRecrate){
                      genoArray2.push(ur.rec);
                    }
                  }
                }
              }
          });
        }
      });

/*--------------------------------------------------------------------------------------*/
/*------------------------------- PHENO STRING -----------------------------------------*/
/*--------------------------------------------------------------------------------------*/

// common pheno
$.ajax({
        url: "gcommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.cGenes, function(i, c) {
            if(genoArray2.includes(c.rec) || genoArray2.includes(c.dom)){
            phenoArray2.push(c.phen);
          }
        });
      }
    });

//uncommon pheno
$.ajax({
        url: "guncommon.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.uGenes, function(i, u) {
            if(genoArray2.includes(u.rec) || genoArray2.includes(u.dom)){
            phenoArray2.push(u.phen);
          }
        });
      }
    });

// rare pheno
$.ajax({
        url: "grare.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.rGenes, function(i, r) {
            if(genoArray2.includes(r.rec) || genoArray2.includes(r.dom)){
            phenoArray2.push(r.phen);
          }
        });
      }
    });

// ur pheno
$.ajax({
        url: "gultrarare.json",
        async: false,
        dataType: 'json',
        success: function(data) {
          $.each(data.urGenes, function(i, ur) {
            if(genoArray2.includes(ur.rec) || genoArray2.includes(ur.dom)){
            phenoArray2.push(ur.phen);
          }
        });
      }
    });


/*------------------------------- COMPILE GENO -----------------------------------------*/

$phenoString2 = phenoArray2.join(", ");
$babyGenes2 = genoArray2.join("/");
  if(genoArray2.length > 1){
    $babyPheno2 = $phenoString2.replace(/("[^"]+"|\w+)$/, "and $1");
  } else {
    $babyPheno2 = $phenoString2;
  }

  console.log("Chim Geno: " + $babyGenes2);
  console.log("Chim Pheno: " + $babyPheno2);
}
