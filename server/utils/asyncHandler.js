const asyncHandler  = (requestHandler) => {
 try {
       return (req, res ,next) =>{
           Promise.resolve(requestHandler(req,res,next))
                   .catch((err)=>next(err))
       }
 } catch (error) {
    console.log("Hello");
    
    console.log(error);
 }
};


module.exports = {asyncHandler}