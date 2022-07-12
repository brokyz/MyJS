function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 把步长值改为整数，来防止小数计算，使得目标到不了指定位置而无法停止
        // 当step是正数向上取整（取大），当是负数向下取整（取小）   
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数写到定时器结束的时候调用
            // if (callback) {
            //     callback();
            // }
            // 高级写法
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
        // console.log('stop');
    }, 10)
}