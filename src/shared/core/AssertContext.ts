import { UnauthorizedAccessError } from "./UnathorizedAccessError";

export interface AssertContextProps {
    isAuthenticated?: boolean;
    authLevel?: number;
}

export function AssertContext(context: any, props: AssertContextProps) {
    if ((!!props.isAuthenticated) && props.isAuthenticated != context.isAuthenticated) {
        throw new UnauthorizedAccessError();
    }

    if ((!!props.authLevel) && props.authLevel != context.authLevel) {
        throw new UnauthorizedAccessError();
    }
}