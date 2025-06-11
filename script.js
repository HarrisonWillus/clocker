let currentTimer;
let currentInterval;
let timeZoneInput = "";
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

// Available themes for the application
let themes = [
    {theme: "Color's Fading"},
    {theme: "Matrix"}
];

/**
 * Helper function to format time zone names for display
 * @param {string} zoneName - The raw time zone name
 * @returns {string} Formatted time zone name
 */
function formatTimeZoneName(zoneName) {
    return zoneName.replace("/", ", ").replace("_", " ");
}

/**
 * Helper function to close all menus
 */
function closeAllMenus() {
    document.querySelector(".hamburger-menu").classList.remove("active");
    document.querySelector(".hamburger-menu-nav").classList.remove("active");
    document.querySelector(".zones").classList.remove("active");
    document.querySelector(".themes").classList.remove("active");
}

/**
 * Updates the time display for a specific time zone
 * @param {string} timeZone - The time zone to display time for
 * @returns {string} The formatted time string
 */
function updateTimeDisplay(timeZone) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
        timeZone: timeZone,
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hourCycle: 'h24'    // Use 24-hour format
    });
    document.getElementById('time-display').textContent = timeString;
    return timeString;
}

/**
 * Updates the time zone display and starts the time update interval
 * @param {string} newTimeZone - The time zone to switch to
 */
function switchTimeZone(newTimeZone) {
    document.getElementById("current-time-zone").textContent = formatTimeZoneName(newTimeZone);
    clearInterval(currentInterval);
    currentInterval = setInterval(() => updateTimeDisplay(newTimeZone), 1000);
    updateTimeDisplay(newTimeZone);
}

/**
 * Starts a timer that triggers background color changes at specified intervals
 * @param {number} duration - The interval duration in seconds
 */
function startTimer(duration) {
    if (currentTimer) {
        clearInterval(currentTimer);
    }
    
    let timer = duration;
    currentTimer = setInterval(function () {
        if (--timer < 0) {
            getColor();           // Change background color
            timer = duration;     // Reset the timer
        }
    }, 1000);
}

/**
 * Generates a random color and updates the background with a smooth transition
 */
async function getColor() {
    try {
        const randomHex = Math.floor(Math.random()*16777215).toString(16);
        const response = await fetch(`https://www.thecolorapi.com/id?hex=${randomHex}`);
        const data = await response.json();
        const pickedColor = data.hex.value;
    
        document.body.style.transition = "background-color 3s";
        document.body.style.backgroundColor = pickedColor;
    } catch (error) {
        console.log(error);
    }
}

// Initialize the application when the page loads
window.onload = function () {
    // Initialize background color and timer
    getColor();
    startTimer(10);

    // Set up initial time zone
    const startingTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    switchTimeZone(startingTimeZone);

    // Set up UI event listeners
    setupEventListeners();
};

function addTimeZone(timeZone) {
    console.log(timeZone);
    switch (true) {
        case timeZone === "" || timeZone.includes(", "):
            timeZoneInput = "";
            document.querySelector("#add-zone-input").value = "";
            throw new Error("Time zone could not be added");
        case timeZone === timeZones.zoneName:
            timeZoneInput = "";
            document.querySelector("#add-zone-input").value = "";
            throw new Error("Time zone already exists");
        case timeZone.includes(" "):
            timeZone = timeZone.replace(" ", "_");
            break;
        case timeZone.includes(","):
            timeZone = timeZone.replace(",", "/");
            break;
    }
    console.log(timeZone);

    try {
        document.getElementById("current-time-zone").textContent = timeZone.replace("/", ", ").replace("_", " ");
        clearInterval(currentInterval);
        currentInterval = setInterval(() => updateTime(timeZone), 1000);
        updateTime(timeZone);
        timeZoneInput = "";
        document.querySelector("#add-zone-input").value = "";
    } catch (error) {
        console.log("Time zone could not be added: ", error);
    }
};

document.querySelector(".hamburger-menu").addEventListener('click', function(){
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".hamburger-menu-nav");
    
    hamburgerMenu.classList.toggle("active");
    navMenu.classList.toggle("active");

        if (!navMenu.classList.contains("active")) {
            document.querySelector(".zones").classList.remove("active");
            document.querySelector(".themes").classList.remove("active");
        }
    });

    // Time display toggle
    document.getElementById("time").addEventListener('click', function() {
        document.getElementById("time-display").classList.toggle("active");
        closeAllMenus();
    });

    // Time zones menu toggle
    document.getElementById("zone").addEventListener('click', function() {
        document.querySelector(".zones").classList.toggle("active");
        document.querySelector(".themes").classList.remove("active");
    });

    // Themes menu toggle
    document.getElementById("theme").addEventListener('click', function() {
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

document.querySelector("#add-zone-btn").addEventListener('click', () => addTimeZone(timeZoneInput));

    // Populate themes dropdown
    const showThemeOptions = themes.map(theme => 
        `<li id="theme-option">${theme.theme}</li>`
    ).join("");
    document.querySelector(".themes").innerHTML = showThemeOptions;

    // Add click handlers to time zone options
    document.querySelectorAll("#zone-option").forEach(option => {
        option.addEventListener('click', function() {
            const selectedText = this.textContent;
            const newTimeZone = timeZones.find(tz => 
                formatTimeZoneName(tz.zoneName) === selectedText
            )?.zoneName;

            if (newTimeZone) {
                switchTimeZone(newTimeZone);
            }
            closeAllMenus();
        });
    });

    // Add click handlers to theme options
    document.querySelectorAll("#theme-option").forEach(option => {
        option.addEventListener('click', closeAllMenus);
    });
}