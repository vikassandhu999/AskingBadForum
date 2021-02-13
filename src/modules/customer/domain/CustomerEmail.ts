export class CustomerEmail {

    get value(): string {
        return this.email;
    }

    private readonly email: string;

    private constructor(email: string) {
        this.email = email;
    }

    public static make(email: string): CustomerEmail {
        return new CustomerEmail(email);
    }

}