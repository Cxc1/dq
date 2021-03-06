import Vue from 'vue'

import router from './router';
// 引入更新rem的js
import '@/styles/reset.js';
// 引入通用css
import '@/styles/index.less';
//引入axios
import axios from 'axios';

Vue.prototype.$http = axios;
//引入qs数据格式
import qs from 'qs';

Vue.prototype.$qs = qs;
import {LoadingPlugin} from 'vux'

Vue.use(LoadingPlugin);
import {ToastPlugin} from 'vux'

Vue.use(ToastPlugin);
import {LoadMore} from 'vux';

Vue.component('load-more', LoadMore);
import {ConfirmPlugin} from 'vux';

Vue.use(ConfirmPlugin);
import api from '@/api';

Vue.prototype.api = api.URL;
//引用mintui组件以及css样式
import mintui from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(mintui);
import {getCookie} from '@/utils/tool.js';
import pullrefresh from '@/common/pullrefresh.vue';

Vue.component(pullrefresh.name, pullrefresh);
Vue.prototype.$token = getCookie("token");
Vue.prototype.$mark = getCookie("mark");
//
Vue.prototype.$token = 'p6glf1v2w4my5nmr3t28krznodq1goif';
Vue.prototype.$mark = '7642e0098e812f79e67d161fbf0c7ae5';
// Vue.prototype.$token = '0krbch7jnnm8rz3ryjczrw2fcdjn2ljx';
// Vue.prototype.$mark = '00a4883784688bf06412fadcde29f62d';

//引用公共页面
import Page from './common/Pageheader.vue'
import VCharts from 'v-charts'

Vue.use(VCharts);


Vue.component(Page.name, Page);

//引用复制粘贴插件
import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard);

Vue.config.productionTip = false;
import App from './App'

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
