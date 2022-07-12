window.addEventListener("load", function () {
  // 1. 获取元素
  var prev = this.document.querySelector(".prev");
  var next = this.document.querySelector(".next");
  var tb_promo = this.document.querySelector(".tb-promo");
  // 2. 鼠标经过显示
  tb_promo.addEventListener("mouseenter", function () {
    prev.style.display = "block";
    next.style.display = "block";
    clearInterval(timer);
    timer = null; // 清除定时器
  });
  tb_promo.addEventListener("mouseleave", function () {
    prev.style.display = "none";
    next.style.display = "none";
    // 因为下面已经声明过了，所以不需要再声明
    timer = setInterval(function () {
      // 手动调用点击事件
      next.click();
    }, 4000);
  });
  // 3. 动态生成小圆圈
  var imgWidth = tb_promo.offsetWidth;
  var ul = tb_promo.querySelector("ul");
  var ol = tb_promo.querySelector(".circle");
  for (var i = 0; i < ul.children.length; i++) {
    // 创建一个 li
    var li = this.document.createElement("li");
    // 记录当前小圆圈的索引号，通过自定义属性获取
    li.setAttribute("index", i);
    // 插入 ol
    ol.appendChild(li);
    // 4. 排他思想，动态改变小圆圈位置，在生成小圆圈的同时添加点击事件
    li.addEventListener("click", function () {
      // 干掉所有人，为所有li清除类名
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      this.className = "current";
      // 5. 点击小圆圈，移动图片，移动的是ul
      // ul 的移动距离等于小圆圈的索引号乘以图片的宽度，注意是负值
      // 点击了li获得当前li的index
      var index = this.getAttribute("index");
      num = index;
      circle = index;
      // console.log(imgWidth);
      // console.log(index);

      animate(ul, -index * imgWidth);
    });
  }
  // 把ol里面的第一个小li设置为current
  ol.children[0].className = "current";
  // 6. 克隆第一张图片放到ul的最后
  var first = ul.children[0].cloneNode(true);
  ul.append(first);
  // ul.insertBefore(last, ul.children[0])
  // 7. 点击右侧按钮图片滚动一张
  var num = 0;
  var circle = 0;
  // 节流阀
  var flag = true;
  next.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == ul.children.length - 1) {
        ul.style.left = "";
        num = 0;
      }
      num++;
      animate(ul, -num * imgWidth, function () {
        flag = true;
      });
      circle++;
      if (circle == ol.children.length) {
        circle = 0;
      }
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      ol.children[circle].className = "current";
    }
  });
  // 8.左侧
  prev.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * imgWidth + "px";
      }
      num--;
      animate(ul, -num * imgWidth, function () {
        flag = true;
      });
      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      ol.children[circle].className = "current";
    }
  });

  // 9.自动播放
  var timer = setInterval(function () {
    // 手动调用点击事件
    next.click();
  }, 4000);
});