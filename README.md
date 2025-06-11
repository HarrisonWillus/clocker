# Clocker

Clocker is a modern, interactive web application that displays time across different time zones with a beautiful, color-changing background. It's a perfect tool for anyone who needs to keep track of time across multiple regions or just wants a visually appealing clock interface.

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

## Contributing

Feel free to fork this repository and submit pull requests to contribute to this project. Some areas for potential improvement:
- Additional themes
- More time zone features
- Custom color schemes
- Offline support

## License

This project is open source and available for personal and commercial use. 