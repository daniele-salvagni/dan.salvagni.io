---
title: react
---

## Updating a state object

### Through Input

```jsx
const [state, setState] = useState({ fName: "", lName: "" });
const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
};

<input
    value={state.fName}
    type="text"
    onChange={handleChange}
    name="fName"
/>
<input
    value={state.lName}
    type="text"
    onChange={handleChange}
    name="lName"
/>
```

### Through onSublit or Button click

```jsx
setState((prevState) => ({
  ...prevState,
  fName: 'your updated value here'
}));
```

https://stackoverflow.com/a/61243124/6229924
