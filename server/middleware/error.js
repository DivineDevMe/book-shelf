//error handling middlewire function of express
module.exports = function(err,req,res,next){
    console.log(`Error: ${err.message}`);
    res.status(500).send('Something went wrong');
}