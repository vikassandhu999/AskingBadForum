
export function Assert(predicate : boolean, err: any) {
    if(predicate) throw err;
}