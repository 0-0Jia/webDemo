 //入口函数
 $(document).ready(function () {
    //需求：鼠标放入一级li中，让他里面的ul显示。移开隐藏。
    var jqli = $(".wrap");

    console.log(jqli)

    //绑定事件
    jqli.mouseenter(function () {
        $(this).children("ul").stop().slideDown(800);
    });

    //绑定事件(移开隐藏)
    jqli.mouseleave(function () {
        $(this).children("ul").stop().slideUp(800);
    });
});

/**
     *  轮播图
     *  */
    var all = document.getElementById("all");
    var screen = all.firstElementChild || all.firstChild;
    var imgWidth = screen.offsetWidth;
    var ul = screen.firstElementChild || screen.firstChild;
    var ul2 = document.getElementsByClassName("description")[0].children[0];
    var div = screen.lastElementChild || screen.lastChild;
    var spanArr = div.children;

    //2.复制第一张图片所在的li,添加到ul的最后面。
    var ulNewLi = ul.children[0].cloneNode(true);
    ul.appendChild(ulNewLi);

    var ul2LiArr = ul2.children;
    ul2LiArr[0].className = "current";

    for (var i = 0; i < ul2LiArr.length; i++) {
        //自定义属性，把索引值绑定到元素的index属性上
        ul2LiArr[i].index = i;
        ul2LiArr[i].onmouseover = function () {
            //排他思想
            for (var j = 0; j < ul2LiArr.length; j++) {
                ul2LiArr[j].className = "";
            }
            this.className = "current";
            //鼠标放到小的方块上的时候索引值和key以及square同步
            //                    key = this.index;
            //                    square = this.index;
            key = square = this.index;
            //移动盒子
            animate(ul, -this.index * imgWidth);
        }
    }

    //5.添加定时器
    var timer = setInterval(autoPlay, 2000);

    //固定向右切换图片
    //两个定时器（一个记录图片，一个记录小方块）
    var key = 0;
    var square = 0;
    function autoPlay() {
        //通过控制key的自增来模拟图片的索引值，然后移动ul
        key++;
        if (key > ul2LiArr.length) {
            //图片已经滑动到最后一张，接下来，跳转到第一张，然后在滑动到第二张
            ul.style.left = 0;
            key = 1;
        }
        animate(ul, -key * imgWidth);
        //通过控制square的自增来模拟小方块的索引值，然后点亮盒子
        //排他思想做小方块
        square++;
        if (square > ul2LiArr.length - 1) {//索引值不能大于等于5，如果等于5，立刻变为0；
            square = 0;
        }
        for (var i = 0; i < ul2LiArr.length; i++) {
            ul2LiArr[i].className = "";
        }
        ul2LiArr[square].className = "current";
    }

    //鼠标放上去清除定时器，移开后在开启定时器
    all.onmouseover = function () {
        div.style.display = "block";
        clearInterval(timer);
    }
    all.onmouseout = function () {
        div.style.display = "none";
        timer = setInterval(autoPlay, 2000);
    }

    //6.左右切换图片（鼠标放上去显示，移开隐藏）
    spanArr[0].onclick = function () {
        //通过控制key的自增来模拟图片的索引值，然后移动ul
        key--;
        if (key < 0) {
            //先移动到最后一张，然后key的值取之前一张的索引值，然后在向前移动
            ul.style.left = -imgWidth * (3) + "px";
            key = 3 - 1;
        }
        animate(ul, -key * imgWidth);
        //通过控制square的自增来模拟小方块的索引值，然后点亮盒子
        //排他思想做小方块
        square--;
        if (square < 0) {//索引值不能大于等于5，如果等于5，立刻变为0；
            square = 3 - 1;
        }
    }
    spanArr[1].onclick = function () {
        //右侧的和定时器一模一样
        autoPlay();
    }


    function animate(ele, target) {
        clearInterval(ele.timer);
        var speed = target > ele.offsetLeft ? 10 : -10;
        ele.timer = setInterval(function () {
            var val = target - ele.offsetLeft;
            ele.style.left = ele.offsetLeft + speed + "px";
            if (Math.abs(val) < Math.abs(speed)) {
                ele.style.left = target + "px";
                clearInterval(ele.timer);
            }
        }, 10)
    }

