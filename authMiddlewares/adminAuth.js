import jwtVerify from "../helpers/jwitVerify.js";

 async function adminAuth(req,res,next){
    try {
        console.log('admin auth');
        const token= req.headers.authentication
        console.log(token);
        const authorized=jwtVerify(token)
        console.log(authorized.role);
        if (authorized.role==="Admin") {
            console.log('nest');
            next()
        }else{
            res.status(401).json({success:false,message:'unauthorized'})

        }

    } catch (error) {
        console.log('Authorization Error ',error);
        res.status(401).json({success:false,message:'Authorization error'})
    }
}


export default adminAuth