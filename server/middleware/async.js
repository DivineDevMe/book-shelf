/**
 * Loaded in all route handlers using express-async-errors 
 * It receives the route handlers as args 
 * @param {*} handler 
 * 
 */
module.exports = function(handler){
    return async (req,res,next)=>{
        try {
            await handler(req,res)
        } catch (ex) {
            next(ex)
        }
    }
}