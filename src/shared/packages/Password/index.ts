import bcrypt from "bcrypt";

export default class Password {
    public static async hashPassword(plainText : string) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(plainText,10,(err : Error , hash : string) => {
                if(err) return reject(err);
                resolve(hash)
            })
        });
    }

    public static async compare(plainPassword : string , hash : string) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(plainPassword,hash , ((err, same) => {
                if(err) return reject(err);
                resolve(same);
            }));
        });
    }
}