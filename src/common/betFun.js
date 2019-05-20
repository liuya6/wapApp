export default {
  install(Vue, options) {
    //初始化投注
    Vue.prototype.$initial = function(data) {
      for (var i in data) {
        this.$set(this.codeSelect, i, []);
      }
    };
    //投注
    Vue.prototype.$betting = function(index, item) {
      let itemOne = this.codeSelect[index];
      if (itemOne.indexOf(item) < 0) {
        itemOne.push(item);
      } else {
        itemOne.splice(itemOne.indexOf(item), 1);
      }
      this.InverseSelection(index, itemOne);
    };
    //自动投注
    Vue.prototype.autoBet = function(index, item, all) {
      let List = [];
      all.map(one => {
        switch (item) {
          case "small":
            if (one < 5) List.push(one);
            break;
          case "all":
            List.push(one);
            break;
          case "large":
            if (one > 4) List.push(one);
            break;
          case "odd":
            if (one % 2 != 0) List.push(one);
            break;
          case "even":
            if (one % 2 == 0) List.push(one);
            break;
        }
      });
      this.titleTab[index] = item;
      this.$set(this.codeSelect, index, List);
    };
    Vue.prototype.InverseSelection = function(index, itemOne) {
      let ArrList = {
        none: [],
        even: [],
        odd: [],
        small: [],
        large: [],
        all: this.title.codeArr
      };
      this.title.codeArr.forEach(item => {
        if (item >= this.title.codeArr.length / 2) ArrList["large"].push(item);
        if (item < this.title.codeArr.length / 2) ArrList["small"].push(item);
        if (item % 2 != 0) ArrList["odd"].push(item);
        if (item % 2 == 0) ArrList["even"].push(item);
      });
      let itemOneString = [...itemOne].sort().toString();
      for (let i in ArrList) {
        let codeItem = [...ArrList[i]].sort().toString();
        if (codeItem === itemOneString) {
          return (this.titleTab[index] = i);
        }
      }
      this.titleTab[index] = "";
    };
  }
};
