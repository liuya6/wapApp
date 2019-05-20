const User = () => import(/* webpackChunkName:'first' */ "../views/User");
const Login = () => import(/* webpackChunkName:'first' */ "../views/Login");
const Register = () => import("../views/Register");
const BoundBank = () => import("../views/BoundBank");
const Recharge = () =>
  import(/* webpackChunkName:'user' */ "../views/Recharge");
const Withdraw = () =>
  import(/* webpackChunkName:'user' */ "../views/Withdraw");
const Paying = () => import("../views/Paying");
const WithdrawCaption = () => import("../views/WithdrawCaption");
const BankCardList = () => import("../views/BankCardList");
const LoginPwd = () => import("../views/LoginPwd");
const WithdrawPwd = () => import("../views/WithdrawPwd");
const AccountDetails = () => import("../views/AccountDetails");
const WithdrawalsRecord = () => import("../views/WithdrawalsRecord");
const RechargeRecord = () => import("../views/RechargeRecord");
const AboutUs = () => import("../views/AboutUs");
const AnnouncementList = () => import("../views/AnnouncementList");
const BankPaying = () => import("../views/BankPaying");
const ScanCodePaying = () => import("../views/ScanCodePaying");
const ScanCodesubmit = () => import("../views/ScanCodesubmit");
const BankSubmit = () => import("../views/BankSubmit");
const MyMsg = () => import("../views/MyMessage");
const MySpread = () => import("../views/MySpread");
const MySpreadList = () => import("../views/MySpreadList");
const MsgDetail = () => import("../views/MsgDetail");
const CustomerService = () => import("../views/CustomerService");
const LegalNotices = () => import("../views/LegalNotices");
const UserSetting = () => import("../views/UserSetting");
const UserTransfrom = () =>
  import(/* webpackChunkName:'user' */ "../views/UserTransfrom");
const ConversionRecord = () => import("../views/ConversionRecord");
const Member = () => import("../views/Member");
export default [
  {
    path: "/login",
    name: "login",
    meta: {
      // requiresAuth: true, // 登录验证
      // allowedTest: true // 允许测试账号
      denyAuth: true // 拒绝登录访问
    },
    component: Login
  },
  {
    path: "/register",
    name: "register",
    meta: {
      //   requiresAuth: true, // 登录验证
      //   allowedTest: true // 允许测试账号
      denyAuth: true // 拒绝登录访问
    },
    component: Register
  },
  {
    path: "/user",
    name: "user",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: User
  },
  {
    path: "/user/boundbank",
    name: "boundbank",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: BoundBank
  },
  {
    path: "/user/recharge",
    name: "recharge",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: Recharge
  },
  {
    path: "/user/withdraw",
    name: "withdraw",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: Withdraw
  },
  {
    path: "/user/pay",
    name: "paying",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: Paying
  },
  {
    path: "/user/withdrawcaption",
    name: "withdrawcaption",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: WithdrawCaption
  },
  {
    path: "/user/bankcardlist",
    name: "bankcardlist",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: BankCardList
  },
  {
    path: "/user/loginpwd",
    name: "loginpwd",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: LoginPwd
  },
  {
    path: "/user/withdrawpwd",
    name: "withdrawpwd",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: WithdrawPwd
  },
  {
    path: "/user/accountdetails",
    name: "accountdetails",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: AccountDetails
  },
  {
    path: "/user/withdrawalsrecord",
    name: "withdrawalsrecord",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: WithdrawalsRecord
  },
  {
    path: "/user/rechargerecord",
    name: "rechargerecord",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: RechargeRecord
  },
  {
    path: "/user/aboutus",
    name: "aboutus",
    component: AboutUs
  },
  {
    path: "/user/announcementlist",
    name: "announcementlist",
    component: AnnouncementList
  },
  {
    path: "/user/bankpaying",
    name: "bankpaying",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: BankPaying
  },
  {
    path: "/user/banksubmit",
    name: "banksubmit",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: BankSubmit
  },
  {
    path: "/user/scancodePaying",
    name: "scancodePaying",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: ScanCodePaying
  },
  {
    path: "/user/scancodesubmit",
    name: "scancodesubmit",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: ScanCodesubmit
  },
  {
    path: "/user/mymsg",
    name: "mymsg",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: MyMsg
  },
  {
    path: "/user/myspread",
    name: "myspread",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: MySpread
  },
  {
    path: "/user/myspreadlist",
    name: "myspreadlist",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: MySpreadList
  },
  {
    path: "/user/msgdetail",
    name: "msgdetail",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: MsgDetail
  },
  {
    path: "/user/usersetting",
    name: "usersetting",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: UserSetting
  },
  {
    path: "/user/service",
    name: "service",
    component: CustomerService
  },
  {
    path: "/legalnotices",
    name: "legalnotices",
    component: LegalNotices
  },
  // 额度转换
  {
    path: "/user/usertransfrom",
    name: "usertransfrom",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: UserTransfrom
  },
  {
    path: "/user/conversionrecord",
    name: "ConversionRecord",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: ConversionRecord
  },
  {
    path: "/user/member",
    name: "member",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: Member
  }
];
