
export function assert(predicate : boolean, err: any) : asserts predicate {
    if(!predicate) throw err;
}