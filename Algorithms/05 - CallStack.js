// Turn of the debugger mode to see how the callstack works

function takeShower() {
    return "Showering";
}

function eatBreakfast(params) {
    let meal = cookFood();
    return "eating " + meal;
}

function cookFood(params) {
    return ["Apple", "Banana", "Pancackes", "Eggs"][Math.floor(Math.random() * 4)]
}

function wakeUp(params) {
    takeShower();
    eatBreakfast();
    console.log("Yeaah! Ready to go");
}

wakeUp()