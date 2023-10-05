const validationTemplate = {
    "username": {
        "required": true,
        "errorMessageRequired": "This field is mandatory",
        "type": "alphabets",
        "errorMessageType": "Only Alphabets are allowed",
        "length": {
            min: 3,
            max: 64,
            message: "Minimum 3 chars, and maximum of 64 chars"
        }
    },
    "gender": {
        "required": true,
        "options": ['M', 'F', 'T']
    },
    "dob": {
        "required": true,
        "type": "date",
        "format": {
            "pattern": "dd-MM-yyyy",
            "message": "pattern should be thsi "
        },
        "constraints": {
            "minYear": 18
        },
        "range": {
            "start": "01-01-1900",
            "end": "01-01-2005"
        }
    },
    "email": {
        "required": true,
        "type": "email",
        "errorMessageType": "Invalid Email Address",
        "length": {
            max: 64,
            message: "Maximum of 64 chars"
        }
    },
    "phoneNumber": {
        "required": true,
        "type": "mobilePhone",
        "errorMessageType": "Invalid Phone Number",
    },
    "address": {
        "required": true,
        "type": "string",
        "length": {
            max: 256,
            message: "Maximum of 256 chars"
        }
    },
    "port": {
        "required": true,
        "type": "port",
        "errorMessageType": "Invalid Port Number",
    },
    "ipAddress": {
        "required": true,
        "type": "ip",
        "errorMessageType": "Invalid IP Address",
    }
};

export default validationTemplate;