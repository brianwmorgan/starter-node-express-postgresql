const lodash = require("lodash");

function mapProperties(configuration) {
  return (data) => {
    if (data) {
      return Object.entries(data).reduce((accumulator, [key, value]) => {
        return lodash.set(accumulator, configuration[key] || key, value);
      }, {});
    }
    return data;
  };
}

module.exports = mapProperties;

// The above code accepts a configuration parameter which is an object where the key specifies...
// ... the original property name and the value specifies the new property name.
// The 'mapProperties()' function returns a new function that can be used over and over to modify multiple data objects.