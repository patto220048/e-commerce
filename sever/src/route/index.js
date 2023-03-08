

const registerRoute = require('./register')
const userRoute = require('./user')

function route(app){

    app.use('/api/auth',registerRoute)
    app.use('/api/user',userRoute)



}
module.exports = route;