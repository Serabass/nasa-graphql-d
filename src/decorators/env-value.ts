import 'reflect-metadata';

export function env(target: any) {
    Object.keys(process.env).forEach(key => {
        if (typeof target[key] === 'undefined') {
            target[key] = process.env[key];
        }
    });
}

export default function EnvValue(name?: string): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
        let cb: Function;
        let type = Reflect.getMetadata('design:type', target, propertyKey);

        if (!type) {
            debugger;
            throw new Error(`Field need to be typed: ${propertyKey as string}`);
        }

        switch (type) {
            case String:
                cb = (value: string) => value;
                break;
            case Number:
                cb = (value: string) => parseFloat(value);
                break;
            case Boolean:
                cb = (value: string) => value === "true";
                break;
            default:
                debugger;
                throw new Error(`Unknown field type: ${type}`);
        }

        // Maybe use get: instead of value:
        let value = cb(process.env[(name || propertyKey) as string]);
        Object.defineProperty(target, propertyKey, {
            value,
            writable: false,
            enumerable: true,
        });
    };
}
