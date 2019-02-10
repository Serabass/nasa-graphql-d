export default class NameCorrector {
    public static correctObject(obj: any) {
        Object.keys(obj).forEach((key: string) => {
            if (/[!\w]/.test(key)) {
                let newKey = key.replace(/[!\w]/, '_');
                obj[newKey] = obj[key];
                delete obj[key];
            }
        });

        return obj;
    }
}
