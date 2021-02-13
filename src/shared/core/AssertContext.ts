import {Context} from "./IContext";
import {UnauthorizedAccessError} from "./UnathorizedAccessError";
import {NotEnoughInformationProvidedError} from "./NotEnoughInformationProvidedError";

export interface AssertContextProps {
    isAuthenticated?: boolean
    hasClaims?: boolean
    authLevel?: number
}

export function AssertContext<T>(context: Context<T>, props: AssertContextProps) {
    if ((!!props.isAuthenticated) && props.isAuthenticated != context.isAuthenticated) {
        throw new UnauthorizedAccessError();
    }

    if ((!!props.authLevel) && props.authLevel != context.authLevel) {
        throw new UnauthorizedAccessError();
    }

    if ((!!props.hasClaims) && !(!!context.claims)) {
        throw new NotEnoughInformationProvidedError();
    }
}