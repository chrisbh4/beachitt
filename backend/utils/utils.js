const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })
const cookieParser = require('cookie-parser')

const asyncHandler = (handler) => {
    return (req, res, next) => {
        return handler(req, res, next).catch(next)
    }
}

const dataAdjuster = (obj) =>{
    const organizedData = {}
    obj.forEach((data)=>{
        if(!organizedData[data.id]){
            organizedData[data.id] = data;
        }else{
            return
        }
    })

    return organizedData
}



module.exports = { csrfProtection, asyncHandler, dataAdjuster }
