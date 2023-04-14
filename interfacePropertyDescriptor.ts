interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?():any;
    set?(v: any): void;
    }

function HandleError() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target);
        console.log(propertyKey)
        console.log(descriptor)

        const method = descriptor.value;

        descriptor.value = function() {
            try{
                method();
            } catch(e) {
                //에러 핸들 로직으로 구현
                console.log(e);
            }
        }
    };
}
class Greeter {
    @HandleError()
    hello() {
        throw new Error('테스트 에러');
    }
}

const t = new Greeter();
t.hello();