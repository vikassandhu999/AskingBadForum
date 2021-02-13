import bcrypt from "bcrypt";

export interface ICustomerPasswordProps {
    password: string;
    hashed?: boolean;
}

export class CustomerPassword {

    get value(): string {
        return this.password;
    }

    public isHashed(): boolean {
        return this.hashed;
    }

    private readonly password: string;
    private readonly hashed: boolean;

    private constructor(props: ICustomerPasswordProps) {
        this.password = props.password;
        this.hashed = props.hashed ?? false;
    }

    public async compare(plainPassword: string): Promise<boolean> {
        if (this.hashed) {
            return this.bcryptCompare(plainPassword, this.password);
        } else {
            return plainPassword === this.password;
        }
    }

    public async hash(): Promise<string> {
        if (this.hashed) {
            return this.password;
        } else {
            return await this.bcryptHash(this.password);
        }
    }

    private bcryptCompare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            return bcrypt.compare(plainPassword, hashedPassword, (err: Error, same: boolean) => {
                if (err) return reject(err);
                resolve(same);
            });
        });
    }

    private bcryptHash(plainPassword: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            return bcrypt.hash(plainPassword, 10, (err: Error, encrypted: string) => {
                if (err) return reject(err);
                resolve(encrypted);
            });
        });
    }

    public static make(props: ICustomerPasswordProps): CustomerPassword {
        return new CustomerPassword({
            password: props.password,
            hashed: !!props.hashed
        });
    }
}