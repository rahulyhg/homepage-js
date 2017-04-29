# My own personal homepage

I created this web application to replace iGoogle, which I really enjoyed using but haven't quite found a replacement for. 

It is currently hosted at [ckeele.com](http://ckeele.com). 

### Features

The site has a Google search bar and shows [NASA's Astronomy Picture of the Day](https://apod.nasa.gov/), as well as a randomly selected image of Earth from a recent day, taken by [NASA's Earth Polychromatic Imaging Camera](https://epic.gsfc.nasa.gov/). This camera sits aboard the Deep Space Climate Observatory, which orbits Earth at the Sun-Earth L<sub>1</sub> Lagrangian point. 

There is also a section for the local weather conditions for all U.S. zip codes, provided by [Weather Underground](https://www.wunderground.com). Included here are the forecast for the following week, the current day's rise and set times for both the sun and the moon, and the phase and illumination of the moon. 

### Technologies Used

The site uses AngularJS version 1.6.2, which interacts with an API done with Lumen by Laravel. The views are optimized for both mobile devices and desktops. I have created all stylesheets from scratch, rather than using Bootstrap. 

All of the content of the site is retrieved from external APIs using the Guzzle HTTP client for PHP.

### Accessibility 

I aim to have my site be as compliant with WCAG 2.0 guidelines as possible. To that effect, I've implemented the following:

1. When opening a modal, focus is automatically moved to the button to close the modal. 
2. When a modal is closed, focus returns to where it was when the modal was opened.
3. Opening a modal is possible using either the space or enter key. 
4. Upon changing temperature in the weather section from Fahrenheit to Celsius, or vice versa, focus automatically moves to the newly revealed link to change the temperature again. 
5. Upon entering a valid zip code and the weather forecast is shown, focus is moved to the link to reset the zip code. 
6. tabIndex values for the landing page are dynamically set to -1 when a modal window is open, while the tabIndex values for modal content is set to -1 when a modal is not open. 
7. The same is true for aria-hidden values. Content on the main page is hidden when a modal is open.
8. Images have descriptive alt values. 
