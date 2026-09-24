$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "rgb(118, 0, 233)"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    //toggleGrid();


    // TODO 2 - Create Platforms
createPlatform(0,600,210,70,"blue");
createPlatform(350,600,900,50,"blue");
createPlatform(1250,640,70,20,"blue");
createPlatform(650,465,125,20,"blue");
createPlatform(400,360,125,20,"blue");
createPlatform(740,300,125,20,"blue");
createPlatform(1000,200,125,20,"blue");
    // TODO 3 - Create Collectables
createCollectable("diamond",1200,700);
createCollectable("steve",1040,150);
createCollectable("database",230,320);
    // TODO 4 - Create Cannons
createCannon("left",650,910)
createCannon("right",390,910)
createCannon("left",165,910)
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
