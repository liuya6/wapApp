class Fn {
  debug(msg) {
    var div = document.createElement("div");
    div.style.cssText =
      "background-color:red;color:white;position:absolute;top:100px;left:0px;width:100%;display:block;z-index:999999";
    document.body.appendChild(div);
    div.innerHTML = msg;

    div.onclick = function() {
      document.body.removeChild(div);
    };
  }
}

let $fn = new Fn();
export default $fn;
