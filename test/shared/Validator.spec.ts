// @ts-ignore
import validate from "validate.js";

const schema = {
        email: {
            presence: true,
            email: true
        },
        password : {
            presence: true
        },
        hash : {
            presence : false
        }
}

const values = {
    email : "vikassandhmail.com",
    hash: "Sdfsdfsdf"
}

describe("validate.js" , ()=> {

    it("trying params" , () => {
        const result = validate(values, schema);
        console.log(result);
    });
});