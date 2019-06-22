const jison = require('jison-gho');
const getOptions = require('loader-utils').getOptions;
const validateOptions = require('schema-utils');

const schema = {
    type: 'object',
    properties: {
        json: {
            /* jison will expect a grammar in either JSON/JSON5 or
               JISON format: the precise format is autodetected. */
            type: 'boolean'
        },
        throwErrorOnCompileFailure: {
            /* Throw an exception when the generated source code fails
               to compile in the JavaScript engine. **WARNING**: Turning this
               feature OFF permits the code generator to produce non-working
               source code and treat that as SUCCESS. This MAY be desirable
               code generator behaviour, but only rarely. */
            type: 'boolean'
        },
        parserType: {
            /* The type of algorithm to use for the parser.
               Choices: ['lr0', 'slr', 'lalr', 'lr', 'll']. */
            type: 'string'
        },
        hasDefaultResolve: {
            /* Turn this OFF to make jison act another way when a conflict is found
               in the grammar. */
            type: 'boolean'
        },
        hasPartialLrUpgradeOnConflict: {
            /* When enabled, the grammar generator attempts to resolve LALR(1)
               conflicts by, at least for the conflicting rules, moving towards
               LR(1) behaviour. */
            type: 'boolean'
        },
        hasTryCatch: {
            /* Generate a parser which catches exceptions from the grammar action
               code or parseError error reporting calls using a try/catch/finally
               code block. When you turn this OFF, it will produce a slightly faster
               parser at the cost of reduced code safety. */
            type: 'boolean'
        }
    }
  };

module.exports = function(jisonSource) {
    const options = getOptions(this);
    if (options != null) 
        validateOptions(schema, options, 'Jison-gho Loader');

    const parser = new jison.Generator(jisonSource, /* optionalLexSection */ null, options);
    const sourceCode = parser.generate(options);
    return sourceCode;
};
