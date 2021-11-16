//Get data from DB
const userDataString = document
  .getElementById("userSuggestions")
  .getAttribute("userData");
const userData = JSON.parse(userDataString);

//TODO: Create a 'Because you answered' section that points to the respectivesuggestions
function listSuggestions(data) {
  var suggestions = [];
  const T = "Yes";
  const F = "No";
  const AC = 74;
  const THRESHOLD = 4;
  const WATER = 120;

  //Get the latest input from the user
  const mostRecent = data.length - 1;
  const tempEntry = data[mostRecent];

  //For each piece of input, set a reasonable threshold to make recommendation
  if (tempEntry.LEDLights == F) {
    suggestions.push(
      "Because you answered " +
        tempEntry.LEDLights +
        " to using LED lights, we recommend you: "
    );
    suggestions.push("Use LED lights");
  }
  if (tempEntry.AirConditioningTemp < AC) {
    suggestions.push("Because your AC is above " + AC + ", we recommend you: ");
    suggestions.push("Use the sun as natural heating and wear short sleeve");
  }
  if (tempEntry.NaturalLights == F) {
    suggestions.push(
      "Because you answered " +
        tempEntry.NaturalLights +
        " to using natural lights, we recommend you: "
    );
    suggestions.push(
      "Open curtains and blinds during the day for natural sunlight"
    );
  }
  if (tempEntry.NumEatingOut > THRESHOLD) {
    suggestions.push(
      "Because you eat out more than " +
        THRESHOLD +
        " per week, we recommend you: "
    );
    suggestions.push("Purchase in bulk and cook every once in a while");
  }
  if (tempEntry.ShowerLength > THRESHOLD) {
    suggestions.push(
      "Because you shower for longer than " +
        THRESHOLD +
        " minutes, we recommend you: "
    );
    suggestions.push("Create an efficient shower routine");
  }
  if (tempEntry.SinkUsage == T) {
    suggestions.push(
      "Because you answered " +
        tempEntry.SinkUsage +
        " to letting the sink run when brushing your teeth, we recommend you: "
    );
    suggestions.push(
      "Use a glass of water when brushing instead of running the sink"
    );
  }
  if (tempEntry.SmartPlug == F) {
    suggestions.push(
      "Because you answered " +
        tempEntry.SmartPlug +
        " to using smart plugs, we recommend you: "
    );
    suggestions.push(
      "Make a small investment in a smart plugs to help save money in the long run"
    );
  }
  if (tempEntry.SmartThermo == F) {
    suggestions.push(
      "Because you answered " +
        tempEntry.SmartThermo +
        " to using smart thermostats, we recommend you: "
    );
    suggestions.push(
      "Make a small investment in a smart thermo to help save money in the long run"
    );
  }
  if (tempEntry.TintUse == F) {
    suggestions.push(
      "Because you answered " +
        tempEntry.TintUse +
        " to using tints on your windows, we recommend you: "
    );
    suggestions.push(
      "Make a small investment in window tint to help save money in the long run"
    );
  }
  if (tempEntry.Watertemp > WATER) {
    suggestions.push(
      "Because your water heater is set above " +
        tempEntry.SmartPlug +
        "F, we recommend you: "
    );
    suggestions.push(
      "turn down your water heater to 120 degrees. Its still hot, but it will save a lot of energy"
    );
  }

  return suggestions;
}
//Create a list of suggestions
function createList(data) {
  let div = document.createElement("div");
  document.getElementById("sug").appendChild(div);
  let i = 0;
  var suggestiondiv = null;
  listSuggestions(data).forEach((suggestion) => {
    //If the index is even, then create a div and put the reason in it
    if (i % 2 == 0) {
      suggestiondiv = document.createElement("div");
      let p = document.createElement("p");
      p.innerHTML = suggestion;
      div.appendChild(p);
    } else {
      //Suggestions are on odd indexes

      let li = document.createElement("li");
      li.innerHTML = suggestion;
      div.appendChild(li);
    }
    i++;
  });
}

createList(userData);