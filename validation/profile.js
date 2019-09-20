const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";
    data.status = !isEmpty(data.status) ? data.status : "";

    if (!validator.isLength(data.handle, {min: 4, max: 20})) {
        errors.handle = "Handle must be between 2 to 20 characters";
    }

    if (validator.isEmpty(data.handle)) {
        errors.handle = "Profile Handle is required";
    }
    
    if (validator.isEmpty(data.status)) {
        errors.status = "Status field is required";
    }
    
    if (validator.isEmpty(data.skills)) {
        errors.skills = "Skills field is required";
    }

    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = 'Invalid URL';
        }
    }

    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = 'Invalid URL';
        }
    }

    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = 'Invalid URL';
        }
    }

    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram = 'Invalid URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};