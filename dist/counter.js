(() => {
    var e, t, n, o, r, a;
    e = document.currentScript;
    t = e.getAttribute("interval") || "2000";
    n = e.getAttribute("room") || "";
    o = e.getAttribute("api") || "http://localhost:8080/counter";
    svgFlag = e.getAttribute("svg") || ""; // 判断是否需要生成 SVG
    r = function () {
        var e = new XMLHttpRequest,
            l = o;
        "" != n && (l = "".concat(o, "?room=").concat(n));
        e.open("GET", l, !0);
        var c = localStorage.getItem("token");
        null != c && e.setRequestHeader("Authorization", "Bearer " + c);
        e.onload = () => {
            if (e.readyState === 4) {
                if (e.status === 200) {
                    let res = JSON.parse(e.responseText);
                    if (res.success === true) {
                        let data = res.data;

                        // 根据 svgFlag 判断是否生成 SVG
                        if (svgFlag) {
                            // 更新 SVG 图像
                            updateSvg("online_user", "在线人数", `${data.online_user}人`);
                            updateSvg("online_me", "你的访问时长", formatTime(data.online_me));
                            updateSvg("online_total", "本站访问总时长", formatTime(data.online_total));
                        } else {
                            // 更新页面元素
                            document.getElementById("online_user").innerHTML = data.online_user;
                            document.getElementById("online_me").innerHTML = formatTime(data.online_me);
                            document.getElementById("online_total").innerHTML = formatTime(data.online_total);
                        }

                        // 设置 token
                        let setToken = e.getResponseHeader("Set-Token");
                        if (c == null && setToken != null) {
                            localStorage.setItem("token", setToken);
                        }

                        setTimeout(r, parseInt(t));
                    } else {
                        alert(res.message);
                        console.error(res.message);
                    }
                }
            }
        };
        e.send();
    };

    // 时间格式化
    const formatTime = (time) => {
        let day = Math.floor(time / (60 * 60 * 24));
        let hour = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
        let minute = Math.floor((time % (60 * 60)) / 60);
        let second = Math.floor(time % 60);
        return `${day}天 ${hour}时 ${minute}分 ${second}秒`;
    };

    // 更新 SVG 图像
    const updateSvg = (id, leftText, rightText) => {
        let svgNS = "http://www.w3.org/2000/svg";

        // 动态计算宽度
        const leftTextWidth = getTextWidth(leftText, "12px Arial") + 10; // 左右内边距
        const rightTextWidth = getTextWidth(rightText, "12px Arial") + 10;
        const totalWidth = leftTextWidth + rightTextWidth;

        // 创建 SVG 元素
        let svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", totalWidth.toString());
        svg.setAttribute("height", "20");

        // 左侧矩形路径
        let leftRectPath = document.createElementNS(svgNS, "path");
        leftRectPath.setAttribute("d", 
            `M3 0 
            h${leftTextWidth - 3} 
            v20 
            h-${leftTextWidth - 3} 
            a3 3 0 0 1 -3 -3 
            v-14 
            a3 3 0 0 1 3 -3 
            z`);
        leftRectPath.setAttribute("fill", "#515151");
        svg.appendChild(leftRectPath);

        // 右侧矩形路径
        let rightRectPath = document.createElementNS(svgNS, "path");
        rightRectPath.setAttribute("d", 
            `M${leftTextWidth} 0 
            h${rightTextWidth - 3} 
            a3 3 0 0 1 3 3 
            v14 
            a3 3 0 0 1 -3 3 
            h-${rightTextWidth - 3} 
            v-20 
            z`);
        rightRectPath.setAttribute("fill", "#95c10d");
        svg.appendChild(rightRectPath);

        // 创建左侧文字
        let leftTextEl = document.createElementNS(svgNS, "text");
        leftTextEl.setAttribute("x", (leftTextWidth / 2).toString());
        leftTextEl.setAttribute("y", "15");
        leftTextEl.setAttribute("fill", "#ffffff");
        leftTextEl.setAttribute("font-size", "12");
        leftTextEl.setAttribute("text-anchor", "middle");
        leftTextEl.textContent = leftText;
        svg.appendChild(leftTextEl);

        // 创建右侧文字
        let rightTextEl = document.createElementNS(svgNS, "text");
        rightTextEl.setAttribute("x", (leftTextWidth + rightTextWidth / 2).toString());
        rightTextEl.setAttribute("y", "15");
        rightTextEl.setAttribute("fill", "#ffffff");
        rightTextEl.setAttribute("font-size", "12");
        rightTextEl.setAttribute("text-anchor", "middle");
        rightTextEl.textContent = rightText;
        svg.appendChild(rightTextEl);

        // 在 img 元素后插入 SVG
        let imgElement = document.getElementById(id);
        if (imgElement && imgElement.parentNode) {
            let nextSibling = imgElement.nextSibling;
            if (nextSibling && nextSibling.nodeName === "svg") {
                imgElement.parentNode.replaceChild(svg, nextSibling);
            } else {
                imgElement.parentNode.insertBefore(svg, nextSibling);
            }
        }
    };

    // 计算文字宽度
    const getTextWidth = (text, font) => {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        context.font = font;
        return context.measureText(text).width;
    };

    r();
})();
