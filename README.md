# fetchback

fetch state tracker.

# Usage

```ts
import { fetchback } from 'fetchback';

fetchback(() => {
  return fetch('https://example.com').then(res => res.json());
})(state => {
  switch (state.state) {
    case 'loading': {
      break;
    }
    case 'success': {
      break;
    }
    case 'failure': {
      break;
    }
  }
});
```

# How useful is this?

You can update React application's state with the searializable object on each fetchback callback.

