setInterval(function () {
            document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
        }, 1000);


dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("ChemicalChronicles"));
dragElement(document.getElementById("Weather"));
dragElement(document.getElementById("ProtonImage"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
   
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
};


var welcomeScreen = document.querySelector("#welcome")
function closeWindow(element) {
  element.style.display = "none"
}
function openWindow(element) {
  element.style.display = "block"
}
var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")
welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} ;

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
};

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    
  } else {
    selectIcon(element)
  }
};

var ChemicalChroniclesClose = document.querySelector("#ChemicalChroniclesclose");
ChemicalChroniclesClose.addEventListener("click", function() {
  closeWindow(ChemicalChronicles);
  setChemicalChroniclesContent(0);
});

var biggestIndex = 1;

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

function handleWindowTap(element) {
  biggestIndex++;  
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon);
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

var topBar = document.querySelector("#top");

var content = [
  {
    title: "Welcome!",
    content: `
            <p><strong>Welcome to Chemical Chronicles!</strong></p>
            <br/>
            <p>Click to go to the different pages!</p>
      `
  },
  {
    title: "Useful Constants",
    content: `
            <p>Avogadro constant =  6.022 x 10^23 mol^-1</p>
            <p>Molar gas constant = 8.31 Jmol^-1K^-1</p>
            <p>Boltzmann constant = 1.38 x 10^-23 JK^-1 </p>
            <p>Planck constant = 6.63 x 10^-34 Js</p>
            <p>Elementary charge = 1.6 x 10^-19</p>
      `
  },
  {
    title: "Useful Masses",
    content: `
            <p>Mass of a proton = 1.673 x 10^-27 kg</p>
            <p>Mass of a neutron = 1.675 x 10^-27 kg</p>
            <p>Mass of an electron = 9.11 x 10^-31 kg</p>
            <p>Mass of a muon = 1.884 x 10^-28 kg</p>
            <p>Mass of a tau = 3.168 x 10^-27 kg</p>
      `
  },
];

function setChemicalChroniclesContent(index) {
  var ChemicalChroniclesContent = document.querySelector("#ChemicalChroniclesText");
  if (ChemicalChroniclesContent) {
    ChemicalChroniclesContent.innerHTML = content[index].content;
  }
}

setChemicalChroniclesContent(0);

function addToLeftBar(index) {
  var leftbar = document.querySelector("#leftbar");
  var note = content[index];
  var newDiv = document.createElement("div");

  newDiv.innerHTML = `
    <p style="margin: 5px 0px; cursor: pointer; text-decoration: underline;">
      ${note.title}
    </p>
  `;

  newDiv.addEventListener("click", function() {
    setChemicalChroniclesContent(index);
  });

  leftbar.appendChild(newDiv); 
}

for (let i = 1; i < content.length; i++) {
  addToLeftBar(i);
};

var WeatherClose = document.querySelector("#Weatherclose");
WeatherClose.addEventListener("click", function() {
  closeWindow(Weather);
  document.querySelector("#weatherCityInput").value = "";
  document.querySelector("#weatherDisplay").style.display = "none";
  document.querySelector("#weatherError").style.display = "none";
});

const weatherApiKey = ''; 

const weatherSearchButton = document.querySelector('#weatherSearchButton');
const weatherPlaceInput = document.querySelector('#weatherPlaceInput');
const weatherDisplay = document.querySelector('#weatherDisplay');
const weatherError = document.querySelector('#weatherError');

const wPlaceName = document.querySelector('#wPlaceName');
const wDescription = document.querySelector('#wDescription');
const wTemp = document.querySelector('#wTemp');
const wHumidity = document.querySelector('#wHumidity');
const wWind = document.querySelector('#wWind');

async function fetchLiveWeather(place) {
    if (!place) return;
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(place)}&units=metric&appid=${weatherApiKey}`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            weatherError.style.display = "block";
            weatherDisplay.style.display = "none";
            return;
        }

        const data = await response.json();

        wPlaceName.textContent = data.name;
        wDescription.textContent = data.weather[0].description;
        wTemp.textContent = Math.round(data.main.temp);
        wHumidity.textContent = `${data.main.humidity}%`;
        wWind.textContent = `${data.wind.speed} m/s`;

        weatherDisplay.style.display = "block";
        weatherError.style.display = "none";

    } catch (err) {
        console.error("Network or internal response issue:", err);
    }
};

weatherSearchButton.addEventListener('click', () => {
    fetchLiveWeather(weatherPlaceInput.value.trim());
});

weatherPlaceInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        fetchLiveWeather(weatherPlaceInput.value.trim());
    }
});

var ProtonClose = document.querySelector("#Protonclose");
ProtonClose.addEventListener("click", function() {
  closeWindow(ProtonImage);
});