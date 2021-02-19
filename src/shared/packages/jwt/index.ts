import jwt from "jsonwebtoken";

export class JWT {
    public static createToken(payload : Object,secret : string,expiryTime : number) : string {
          return jwt.sign(payload,secret,{algorithm : "HS256",expiresIn : expiryTime});
    }

    public static verify(token : string,secret : string) : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            return jwt.verify(token , secret, (err, decoded) => {
                if(err) return reject(err);
                resolve(decoded);
            });
        });
    }
}