// Global variables for managing timers and intervals
let currentTimer;      // Stores the timer for background color changes
let currentInterval;   // Stores the interval for time updates

// Array of time zones with their IANA names
// This serves as the initial list before fetching from the API
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
 * Starts a timer that triggers background color changes at specified intervals
 * @param {number} duration - The interval duration in seconds
 */
function startTimer(duration) {
    // Clear any existing interval to prevent multiple timers
    if (currentTimer) {
        clearInterval(currentTimer);
    }
    
    let timer = duration;
    currentTimer = setInterval(function () {
        let seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds; // Add leading zero if needed

        if (--timer < 0) {
            getColor();           // Change background color
            timer = duration;     // Reset the timer
        }
    }, 1000);
}

/**
 * Fetches all available time zones and updates the UI
 * @param {string} timeZone - The currently selected time zone
 */
async function updateTime(timeZone) {
    try {
        // Fetch all time zones from the World Time API
        const response = await fetch('http://worldtimeapi.org/api/timezone');
        const allTimeZones = await response.json();
        
        // Update the global timeZones array with fetched data
        timeZones = allTimeZones.map(zoneName => ({ zoneName }));
        
        // Update the zones list in the UI with formatted zone names
        const showZoneOptions = timeZones.map((zoneIndex) => {
            let textZoneName = zoneIndex.zoneName.replace("/", ", ").replace("_", " ");
            return `<li id="zone-option">${textZoneName}</li>`;
        }).join("");
        document.querySelector(".zones").innerHTML = showZoneOptions;
        
        // Re-attach event listeners to the new zone options
        const zoneOptions = document.querySelectorAll("#zone-option");
        zoneOptions.forEach((option) => {
            option.addEventListener('click', function() {
                let newTimeZone;
                const selectedText = this.textContent;
                
                // Find the selected time zone in our array
                for (let i = 0; i < timeZones.length; i++) {
                    const formattedZone = timeZones[i].zoneName.replace("/", ", ").replace("_", " ");
                    if (selectedText === formattedZone) {
                        newTimeZone = timeZones[i].zoneName;
                        break;
                    }
                }
                
                // Update the display if a valid time zone was selected
                if (newTimeZone) {
                    document.getElementById("current-time-zone").textContent = newTimeZone.replace("/", ", ").replace("_", " ");
                    clearInterval(currentInterval);
                    currentInterval = setInterval(() => updateTime(newTimeZone), 1000);
                    updateTimeDisplay(newTimeZone);
                }
                
                // Close all menus after selection
                document.querySelector(".hamburger-menu").classList.remove("active");
                document.querySelector(".hamburger-menu-nav").classList.remove("active");
                document.querySelector(".zones").classList.remove("active");
                document.querySelector(".themes").classList.remove("active");
            });
        });
        
        // Update the time display for the current time zone
        updateTimeDisplay(timeZone);
    } catch (error) {
        console.error('Error fetching time zones:', error);
        // Fallback to just updating the time display if API call fails
        updateTimeDisplay(timeZone);
    }
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
 * Generates a random color and updates the background with a smooth transition
 */
async function getColor() {
    try {
        // Generate random hex color
        const randomHex = Math.floor(Math.random()*16777215).toString(16);
        // Get color information from the Color API
        const response = await fetch(`https://www.thecolorapi.com/id?hex=${randomHex}`);
        const data = await response.json();
        const pickedColor = data.hex.value;
    
        // Apply the new color with a transition effect
        document.body.style.transition = "background-color 3s";
        document.body.style.backgroundColor = pickedColor;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Initialize the application when the page loads
 */
window.onload = function () {
    let duration = 10; // Duration between color changes (in seconds)
    // Initialize background color and timer
    getColor();
    startTimer(duration);

    // Get and display the user's local time zone
    startingTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById("current-time-zone").textContent = startingTimeZone.replace("/", ", ").replace("_", " ");

    // Start updating the time display
    currentInterval = setInterval(() => updateTime(startingTimeZone), 1000);
    updateTime(startingTimeZone);
};

// Event Listeners for UI Navigation

// Toggle hamburger menu
document.querySelector(".hamburger-menu").addEventListener('click', function(){
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".hamburger-menu-nav");
    
    hamburgerMenu.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Reset other menus when closing hamburger menu
    if (!navMenu.classList.contains("active")) {
        document.querySelector(".zones").classList.remove("active");
        document.querySelector(".themes").classList.remove("active");
    }
});

// Toggle time display visibility
document.getElementById("time").addEventListener('click', function(){
    document.getElementById("time-display").classList.toggle("active");
    document.querySelector(".hamburger-menu").classList.remove("active");
    document.querySelector(".hamburger-menu-nav").classList.remove("active");
});

// Toggle time zones menu
document.getElementById("zone").addEventListener('click', function(){
    document.querySelector(".zones").classList.toggle("active");
    document.querySelector(".themes").classList.remove("active");
});

// Toggle themes menu
document.getElementById("theme").addEventListener('click', function(){
    document.querySelector(".themes").classList.toggle("active");
    document.querySelector(".zones").classList.remove("active");
});

// Initialize UI Elements

// Populate time zones dropdown
const showZoneOptions = timeZones.map((zoneIndex) => {
    let textZoneName = zoneIndex.zoneName.replace("/", ", ").replace("_", " ");
    return `<li id="zone-option">${textZoneName}</li>`;
}).join("");
document.querySelector(".zones").innerHTML = showZoneOptions;

// Populate themes dropdown
const showThemeOptions = themes.map((themeIndex) => {
    return `<li id="theme-option">${themeIndex.theme}</li>`;
}).join("");
document.querySelector(".themes").innerHTML = showThemeOptions;

// Event Handlers for Time Zone Selection

// Get all timezone option elements
const zoneOptions = document.querySelectorAll("#zone-option");

// Add click handler to each time zone option
zoneOptions.forEach((option) => {
    option.addEventListener('click', function() {
        let newTimeZone;
        const selectedText = this.textContent;

        // Find the selected time zone
        for (let i = 0; i < timeZones.length; i++) {
            const formattedZone = timeZones[i].zoneName.replace("/", ", ").replace("_", " ");
            if (selectedText === formattedZone) {
                newTimeZone = timeZones[i].zoneName;
                break;
            }
        }

        // Update the display if a valid time zone was selected
        if (newTimeZone) {
            document.getElementById("current-time-zone").textContent = newTimeZone.replace("/", ", ").replace("_", " ");
            clearInterval(currentInterval);
            currentInterval = setInterval(() => updateTime(newTimeZone), 1000);
            updateTime(newTimeZone);
        }
        
        // Close all menus after selection
        document.querySelector(".hamburger-menu").classList.remove("active");
        document.querySelector(".hamburger-menu-nav").classList.remove("active");
        document.querySelector(".zones").classList.remove("active");
        document.querySelector(".themes").classList.remove("active");
    });
});

// Event Handlers for Theme Selection

// Get all theme option elements
const themeOptions = document.querySelectorAll("#theme-option");

// Add click handler to each theme option
themeOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Close all menus after selection
        document.querySelector(".hamburger-menu").classList.remove("active");
        document.querySelector(".hamburger-menu-nav").classList.remove("active");
        document.querySelector(".zones").classList.remove("active");
        document.querySelector(".themes").classList.remove("active");
        document.querySelector(".hamburger-menu-nav").classList.remove("active");
    });
});