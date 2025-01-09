(()=>{ 
    var e, t, n, o, r, a; 
    e = document.currentScript; 
    t = e.getAttribute("interval") || "2000"; 
    n = e.getAttribute("room") || ""; 
    o = e.getAttribute("api") || "http://localhost:8080/counter"; 
    r = function(){ 
        var e = new XMLHttpRequest, 
            l = o; 
        "" != n && (l = "".concat(o, "?room=").concat(n)); 
        e.open("GET", l, !0); 
        var c = localStorage.getItem("token"); 
        null != c && e.setRequestHeader("Authorization", "Bearer " + c); 
        e.onload = function(){ 
            if(4 === e.readyState && 200 === e.status){ 
                var n = JSON.parse(e.responseText); 
                if(!0 === n.success){ 
                    var o = n.data; 
                    document.getElementById("online_user").innerHTML = o.online_user, 
                    document.getElementById("online_total").innerHTML = a(o.online_total), 
                    document.getElementById("online_me").innerHTML = a(o.online_me); 
                    var l = e.getResponseHeader("Set-Token"); 
                    null == c && null != l && localStorage.setItem("token", l); 
                    setTimeout(r, parseInt(t)); 
                } else { 
                    alert(n.message), 
                    console.error(n.message); 
                } 
            } 
        }; 
        e.send(); 
    }; 
    a = function(e){ 
        var t = Math.floor(e / 86400), 
            n = Math.floor(e % 86400 / 3600), 
            o = Math.floor(e % 3600 / 60), 
            r = Math.floor(e % 60); 
        return "".concat(t, "天 ").concat(n, "时 ").concat(o, "分 ").concat(r, "秒"); 
    }; 
    r(); 
})();
