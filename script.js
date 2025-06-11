let currentTimer;
let currentInterval;
let timeZoneInput = "";
let currentHourFormat;
let currentTimeZone;
let timeZones = [
    {zoneName: "America/New_York"},
    {zoneName: "America/Chicago"},
    {zoneName: "America/Los_Angeles"},
    {zoneName: "America/Denver"},
    {zoneName: "America/Phoenix"},
    {zoneName: "America/Mexico_City"},
    {zoneName: "America/Sao_Paulo"},
    {zoneName: "Europe/London"},
    {zoneName: "Europe/Paris"},
    {zoneName: "Europe/Berlin"},
    {zoneName: "Europe/Moscow"},
    {zoneName: "Africa/Cairo"},
    {zoneName: "Africa/Johannesburg"},
    {zoneName: "Asia/Dubai"},
    {zoneName: "Asia/Tokyo"},
    {zoneName: "Asia/Shanghai"},
    {zoneName: "Asia/Hong_Kong"},
    {zoneName: "Asia/Singapore"},
    {zoneName: "Asia/Seoul"},
    {zoneName: "Asia/Kolkata"},
    {zoneName: "Asia/Tehran"},
    {zoneName: "Asia/Jerusalem"},
    {zoneName: "Australia/Sydney"},
    {zoneName: "Australia/Melbourne"},
    {zoneName: "Australia/Brisbane"},
    {zoneName: "Australia/Perth"},
    {zoneName: "Pacific/Auckland"},
    {zoneName: "Pacific/Honolulu"},
    {zoneName: "Pacific/Guam"},
    {zoneName: "Pacific/Fiji"},
    {zoneName: "Pacific/Port_Moresby"},
    {zoneName: "Pacific/Tongatapu"},
    {zoneName: "Atlantic/Azores"},
    {zoneName: "Atlantic/Cape_Verde"},
    {zoneName: "Indian/Maldives"},
    {zoneName: "Indian/Mauritius"}
];
let themes = [
    {theme: "Color's Fading"},
    {theme: "Matrix"}
];

function startTimer(duration) {
    // Clear any existing interval
    if (currentTimer) {
        clearInterval(currentTimer);
    }
    
    let timer = duration;
    currentTimer = setInterval(function () {
        let seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            getColor();
            timer = duration; // Reset the timer instead of clearing the interval
        }
    }, 1000);
}

function updateTime(timeZone, hourFormat) {
    const now = new Date();
    let selectedTimeZone = timeZone;
    const timeString = now.toLocaleTimeString([], { 
        timeZone: selectedTimeZone,
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hourCycle: hourFormat ? 'h24' : 'h12'
    })
    document.getElementById('time-display').textContent = timeString;
    return timeString;
}

async function getColor() {
    try {
        let prevColor = document.body.style.backgroundColor;
        // Generate random hex color
        const randomHex = Math.floor(Math.random()*16777215).toString(16);
        const response = await fetch(`https://www.thecolorapi.com/id?hex=${randomHex}`);
        const data = await response.json();
        const pickedColor = data.hex.value;
    
        document.body.style.transition = "background-color 3s";
        document.body.style.backgroundColor = pickedColor;
    } catch (error) {
        console.log(error);
    }
};

window.onload = function () {
    let duration = 10; //sets the duration of the timer to 10 seconds
    // Start timer and get initial color on page load
    getColor();
    startTimer(duration);

    currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (Intl.DateTimeFormat().resolvedOptions().hourCycle === 'h12') {
        currentHourFormat = false;
    } else {
        currentHourFormat = true;
    }
    document.getElementById("current-time-zone").textContent = currentTimeZone.replace("/", ", ").replace("_", " ");

    currentInterval = setInterval(() => updateTime(currentTimeZone, currentHourFormat), 1000); // Update every second
    updateTime(currentTimeZone, currentHourFormat);
};

function addTimeZone(timeZone) {
    currentTimeZone = timeZone;
    console.log(currentTimeZone);
    switch (true) {
        case currentTimeZone === "" || timeZone.includes(", "):
            timeZoneInput = "";
            document.querySelector("#add-zone-input").value = "";
            throw new Error("Time zone could not be added");
        case currentTimeZone === timeZones.zoneName:
            timeZoneInput = "";
            document.querySelector("#add-zone-input").value = "";
            throw new Error("Time zone already exists");
        case currentTimeZone.includes(" "):
            timeZone = timeZone.replace(" ", "_");
            break;
        case currentTimeZone.includes(","):
            timeZone = timeZone.replace(",", "/");
            break;
    }
    console.log(timeZone);

    try {
        document.getElementById("current-time-zone").textContent = currentTimeZone.replace("/", ", ").replace("_", " ");
        clearInterval(currentInterval);
        currentInterval = setInterval(() => updateTime(currentTimeZone, currentHourFormat), 1000);
        updateTime(currentTimeZone, currentHourFormat);
        timeZoneInput = "";
        document.querySelector("#add-zone-input").value = "";
    } catch (error) {
        console.log("The time zone " + currentTimeZone + " could not be added: ", error);
    }
};

document.querySelector(".hamburger-menu").addEventListener('click', function(){
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".hamburger-menu-nav");
    
    hamburgerMenu.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Reset other menus when closing
    if (!navMenu.classList.contains("active")) {
        document.querySelector(".zones").classList.remove("active");
        document.querySelector(".themes").classList.remove("active");
    }
});

document.getElementById("time").addEventListener('click', function(){
    document.getElementById("time-display").classList.toggle("active");
    closeAllMenus();
});

document.getElementById("zone").addEventListener('click', function(){
    document.querySelector(".zones").classList.toggle("active");

    document.querySelector(".themes").classList.remove("active");
});

document.getElementById("theme").addEventListener('click', function(){
    document.querySelector(".themes").classList.toggle("active");

    document.querySelector(".zones").classList.remove("active");
});

const showZoneOptions = timeZones.map((zoneIndex) => {
    let textZoneName = zoneIndex.zoneName.replace("/", ", ").replace("_", " ");
    return `<li id="zone-option">${textZoneName}</li>`;
}).join("");
document.querySelector(".zones").innerHTML = `<label for="add-zone-input">Jump to a timezone</label><li id="add-zone"><input type="text" id="add-zone-input" placeholder="eg region/city"/><button id="add-zone-btn"><i class="fa-solid fa-plus"></i></button></li>` + showZoneOptions;

function changeTimeZoneInput(e) {
    timeZoneInput = e.target.value;
}
document.querySelector("#add-zone-input").addEventListener('input', changeTimeZoneInput);
// {zoneName: "Europe/Prague"}

document.querySelector("#add-zone-btn").addEventListener('click', () => {addTimeZone(timeZoneInput); closeAllMenus();});

const showThemeOptions = themes.map((themeIndex) => {
    return `<li id="theme-option">${themeIndex.theme}</li>`;
}).join("");
document.querySelector(".themes").innerHTML = showThemeOptions;

// Get all timezone option elements
const zoneOptions = document.querySelectorAll("#zone-option");

// Add click handler to each option
zoneOptions.forEach((option) => {
    option.addEventListener('click', function() {
        const selectedText = this.textContent;

        for (let i = 0; i < timeZones.length; i++) {
            const formattedZone = timeZones[i].zoneName.replace("/", ", ").replace("_", " ");
            if (selectedText === formattedZone) {
                currentTimeZone = timeZones[i].zoneName;
                break;
            }
        }

        if (currentTimeZone) {
            document.getElementById("current-time-zone").textContent = currentTimeZone.replace("/", ", ").replace("_", " ");
            // Clear existing interval and start new one with selected timezone
            clearInterval(currentInterval);
            currentInterval = setInterval(() => updateTime(currentTimeZone, currentHourFormat), 1000);
            updateTime(currentTimeZone, currentHourFormat);
        }
        
        // Close all menus
        closeAllMenus();
    });
});

document.getElementById("hour-format").addEventListener('click', function(){
    document.getElementById("hour-format").classList.toggle("active");
    document.getElementById("hour-format-hover").classList.remove("active");

    currentHourFormat = !currentHourFormat;
    clearInterval(currentInterval);
    currentInterval = setInterval(() => updateTime(currentTimeZone, currentHourFormat), 1000);
    updateTime(currentTimeZone, currentHourFormat);

    document.getElementById("hour-format-hover").classList.remove("active");
    document.getElementById("hour-format-hover").textContent = "";
});

document.getElementById("hour-format").addEventListener('mouseover', function(){
    document.getElementById("hour-format-hover").classList.add("active");
    
    setTimeout(() => {
        document.getElementById("hour-format").classList.contains("active") ? document.getElementById("hour-format-hover").textContent = `12-hour` : document.getElementById("hour-format-hover").textContent = `24-hour`;
    }, 250);
});

document.getElementById("hour-format").addEventListener('mouseout', function(){
    document.getElementById("hour-format-hover").classList.remove("active");
    document.getElementById("hour-format-hover").textContent = "";
});

// Get all theme option elements
const themeOptions = document.querySelectorAll("#theme-option");

// Add click handler to each theme option
themeOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Close all menus
        closeAllMenus();
    });
});

function closeAllMenus() {
    document.querySelector(".hamburger-menu").classList.remove("active");
    document.querySelector(".hamburger-menu-nav").classList.remove("active");
    document.querySelector(".zones").classList.remove("active");
    document.querySelector(".themes").classList.remove("active");
    document.getElementById("hour-format-hover").classList.remove("active");
}
