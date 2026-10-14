# SpaceX Explorer

An Angular 21 app to browse past SpaceX launches, see the details of each one and mark favorites. State is handled with NgRx and the UI uses Angular Material.

The original assignment is in [INSTRUCTIONS.md](INSTRUCTIONS.md).

## Running the project

You need Node 20.19+, 22.12+ or 24+.

```bash
npm ci          # install dependencies
npm start       # dev server on http://localhost:4200
npm test        # unit tests
npm run build   # production build in dist/
```

### With Docker

```bash
docker build -t spacex-explorer .
docker run --rm -p 8080:80 spacex-explorer
```

Then open http://localhost:8080. The image builds the app with Node and serves it with nginx.

## What I did

- **NgRx effect:** the list no longer calls the service. Launches are loaded once when the app starts through an effect, and the pages only read from the store.
- **Details page:** available on `/launch/:id`. It also works when opening the URL directly.
- **Favorites:** kept in the store, so they stay the same when going back and forth between the list and the details.
- **Production setup:** lazy loaded routes (the initial bundle went from 560 kB to 320 kB), OnPush everywhere, store devtools only in dev mode, global error listeners.

## Issues I found in the original code

- The code used `id`, `name` and `success`, which don't exist in the JSON. The search crashed and every launch showed "Failure". There is no `id`, so the details route uses `flight_number`.
- The list stylesheet was never linked.
- The status chip colors didn't work with Material 3.
- `any` everywhere and the tests didn't compile.

## Some choices

- The search term is kept in a signal inside the list component, it's only UI state. The filtered list is a `computed()` that calls a pure function. Memoized selectors are used for the shared data (launches by flight number, favorites).
- Favorites survive navigation but not a page reload. Saving them in localStorage would be easy to add if needed.
- The API URL is not configurable because the app reads a local mock. With the real API I would add environment files for it.
