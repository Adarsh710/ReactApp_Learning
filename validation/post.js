const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : "";
    
    if (!validator.isLength(data.text, {min: 2, max: 300})) {
        errors.text = "Text must be between 2 to 300 characters";
    }
    
    if (validator.isEmpty(data.text)) {
        errors.text = "Text is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};