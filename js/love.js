"use strict";

(function (window, document) {
    const hearts = [];

    function animate() {
        for (let i = 0; i < hearts.length; i++) {
            if (hearts[i].alpha <= 0) {
                document.body.removeChild(hearts[i].el);
                hearts.splice(i, 1);
                i--;
            } else {
                hearts[i].y--;
                hearts[i].scale += 0.004;
                hearts[i].alpha -= 0.013;
                hearts[i].el.style.cssText = `left:${hearts[i].x}px;top:${hearts[i].y}px;opacity:${hearts[i].alpha};transform:scale(${hearts[i].scale},${hearts[i].scale}) rotate(45deg);background:${hearts[i].color};z-index:99999`;
            }
        }
        requestAnimationFrame(animate);
    }

    function injectStyle(css) {
        const style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        } catch (ex) {
            style.styleSheet.cssText = css;
        }
        document.getElementsByTagName("head")[0].appendChild(style);
    }

    function handleClick(event) {
        const heart = document.createElement("div");
        heart.className = "heart";
        hearts.push({
            el: heart,
            x: event.clientX - 5,
            y: event.clientY - 5,
            scale: 1,
            alpha: 1,
            color: `rgb(${~~(255 * Math.random())},${~~(255 * Math.random())},${~~(255 * Math.random())})`
        });
        document.body.appendChild(heart);
    }

    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 1000 / 60);
    };

    injectStyle(`
        .heart {
            width: 10px;
            height: 10px;
            position: fixed;
            background: #f00;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
        }
        .heart:after,
        .heart:before {
            content: '';
            width: inherit;
            height: inherit;
            background: inherit;
            border-radius: 50%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            position: fixed;
        }
        .heart:after {
            top: -5px;
        }
        .heart:before {
            left: -5px;
        }
    `);

    const oldOnClick = typeof window.onclick === "function" && window.onclick;
    window.onclick = function (event) {
        if (oldOnClick) {
            oldOnClick();
        }
        handleClick(event);
    };

    animate();
})(window, document);

