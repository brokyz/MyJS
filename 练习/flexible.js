// 立即执行函数 
(function flexible(window, document) {
    // 获取页面的html
    var docEl = document.documentElement
    // 设置像素比，在pc下像素比为1，在移动端像素比为2，如果获取不到默认为1
    var dpr = window.devicePixelRatio || 1

    // 调整body部分的字体大小
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // 初始化rem的值，让1rem等于窗口大小的十分之一
    function setRemUnit() {
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // 当我们页面尺寸大小发生变化的时候，要重新设置下rem的大小
    window.addEventListener('resize', setRemUnit)   // 当页面大小发生改变时触发事件
    // 当页面重新加载时触发事件 这里为了兼容火狐浏览器前进后退的特性，所以不使用load事件
    window.addEventListener('pageshow', function(e) {
        // e.persisted 返回的是true 就是说如果这个页面是从换从取过来的页面，也需要重新计算一下rem的大小
        if (e.persisted) {
            setRemUnit()
        }
    })

    // 有些移动端的浏览器不支持0.5像素的写法，下面这个代码让移动端支持0.5像素的写法，只需要知道实现功能即可
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))