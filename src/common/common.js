export function announcement(el, initial, speed) {
  let element = document.querySelectorAll(el)[0];
  let eleParent = element.parentNode;
  let startWidth = eleParent.offsetWidth;
  let time = function() {
    let startLeft = element.offsetLeft;
    if (startLeft < -element.offsetWidth) {
      startLeft = startWidth;
    }
    element.style.left = startLeft - initial + "px";
  };
  let timer = setInterval(time, speed);
  element.ontouchstart = function(e) {
    e = window.event || e;
    let startLeft = element.offsetLeft;
    let startX = e.changedTouches[0].clientX;
    clearInterval(timer);
    element.ontouchmove = function(e) {
      e = window.event || e;
      let endX = e.changedTouches[0].clientX;
      element.style.left = startLeft + (endX - startX) + "px";
    };
    element.ontouchend = function() {
      timer = setInterval(time, speed);
    };
  };
}

export function onTurn(el, speed) {
  let timer;
  let element = document.querySelectorAll(el)[0];
  if (!element) return;
  let eleParent = element.parentNode;
  let startHeight = eleParent.offsetHeight;
  // if (!element.firstChild) {
  //   return false;
  // }
  let time = function() {
    let startTop = element.offsetTop;
    let list = element.childNodes;
    let num = Math.abs(parseInt(startTop) / element.firstChild.offsetHeight);
    num = Math.round(num);
    if (!isNaN(num) && num % 1 === 0) {
      list[num].className = "animated flipOutX";
      list[num].addEventListener("animationend", function() {
        this.className = "";
        if (
          startTop <
          -element.offsetHeight + element.firstChild.offsetHeight * 2
        ) {
          startTop = startHeight - 1;
        }
        element.style.top = startTop - element.firstChild.offsetHeight + "px";
      });
    } else {
      clearInterval(timer);
    }
  };
  timer = setInterval(time, speed);
}

export function ranking(el, initial, speed) {
  let element = document.querySelectorAll(el)[0];
  let eleParent = element.parentNode;
  let startHeight = eleParent.offsetHeight;
  let time = function() {
    let startTop = element.offsetTop;
    if (startTop < -element.offsetHeight + startHeight) {
      startTop = 0;
    }
    element.style.top = startTop - initial + "px";
  };
  setInterval(time, speed);
}

export function nextInput(el) {
  let InputList = document.querySelectorAll(el)[0].childNodes;
  for (let i = 0; i < InputList.length; i++) {
    let inputOne = InputList[i];
    inputOne.index = i;
    inputOne.setAttribute("readonly", true);
    let method = function(e) {
      let next = this.index + 1;
      let last = this.index - 1;
      e = window.event || e;
      this.value = this.value.replace(/\D/g, "");
      if (next > InputList.length - 1) return;
      InputList[next].removeAttribute("readonly");
      if (!this.value && InputList[last] && e.keyCode == 8) {
        InputList[last].focus();
      }
      if (this.value) {
        InputList[next].focus();
      }
    };
    inputOne.onkeyup = method;
  }
  InputList[InputList.length - 1].onkeyup = function(e) {
    e = window.event || e;
    if (e.keyCode == 8) {
      InputList[this.index - 1].focus();
    }
  };
  InputList[0].removeAttribute("readonly");
}
