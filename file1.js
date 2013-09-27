///<reference path="CloudParty.d.ts" />
// Door starting position
var startPos = getPos();

// Door opened position (Taken from object marker)
var targetPos = getMarkerPosWorld('open');

// Distance between target position and starting position
var distance = targetPos[1] - startPos[1];

// Velocity (Change this to a range between 1 and 15 to see the slow/fast effect)
var velocity = 8;

// Time? Not quite sure as this remains a constant value as it slides.
var time = distance / velocity;

// Whether the door is currently sliding
var sliding = false;

// Whether the door is opened or closed
var opened = false;

// Ease velocity to position
function easeVelToPos() {
    distance = targetPos[1] - getPos()[1];

    // Get new velocity and round to thousandths
    velocity = (velocity !== 0) ? parseFloat((distance / time).toFixed(3)) : 0;

    // Set new velocity
    setVelLinear({ vel: [0, velocity, 0], world: false });

    if (velocity === 0) {
        velocity = 5;
        timerDestroy('easeVelToPos');
        sliding = false;
    }
}

function click() {
    if (!sliding) {
        sliding = true;
        if (opened) {
            // Make initial world position the target position
            targetPos = startPos;
            opened = false;
        } else {
            // Make object marker world position the target position
            targetPos = getMarkerPosWorld('open');
            opened = true;
        }

        // Start moving object
        timerCreate({ name: 'easeVelToPos', period: 0.1 });
    }
}

handlerCreate({
    name: 'click',
    channel: 'direct',
    message: 'clickStart'
});
