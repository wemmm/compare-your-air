# Compare your Air

## Approach

I started by reading over the designs & requirements and broke the app down into smaller components:

- Autocomplete search box
- Card

That would then be rendered in:

- A main UI (App component)

Before starting work on individual components, I made a quick prototype in the jsx for the default App component. This helped me get the colours, fonts and general layout down, and from there I was able to pull out elements and place them into seperate component files.

I decided to work on the autocomplete search box initially as it seemed to be a more complex component than the card - it needed to display a list of possible suggestions filtered according to input. While I was building out the component, I used a hardcoded array of city names to ensure that results were displaying correctly and the styling was correct. I then wrote some tests for the component.

I then rendered my Searchbox component in the main App and wrote a function to fetch UK city names from the Open AQ API and store them in session storage so that they didn't need to be re-fetched on every page load. Once the list of city names was being displayed and filtered appropriately, I wrote a function to fetch a specific city's AQ data when its corresponding list item was clicked.

I passed the individual city data into my basic Card component and started to flesh out the info that was displayed, added the close button functionality and then styled and tested the component.

Once tests were all passing and the styling looked correct, I added a loading spinner to be displayed while the initial fetching of data was occurring - it's fairly quick but helpful for slow connections.

I used media queries to tweak the CSS for the narrower (mobile) view in the design document.

As I already had unit tests for the smaller components, I wanted to write some integration tests for the main app. This was more complicated as I needed to mock the window's `fetch` method with jest and set/get from session storage.

After some more refactoring & extra tests, I decided to call it a day. I've detailed some issues and changes I might have made with more time in the "Potential Improvements" section of this readme :)

## Test coverage

:tada:

```
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|-------------------
All files             |     100 |      100 |     100 |     100 |
 App                  |     100 |      100 |     100 |     100 |
  App.js              |     100 |      100 |     100 |     100 |
 components/Card      |     100 |      100 |     100 |     100 |
  Card.js             |     100 |      100 |     100 |     100 |
 components/Searchbox |     100 |      100 |     100 |     100 |
  Searchbox.js        |     100 |      100 |     100 |     100 |
----------------------|---------|----------|---------|---------|-------------------
```

## Assumptions

- The autocomplete suggestions assume that the user has entered the first letter of the desired city correctly, rather than displaying every single option containing a given letter. This is to prevent large numbers of very loose matches being returned from short searches.
- Based on the designs, I've assumed that the user is supposed to be able to compare a maximum of two cities, so I've limited the number of cards that can be displayed to two. I'm not 100% sure about this but it would be very easy to rectify if I'm mistaken! The maximum number of cards is set as a variable in the App component's `fetchAirQuality` function to make it easier to adjust. If a user has the ability to add a large number of cards, it might be nice to add a "remove all" button somewhere.

## Potential Improvements & Notes

- I've not had time to implement error handling, which I would definitely want in production code! I would check if API response statuses were ok, and if not, I would throw an error and display a flash message to the user.
- The card components don't have any sort of loading state. With more time, I would have liked to have a spinner display to make it clear to the user that the city data is in the process of being fetched.
- Relating to the aforementioned issue of not knowing if the number of cards was supposed to be limited: I wasn't too sure what the correct behaviour for the input should be when the maximum number of cards is reached. I haven't had time to implement it but the input could possibly be disabled, or a message shown to the user.
- I haven't added SASS to the project as it felt like overkill for a small codebase, but if this were larger it would have been nice to use SASS for nested selectors and setting/importing colour & sizing variables for consistency.
- I've visually checked the app on Safari, Firefox and Chrome - in a perfect world I would have tried this in more obscure browsers. I've also checked the layout on Chrome's preset phone model screen sizes, and checked the app is useable on throttled connections.

## To run locally:

Clone and navigate to the repo on the command line, then:

`npm i` to install the libraries.

`npm start` to start.

`npm t` if you'd like to run the tests.

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Libraries and Sources

- https://github.com/astrit/css.gg - icons
- date-fns - nice date formatting
- https://html-color-codes.info/colors-from-image/ - getting accurate hex codes from designs
- [Create React App](https://github.com/facebook/create-react-app) - bootstrapping
- Google Fonts - Open Sans font
- https://favicon.io/favicon-generator/ - generating favicon
- react-test-renderer - snapshot testing
