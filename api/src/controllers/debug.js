const model = require('./model');


let resp = model.getRecipes();

resp.then( (res, rej) => {
    console.log(res)
})