type CallBackType = () => Promise<any>;

export class RejectOrReturn {
    public static async run<E>(k: CallBackType, errorOnReject: E): Promise<any> {
        try {
            return await k();
        } catch (e) {
            console.log(e);
            throw errorOnReject;
        }
    }
}