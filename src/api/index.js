// 测试
// const URL = 'http://test.globeblock.net/Api';

var URL = '/api';
if (location.href.indexOf("localhost") > -1) {
  URL = 'http://i.diqiucun.com/api';  //
  // URL = '//test1.globeblock.net/api';
}
const USERINFO_URL = URL + '/Users/getuserinfo';//获取用户信息
export default {
  URL,
  USERINFO_URL,
}
