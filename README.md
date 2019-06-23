# jison-gho-loader
A loader for webpack which transforms .jison files into JS code.

## Usage
Install the package using `npm`:
```console
$ npm install jison-gho-loader --save-dev
```

### Ad-hoc use
```js
// RequireJS
const parser = require('jison-gho-loader!./grammar.jison').parser;

// import/export
import {parser} from 'jison-gho-loader!./grammar.jison';

const result = parser.parse(input_to_parse);
```

### Webpack config
Your `webpack.config.js` should contain:
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.jison$/,
                use: 'jison-gho-loader'
            }
        ]
    }
}
```

And then just import the `grammar.jison` without loader prefix:
```js
// RequireJS
const parser = require('./grammar.jison').parser;

// import/export
import {parser} from './grammar.jison';

const result = parser.parse(input_to_parse);
```

### Options
You can specify options that can be sent to the `jison-gho` like which parser type to use
(lalr, ll, lr, etc). Example:
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.jison$/,
                use: {
                    loader: 'jison-gho-loader',
                    options: { parserType: 'lr0' }
                }
            }
        ]
    }
}
```

All options can be found in the `index.js` file. 

## License

MIT (http://www.opensource.org/licenses/mit-license.php)