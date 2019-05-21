function obj(o){
    function F(){}
    F.prototype = o;
    return new F();
}

function inheritPrototype(sub,super){
    let prototype = obj(super.prototype);       //相当于拷贝了一个父类对象
    prototype.constructor = sub;    增强对象
    sub.prototype = prototype;      指定对象
}
