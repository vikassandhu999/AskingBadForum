export class Context<T> implements IContext<T> {
    authLevel: number;
    isAuthenticated: boolean;
    claims?: T;

    constructor(props: IContext<T>) {
        this.authLevel = props.authLevel ?? 0;
        this.isAuthenticated = props.isAuthenticated ?? false;
        this.claims = props.claims ?? undefined;
    }
}

export interface IContext<T = {}> {
    isAuthenticated?: boolean;
    authLevel?: number;
    claims?: T
}