const jwt = require("jsonwebtoken");

const jsonWebToken=async(user)=>{
    console.log(user)
   
    const payload = {
        user: {
          id: user._id,
        },
      };

     await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        console.log(token)
        if (err){ return err}
        return token

      });
      console.log("test2")
      
}


module.exports={jsonWebToken}