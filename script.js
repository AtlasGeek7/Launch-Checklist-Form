window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName");
   let fuelLevel = document.querySelector("input[name=fuelLevel");
   let cargoWeight = document.querySelector("input[name=cargoWeight");
   const faultyItems = document.getElementById("faultyItems");
   const fuelStatus = document.getElementById("fuelStatus");
   const cargoStatus = document.getElementById("cargoStatus");
   const launchStatus = document.getElementById("launchStatus");
   // Form Validation
   form.addEventListener("submit", function(event) {
     let shuttleIsReady = -1; // Awaiting Information Before Launch
     // check for blank fields
     if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoWeight.value === "") {
      alert("All fields are required!");
      shuttleIsReady = -1; // Awaiting Information Before Launch
      // check for numeric input in pilot & co-pilot fields
      } else if (!(pilotName.value.match(/^[A-Za-z]+$/)) || !(copilotName.value.match(/^[A-Za-z]+$/))) {
        alert("Pilot & co-pilot names must be strings!");
      // check for non numeric input in fuel level & cargo weight fields
      } else if (isNaN(fuelLevel.value) || isNaN(cargoWeight.value)) {
        alert("fuel level & cargo weight values must be numbers!");
      } else {
        performChecks()
      }
      function performChecks() {
      // set pilotStatus to reflect whether or not there is a valid pilot
      if (!(pilotName.value.match(/^[A-Za-z]+$/)) || pilotName.value === "") {
         document.getElementById("pilotStatus").style.color = "red";
         document.getElementById("pilotStatus").innerHTML = "Pilot not ready.";
         pilotsReady = false;
      } else {
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} ready.`;
         document.getElementById("pilotStatus").style.removeProperty("color");
         pilotsReady = true;
      }
      // set copilotStatus to reflect whether or not there is a valid co-pilot
      if (!(copilotName.value.match(/^[A-Za-z]+$/)) || copilotName.value === "") {
         document.getElementById("copilotStatus").style.color = "red";
         document.getElementById("copilotStatus").innerHTML = "Co-pilot not ready.";
         pilotsReady = false;
      } else {
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName.value} ready.`;
         document.getElementById("copilotStatus").style.removeProperty("color");
      }
      // check fuel level
      if (fuelLevel.value < 10000 && fuelLevel.value > 0) {
         faultyItems.style.visibility = "visible";
         fuelStatus.innerHTML = "Not enough fuel for launch.";
         fuelStatus.style.color = "red";
      } else {
         fuelStatus.innerHTML = "Fuel level high enough for launch.";
         fuelStatus.style.removeProperty("color");
      }
      // check cargo weight
      if (cargoWeight.value > 10000) {
        faultyItems.style.visibility = "visible";
         cargoStatus.innerHTML = "Cargo weight too heavy for launch.";
         cargoStatus.style.color = "red";
      } else {
         cargoStatus.innerHTML = "Cargo weight low enough for launch.";
         cargoStatus.style.removeProperty("color");
      }
      if (fuelLevel.value >= 10000 && cargoWeight.value <= 10000) {
        shuttleIsReady = 1;
      } else if (fuelLevel.value < 10000 || cargoWeight.value > 10000) {
        shuttleIsReady = 0;
      }
    }
      if (shuttleIsReady === 1) {
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
        faultyItems.style.visibility = "hidden";
      } else if (shuttleIsReady === 0) {
          launchStatus.innerHTML = "Shuttle not ready for launch";
          launchStatus.style.color = "red";
          faultyItems.style.visibility = "visible";
      } else {
              faultyItems.style.visibility = "hidden";
              launchStatus.innerHTML = "Awaiting Information Before Launch";
              launchStatus.style.color = "black";
            }
      event.preventDefault();
      });
      
      // fetch & display planet info
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(function(json) {
            let planet = json[Math.floor(Math.random() * json.length)];
            document.getElementById("missionTarget").innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${planet.name}</li>
               <li>Diameter: ${planet.diameter}</li>
               <li>Star: ${planet.star}</li>
               <li>Distance from Earth: ${planet.distance}</li>
               <li>Number of Moons: ${planet.moons}</li>
            </ol>
            <img src="${planet.image}">
            `;
         });
      });
});