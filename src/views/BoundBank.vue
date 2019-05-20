<template>
  <div class="body" v-title="'绑定银行卡'">
    <div class="top shenLan">
      <i class="iconfont" @click="goBack">&#xe629;</i>
      绑定银行卡
      <span @click="bingBankCard">
        完成
      </span>
    </div>
    <div class="content">
      <ul>
        <li class="title">必选项</li>
        <li>
          <span>持卡人姓名</span>
          <input
            type="text"
            placeholder="点击输入"
            v-model="bankDetail.cardholder"
            :readonly="isReadOnly"
          />
        </li>
        <li @click="popupBankCard = !popupBankCard">
          <span>开户银行</span>
          <input
            type="text"
            v-model="bankDetail.bankName"
            placeholder="选择开户银行"
            readonly
          />
          <i class="iconfont">&#xe669;</i>
        </li>
        <li v-show="otherFlag">
          <span>其他银行</span>
          <input type="text" placeholder="请输入银行名称" v-model="otherBank" />
        </li>
        <li @click="popupAddress = !popupAddress">
          <span>开户地区</span>
          <input
            type="text"
            v-model="bankDetail.area"
            placeholder="选择开户地区"
            readonly
          />
          <i class="iconfont">&#xe669;</i>
        </li>
        <li>
          <span>银行卡号</span>
          <input
            type="tel"
            placeholder="请输入银行卡号"
            v-model="cardNumber"
            maxlength="28"
          />
        </li>
        <li class="title">
          选填
        </li>
        <li>
          <span>开户支行</span>
          <input
            type="text"
            placeholder="请输入开户支行"
            v-model="bankDetail.bankBranch"
          />
        </li>
        <template v-if="!userInfo.coinPassword">
          <li class="title">
            设置提现密码
          </li>
          <li class="pwd">
            <span>
              提现密码
            </span>
            <div class="transaction">
              <input
                type="tel"
                v-for="i in 6"
                :key="i"
                maxlength="1"
                v-model="bankDetail.coinPassword[i]"
                pattern="\d*"
                style="-webkit-text-security:disc;text-security:disc;"
              />
            </div>
          </li>
          <li class="pwd">
            <span>
              确认密码
            </span>
            <div class="confirmPwd">
              <input
                type="tel"
                v-for="i in 6"
                :key="i"
                maxlength="1"
                v-model="bankDetail.reCoinPassword[i]"
                pattern="\d*"
                style="-webkit-text-security:disc;text-security:disc;"
              />
            </div>
          </li>
        </template>
      </ul>
    </div>
    <mt-popup
      :visible.sync="popupAddress"
      popup-transition="popup-fade"
      position="bottom"
      v-model="popupAddress"
    >
      <div class="popupConfirm">
        <span @click="address">确认</span>
      </div>
      <mt-picker :slots="addressArr" @change="AddressChange"> </mt-picker>
    </mt-popup>
    <mt-popup
      :visible.sync="popupBankCard"
      popup-transition="popup-fade"
      position="bottom"
      v-model="popupBankCard"
    >
      <div class="popupConfirm">
        <span @click="boundBank">确认</span>
      </div>
      <mt-picker :slots="BankCards" @change="bankCardChange"> </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import Address from "../common/address";
import { myBankCard, bankCard, bindingBank } from "../api/index";
import { nextInput } from "../common/common.js";
import { Toast } from "mint-ui";
import { mapGetters } from "vuex";

export default {
  name: "BoundBank",
  data() {
    return {
      isReadOnly: false,
      popupAddress: false,
      popupBankCard: false,
      bankList: [],
      otherFlag: false,
      otherBank: "",
      cardNumber: "",
      bankDetail: {
        cardholder: "",
        cardNumber: "",
        area: "",
        bankName: "",
        bankId: "",
        bankBranch: "",
        coinPassword: {},
        reCoinPassword: {}
      },
      addressArr: [
        {
          flex: 1,
          values: this.getProvinceArr(),
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: this.getCityArr("北京市"),
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: this.getCountyArr("北京市", "北京市"),
          className: "slot3",
          textAlign: "left"
        }
      ],
      BankCards: [
        {
          flex: 1,
          values: this.bankCardArr(),
          textAlign: "center"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    withdrawalPwdString() {
      let list = "";
      for (let i in this.bankDetail.coinPassword) {
        var item = this.bankDetail.coinPassword[i];
        list += item;
      }
      return list;
    },
    withdrawalPwdTwoString() {
      let list = "";
      for (let i in this.bankDetail.reCoinPassword) {
        var item = this.bankDetail.reCoinPassword[i];
        list += item;
      }
      return list;
    }
  },
  watch: {
    "bankDetail.bankName": {
      handler(newVal) {
        if (newVal == "其他" && this.popupBankCard) {
          return (this.otherFlag = true);
        } else {
          return (this.otherFlag = false);
        }
      }
    },
    cardNumber(newVal) {
      this.cardNumber = newVal
        .replace(/\s/g, "")
        .replace(/[^\d]/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    }
  },
  created() {
    if (this.userInfo.bankNum >= 5) {
      this.$router.replace({ name: "user" });
    }
    myBankCard().then(res => {
      console.log(res);
      if (res.status) {
        let myBank = res.data;
        if (myBank.length) {
          this.bankDetail.cardholder = myBank[0].username;
          this.isReadOnly = "readonly";
        }
      }
    });
  },
  mounted() {
    if (!this.userInfo.coinPassword) {
      nextInput(".transaction");
      nextInput(".confirmPwd");
    }
  },
  methods: {
    bankId(bank) {
      for (let i = 0; i < this.bankList.length; i++) {
        let bankListOne = this.bankList[i];
        if (bankListOne.name == bank) {
          return bankListOne.id;
        }
      }
      return 10000;
    },
    AddressChange(picker, values) {
      picker.setSlotValues(1, this.getCityArr(values[0]));
      picker.setSlotValues(2, this.getCountyArr(values[0], values[1]));

      if (this.popupAddress) {
        (this.bankDetail.area = ""),
          values.map(item => {
            this.bankDetail.area += item;
          });
      }
    },
    bankCardChange(picker, values) {
      console.log(picker, values);
      if (this.popupBankCard) {
        this.bankDetail.bankName = values[0];
      }
    },
    bankCardArr() {
      let bankCardArr = [];
      bankCard().then(res => {
        res.data.map(item => {
          let obj = {
            name: item.name,
            id: item.id
          };
          this.bankList.push(obj);
          bankCardArr.push(item.name);
        });
      });
      return bankCardArr;
    },
    getProvinceArr() {
      let provinceArr = [];
      Address.map((item, i) => {
        provinceArr.push(item.name);
      });
      return provinceArr;
    },
    getCityArr(city) {
      let cityArr = [];
      Address.map(item => {
        if (item.name == city) {
          item.city.map(items => {
            cityArr.push(items.name);
          });
        }
      });
      return cityArr;
    },
    getCountyArr(province, city) {
      let countyArr = [];
      Address.map(item => {
        if (item.name == province) {
          item.city.map(items => {
            if (items.name == city) {
              items.area.map(area => {
                countyArr.push(area);
              });
            }
          });
        }
      });
      return countyArr;
    },
    goBack() {
      this.$router.push({ name: "user" });
    },
    address() {
      this.popupAddress = !this.popupAddress;
      let firstArea =
        Address[0]["name"] +
        Address[0]["city"][0]["name"] +
        Address[0]["city"][0]["area"][0];
      if (!this.bankDetail.area) {
        this.bankDetail.area = firstArea;
      }
    },
    boundBank() {
      this.popupBankCard = !this.popupBankCard;
      if (!this.bankDetail.bankName) {
        this.bankDetail.bankName = this.bankList["0"]["name"];
      }
    },
    bingBankCard() {
      if (!this.bankDetail.cardholder) {
        return Toast("请输入持卡人姓名");
      } else {
        if (!/^([\u4e00-\u9fa5]){2,7}$/.test(this.bankDetail.cardholder)) {
          return Toast("请输入正确的姓名");
        }
      }
      if (!this.bankDetail.bankName) {
        return Toast("请选择开户银行");
      }
      if (this.bankDetail.bankName === "其他") {
        if (!this.otherBank) {
          return Toast("请输入开户银行名称");
        } else {
          if (!/^([\u4e00-\u9fa5]){4,10}$/.test(this.otherBank)) {
            return Toast("请输入正确的开户银行名称");
          }
        }
      }
      if (!this.bankDetail.area) {
        return Toast("请选择开户地区");
      }
      if (!this.cardNumber) {
        return Toast("请输入银行卡号");
      } else {
        this.cardNumber = this.cardNumber.replace(/\s*/g, "");
        if (!/\d{15}|\d{28}/.test(this.cardNumber)) {
          return Toast("请输入正确的银行卡号");
        }
      }
      if (!this.userInfo.coinPassword) {
        if (!this.withdrawalPwdString || !this.withdrawalPwdTwoString) {
          return Toast("请设置提现密码");
        } else {
          if (this.withdrawalPwdString != this.withdrawalPwdTwoString) {
            return Toast("两次提现密码不同");
          }
        }
      }
      this.bankDetail.coinPassword = this.withdrawalPwdString;
      this.bankDetail.reCoinPassword = this.withdrawalPwdTwoString;
      if (this.otherBank) {
        this.bankDetail.bankName = this.otherBank;
      }
      this.bankDetail.bankId = this.bankId(this.bankDetail.bankName);
      this.bankDetail.cardNumber = this.cardNumber.replace(/\s*/g, "");
      bindingBank(this.bankDetail).then(res => {
        if (res.status) {
          this.$router.push({ name: "bankcardlist" });
        } else {
          Toast(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    color: white;
    background-color: #605aa2;
    position: relative;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }

    span {
      position: absolute;
      right: 30px;
    }
  }

  .content {
    background-color: #f6f6f6;
    flex: 1;
    overflow-y: scroll;

    ul {
      li {
        border-bottom: 1px solid #e0dcd9;
        padding-left: 20px;
        background-color: #ffffff;
        overflow: hidden;

        span {
          line-height: 109px;
        }

        span:nth-child(1) {
          float: left;
          width: 180px;
          text-align: right;
          font-size: 30px;
        }

        span:nth-child(2) {
          display: inline-block;
          text-align: left;
          width: 440px;
          font-size: 28px;
          float: left;
          margin-left: 55px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        input {
          float: left;
          width: 430px;
          font-size: 30px;
          margin-left: 55px;
          border: none;
          margin-top: 31px;
        }

        input::-webkit-input-placeholder {
          color: #bbb;
        }

        i {
          float: right;
          line-height: 109px;
          font-size: 30px;
          margin-right: 24px;
        }
      }

      .title {
        padding-top: 27px;
        line-height: 43px;
        background-color: #f6f6f6;
        text-align: left;
        font-size: 25px;
      }
      .pwd {
        div {
          input {
            vertical-align: middle;
            text-align: center;
            width: 50px;
            height: 50px;
            line-height: 50px;
            border: 1px solid #999999; /*no*/
            margin-left: 20px;
            margin-top: 25px;
            border-radius: 10px;
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
