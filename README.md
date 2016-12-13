# typical-function
typical-function is a javascript module to check the types of the parameters of a function.

# REQUIREMENT

###*ES6*

# USAGE

```javascript
    const func = require('typical-function');
    
    const test = func(String, Object, (a, b) => {
        console.log(a);
        console.log(b);
    });
    
    test('asd', {});//correct
    
    test(123, []);//error!
```
