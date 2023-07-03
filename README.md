# Travel Advisor

A project that showcases how I used Create-React-App to start a new frontend-only bootstrap project that is able to fetch and pull API requests from Trip Advisor and Google Maps.

The app features include framing a "Map" in the Map component to show the user's location. The center coordinates are based on the midpoint between the bottom left X-Y and the top right X-Y.

Once the center coordinates have been determined, the API sends a fetch request using the center coordinates to pull a list of Trip Advisor recommendations. 

# Filters

The pulled list of recommendations can be filtered into Hotels, Restaurants or Attractions. There is a secondary filter to sort by review ratings and number of reviews. This is determined by an additional code in the component that performs an array filter of the review object.

# Google Map Autofill API

Users can attempt to type in a country location such as "New.." and the Autofill function will complete it (similar to how Google Maps is used in real life) to say "New York" or "New Jersey"


