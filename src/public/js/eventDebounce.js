
const debounceEvent = (callback, wait = 500, time) => (...args) =>
    clearTimeout(time, time = setTimeout(() => callback(...args), wait))

export default debounceEvent; 
