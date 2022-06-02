const jwt=require('jsonwebtoken')
const secretKey="meanstack2021"

const auth=async(req,res,next)=>{
    if(req.header('x-auth-token')){
        const token=req.header('x-auth-token')
        try{
            await jwt.verify(token,secretKey);
            next();
        }catch(err){
            res.status(401).json({
                message:"unauthorized request!! bad token"
            })
        }

    }else{
        res.status(401).json({
            message:"Unauthorized request!! Token missing"
        })
    }
}

module.exports = auth