//Get data from DB
const userDataString = document
  .getElementById("userSuggestions")
  .getAttribute("userData");
const userData = JSON.parse(userDataString);

//TODO: Create a 'Because you answered' section that points to the suggestions
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
  tempEntry.LEDLights == F ? suggestions.push("Use LED lights") : null;
  tempEntry.AirConditioningTemp < AC
    ? suggestions.push("Use the sun as natural heating and wear short sleeve")
    : null;
  tempEntry.NaturalLights == F
    ? suggestions.push(
        "Open curtains and blinds during the day for natural sunlight"
      )
    : null;
  tempEntry.NumEatingOut > THRESHOLD
    ? suggestions.push("Purchase in bulk and cook every once in a while")
    : null;
  tempEntry.ShowerLength > THRESHOLD
    ? suggestions.push("Create an efficient shower routine")
    : null;
  tempEntry.SinkUsage == T
    ? suggestions.push(
        "Use a glass of water when brushing instead of running the sink"
      )
    : null;
  tempEntry.SmartPlug == F
    ? suggestions.push(
        "A small investment in a smart plug can help save money in the long run"
      )
    : null;
  tempEntry.SmartThermo == F
    ? suggestions.push(
        "A small investment in a smart thermo can help save money in the long run"
      )
    : null;
  tempEntry.TintUse == F
    ? suggestions.push(
        "A small investment in window tint can help save money in the long run"
      )
    : null;
  tempEntry.Watertemp > WATER
    ? suggestions.push(
        "Turn down your water heater to 120 degrees, its still hot, but it will save a lot of energy"
      )
    : null;

  return suggestions;
}
//Create a list of suggestions
function createList(data) {
  let ul = document.createElement("ul");
  document.getElementById("sug").appendChild(ul);
  listSuggestions(data).forEach((suggestion) => {
    let li = document.createElement("li");
    li.innerHTML = suggestion;
    ul.appendChild(li);
  });
}

createList(userData);
