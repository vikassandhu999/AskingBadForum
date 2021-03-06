
export function assert(predicate : boolean, err: any) {
    if(!predicate) throw err;
}