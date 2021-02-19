export class Utils {
    public static sleep(ms : number) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
    }
}