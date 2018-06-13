function A() {

    let b = new B();
    b.callback = function () {
        console.log('the callback function');
    };

}

function B() {

    let callback;

    this.callback = function (cb) {
        callback = cb;
    }

}

let a = new A();

