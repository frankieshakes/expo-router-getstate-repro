# expo-router 58: `getState()` in a `state` listener returns the previous state

```sh
npm install
npm test
```

On SDK 58 the test fails: `getState()` returns `['index', 'sheet']` while `event.data.state` has `['index', 'sheet', 'detail']`.

The same test passes on SDK 57 (expo 57.0.11, expo-router 57.0.12).

`.npmrc` sets `legacy-peer-deps` because react-native 0.88 is an RC and falls outside most peer ranges.
