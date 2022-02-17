# @locmod/local-storage

Use this package to control `localStorage` and `sessionStorage`.
It handles all possible errors and provides a fallback in form of `MemoryStorage`.

This package works only on client side and will throw an error if you use try to use it on server-side.
More info in SSR section.

## Usage

Import default export from `local-storage` package and use directly.

```tsx
import React, { useEffect, useMemo } from 'react'
import localStorage from 'local-storage'

const StoragePage = () => {
  if (__SERVER) {
    return null 
  }

  const { value = 1, lastUpdate } = localStorage.getSessionItem<{ value: number, lastUpdate: string }>('counter') || {}

  useEffect(() => {
    localStorage.setSessionItem('counter', { value: value + 1, lastUpdate: (new Date).toISOString() })
  }, [])

  return (
    <div>Local storage: {value}, lastUpdate: {lastUpdate}</div>
  )
}


export default StoragePage
```

If you just want to update localStorage item, please read the previous value inside callback:

```tsx
useEffect(() => {
  const { value = 1 } = localStorage.getSessionItem<{ value: number }>('counter') || {}

  localStorage.setSessionItem('counter', { value: value + 1, lastUpdate: (new Date).toISOString() })
}, [])
```

## SSR

If your page depends on localStorage we can't render it on the server side, because of unknown state.
So you should disable component's render on server side:

```tsx {2-4}
const StoragePage = () => {
  if (__SERVER) {
    return <StoragePageSkeleton />
  }

  // client side rendering
  const { value = 1, lastUpdate } = localStorage.getSessionItem<{ value: number, lastUpdate: string }>('counter') || {}

  return (
    ...
  )
}    
```

## API

### getItem

Return item from `localStorage` by key. You can pass types for the value.

```ts
const counter = localStorage.getItem<number>('counter')
``` 

Library doesn't provide default values. You need to do it by your own.

```ts
const { step = 0, finished = false } = localStorage.getItem<{ step: number, finished: boolean }>('data') || {}
```

### setItem

Saves value to `localStorage` by key. You can save primitives and objects.

```ts
localStorage.setItem<number>('counter', 42)
```

```ts
localStorage.setItem<{ value: number, lastUpdate: string }>('data', { 
  value: value + 1, 
  lastUpdate: (new Date).toISOString(), 
})
```

### removeItem

Removes item from `localStorage` by key.

```ts
localStorage.removeItem('data')
````

### getKeys

Returns key list stored in `localStorage`. It can be useful for removing items by prefixes.

```ts
const keys = localStorage.getKeys()

// keys = [ 'counter', 'data' ]
````

### getSessionItem

The same as `getItem` but for `sessionStorage`.

### setSessionItem

The same as `setItem` but for `sessionStorage`.

### removeSessionItem

The same as `removeItem` but for `sessionStorage`.

### getSessionKeys

The same as `getKeys` but for `sessionStorage`.
