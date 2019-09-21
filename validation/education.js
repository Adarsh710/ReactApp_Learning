const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.stream = !isEmpty(data.stream) ? data.stream : "";
    data.from = !isEmpty(data.from) ? data.from : "";
    
    if (validator.isEmpty(data.school)) {
        errors.school = "School/ College/ University name is required";
    }
    
    if (validator.isEmpty(data.degree)) {
        errors.degree = "Degree name is required";
    }

    if (validator.isEmpty(data.stream)) {
        errors.stream = "Steram is required";
    }

    if (validator.isEmpty(data.from)) {
        errors.from = "From field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};