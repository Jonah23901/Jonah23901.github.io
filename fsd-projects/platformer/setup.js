// setup variables
const walkAcceleration = 2.5; // how much is added to the speed each frame
const gravity = 0.5; // how much is subtracted from speedY each frame
const friction = 1.5; // how much the player is slowed each frame
const maxSpeed = 8; // maximum horizontal speed, not vertical
const playerJumpStrength = 12; // this is subtracted from the speedY each jump
const projectileSpeed = 8; // the speed of projectiles
let shouldDrawGrid = false;
let gridMade = false;

/////////////////////////////////////////////////
//////////ONLY CHANGE ABOVE THIS POINT///////////
/////////////////////////////////////////////////

// Base game variables
const frameRate = 60;
const playerScale = 0.8; //makes the player just a bit smaller. Doesn't affect the hitbox, just the image

// Player variables
const player = {
  x: 50,
  y: 100,
  speedX: 0,
  speedY: 0,
  width: undefined,
  height: undefined,
  onGround: false,
  facingRight: true,
  deadAndDeathAnimationDone: false,
  winConditionMet: false,
};

let hitDx;
let hitDy;
let hitBoxWidth = 50 * playerScale;
let hitBoxHeight = 105 * playerScale;
let firstTimeSetup = true;

const keyPress = {
  any: false,
  up: false,
  left: false,
  down: false,
  right: false,
  space: false,
};

// Player animation variables
const animationTypes = {
  duck: "duck",
  flyingJump: "flying-jump",
  frontDeath: "front-death",
  frontIdle: "front-idle",
  jump: "jump",
  lazer: "lazer",
  run: "run",
  stop: "stop",
  walk: "walk",
};
let currentAnimationType = animationTypes.run;
let frameIndex = 0;
let jumpTimer = 0;
let duckTimer = 0;
let DUCK_COUNTER_IDLE_VALUE = 14;
let debugVar = false;

let spriteHeight = 0;
let spriteWidth = 0;
let spriteX = 0;
let spriteY = 0;
let offsetX = 0;
let offsetY = 0;

// Platform, cannon, projectile, and collectable variables
let platforms = [];
let fakePlatforms = [];
let badPlatforms = [];
let cannons = [];
const cannonWidth = 118;
const cannonHeight = 80;
let projectiles = [];
const defaultProjectileWidth = 24;
const defaultProjectileHeight = defaultProjectileWidth;
const collectableWidth = 40;
const collectableHeight = 40;
let collectables = [];

// canvas and context variables; must be initialized later
let canvas;
let ctx;

// setup function variable
let setup;

let halleImage;
let animationDetails = {};

var collectableList = {
  database: { image: "data:image/jpeg;base64,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" },
  diamond: { image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAWlBMVEX///8gxbUUXlNK7dmh++gaqqcRcnrV//anwcMckZrc4+JliYMduK5klpxs1cmz9ux98eEXeGws4NhH0cFrt6i45t8AQTGMwb4AWGKO49cal4mOp6KFr7JKp5my+LvlAAAB1klEQVRoge2Z7Y6CMBBFEQGxVkBZkY/d93/Nde6YtKGAtcBuDD2/JiKH0tzCAEHg8Xg8Y4h0ELGIPK2TAep0GfmQO0k2L19nzsWZSEWfG3HHRvfMiHr4/A/EHeOfIR+ZXCVPNimviTF57Tzn0J5R5ntFBCBvdsSlIt6V0znbyMMHXj5Tzisca/sbFkOeK3nZXgjex0J+RsRQHiAsIgW0B5QFNpYYf0XDP9nIk3fkcO9obkIvX07OxhzwzyhZvi8f7N3lTyMIVB1pCfXymfL+CrWQV6/lKTcLoCCeOSkUnBlEMZPEjq8w8YP2RIy1M6nWLHDCUZpXRZaTMOaco4wxOZPyxMv/V65lLuqTHQnp5Z8h11b78nIgsGdmeHE0CXms4SIvvHxt+Q01ctKUIOuDXyWEuGNIHONoI0e4tYtVGQ/CIWRwEl7uIkdT4S7HI8Doyww0FR06BPZK1T4YcFr0Ltfi2eWERyiWG0OclE97lTz08lly6SK/gtfyhi5kuUWX6yyPtiKvVpLz8tcDUSpjqeCNWUNgl85CzmAsIbcmw11ugaM5vczx8r+Xd/TNo8N9r5WKL8VPS/D/3pQDweOfoJrxLveVOww3KV9zzgPjU4iBu9vzefwCs1pU47pnGUoAAAAASUVORK5CYII=" },
  grace: { image: "images/collectables/grace-head.png" },
  kennedi: { image: "images/collectables/kennedi-head.png" },
  max: { image: "images/collectables/max-head.png" },
  steve: { image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEX///8X3WIAUwAALQCv/c0AqixB84QAexiC9q0AlSnb/+sAPgAAGwDc4txI5H0ADgCltqVhg2ExvFJhbmEZfzKc+78Zu0S94srG/twAShCOtpgPoUCX4LFw35ZUyXcJYiVl9ZmOhR/CAAABy0lEQVR4nO3c226CQBRGYU9UERDQilZ6ev+n7IX8m8ZpURFwQta66UW5+DKTbO1k6GRCRERERORzSXZDycCoLJpdLcqGRl03zWagQIHqA+XRSEhUlqvXf1ue7PFeUXlUdVpXHV+cpqrU03m/KG3NbSg9DQoUqJGiqsEz92BOzWU5mGVRtXdRRVBVSFekqkOUPuiilqhtPD8HChSoMaAenVPbND73OCqxr7wHZZbFLaigUNuqYqfafkNObNe0PmvH1Ixylmyaah9BgQI1AtSdc6pf1LFqdUtbw4T6oSHaJcrWZTO9bOPuqKFCy5jx01EBKFCgQHk1p9yJHi4VKFCgQIECBQoUKFAPo/ary1xUaI8PdJbgmECBAgXKV9S3KsOLnoiyI+vSFsjON3xElaBAgWqJOrZDmarLkWBXAN7VH6gPtVGGKq3urgDU6bJEZMe8v8a1k/3qU4v40d1liTq7vVyfPd+J0q6BAgVqBCibU0FbVA+XT628WrNo2aCzaV+KsuvDUqO0j00ou69R6owFFChQI0Vpivo0p+oXxGZvl8kbfalsmBfErEyfZg2lg7/fF19HxaBAgeoDpb95Gxp8JHj5rwmIiIiIiO7rBxPDyqOKFSRRAAAAAElFTkSuQmCC" },
};
