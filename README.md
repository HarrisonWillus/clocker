# Clocker

Clocker is a modern, interactive web application that displays time across different time zones with a beautiful, color-changing background. It's a perfect tool for anyone who needs to keep track of time across multiple regions or just wants a visually appealing clock interface.

---

## Table of Contents
- [Features](#features)
- [Technical Details](#technical-details)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Browser Support](#browser-support)
- [Dependencies](#dependencies)
- [FAQ / Troubleshooting](#faq--troubleshooting)
- [Contributing](#contributing)
- [Screenshots](#screenshots)
- [Credits](#credits)
- [License](#license)

---

## Features

- **Real-time Clock Display**: Shows current time in 24-hour format with seconds
- **Comprehensive Time Zone Support**: Includes major cities and regions:
  - Americas (New York, Chicago, Los Angeles, etc.)
  - Europe (London, Paris, Berlin, Moscow)
  - Asia (Dubai, Tokyo, Shanghai, Singapore, etc.)
  - Oceania (Sydney, Melbourne, Brisbane, Perth)
  - Pacific (Auckland, Honolulu, Fiji)
  - And many more!
- **Dynamic Background**: 
  - Background color changes automatically every 10 seconds
  - Smooth color transitions using the Color API
  - Beautiful fade effects for visual appeal
- **Responsive Design**: 
  - Works seamlessly on both desktop and mobile devices
  - Intuitive hamburger menu for navigation
  - Clean and modern interface
- **User-friendly Interface**: 
  - Quick time zone switching
  - Easy-to-read time display
  - Theme options available

## Technical Details

### Architecture

The application is built with vanilla JavaScript and follows these design principles:
- Modular code structure with clear separation of concerns
- Helper functions for common operations
- Efficient event handling
- Clean and maintainable code organization

### Key Components

1. **Time Management**
   - Real-time updates using `setInterval`
   - Timezone handling with the JavaScript Date API
   - Formatted time display with localization support

2. **UI Components**
   - Hamburger menu for navigation
   - Dropdown menus for time zones and themes
   - Dynamic time display
   - Smooth transitions for visual elements

3. **Color Management**
   - Random color generation
   - Integration with the Color API
   - Smooth background transitions

## File Structure

```
clocker/
├── index.html        # Main HTML file, entry point for the app
├── script.js         # Main JavaScript logic for time, UI, and color features
├── styles.css        # Styling and responsive design
├── favicon.png       # App icon
├── README.md         # Documentation (this file)
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your web browser
3. That's it! No additional setup required

## Usage

- Click the hamburger menu (☰) to access the main navigation
- Use the clock icon to toggle time display
- Use the globe icon to select different time zones
- Use the palette icon to access theme options

## Browser Support

Works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Dependencies

The application is built with pure HTML, CSS, and JavaScript. It uses:
- The Color API for dynamic background colors
- Native JavaScript Date API for time zone handling
- Modern CSS features for animations and transitions

## FAQ / Troubleshooting

**Q: The app doesn't display correctly on my phone?**
A: Please use landscape mode or a desktop browser for the best experience.

**Q: The background color doesn't change?**
A: Ensure you have an active internet connection, as the app fetches colors from an external API.

**Q: How do I add a custom time zone?**
A: Use the 'Jump to a timezone' input in the time zone menu. Enter in the format `Region/City` (e.g., `Europe/Prague`).

**Q: The clock is not updating?**
A: Try refreshing the page. If the issue persists, check your browser's JavaScript settings.

## Contributing

Feel free to fork this repository and submit pull requests to contribute to this project. Some areas for potential improvement:
- Additional themes
- More time zone features
- Custom color schemes
- Offline support

## Screenshots

*Add screenshots here to showcase the app UI. (You can add images by dragging them into this section or linking to hosted images.)*

## Credits
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for Orbitron and Roboto Condensed
- [The Color API](https://www.thecolorapi.com/) for dynamic background colors
- Inspired by modern clock and world time apps

## License

This project is open source and available for personal and commercial use. 