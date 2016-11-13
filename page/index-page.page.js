/**
 * Created by kevin on 16/11/11.
 */

(
  function() {
    window.ishare = window.ishare || {};
    window.ishare.indexPage = window.ishare.indexPage || {};

    window.ishare.indexPage = Vue.extend({
      template: '\
        <div>\
          <a href="javascript:;" @click="login">登录</a>\
          <a href="javascript:;" @click="getIssues">获取Issues</a>\
          <a href="javascript:;" @click="creatIssue">发布Issue</a>\
          <ul v-for="item in res">\
            <li>{{ JSON.stringify(item) }}</li>\
          </ul>\
          <some-com></some-com>\
        </div>\
      ',

      name: 'index-page',

      data: function() {
        return {
          owner: 'KevinHu-1024',
          repo: 'gitourMock',
          token: null,
          res: '',

        }
      },

      components: {
        'some-com': window.ishare.someCom,
      },

      methods: {
        login: function() {
          location.href="https://github.com/login/oauth/authorize?client_id=6ca71f7d3a103e43d2b1&redirect_uri=http://localhost:8860/&scope=user%20public_repo"
        },
        // 获得每周分享列表
        // fetch('https://api.github.com/repos/SmartUED/week-share/issues?access_token=f0167f6a77c4b4e3a2defd41585f444ef606ce43').then(res => res.json()).then(json => console.log(json))

        // 发布分享
        getIssues: function() {
          var G = window.GitHub;
          var gh = new G({ token: this.token });
          var issue = gh.getIssues('KevinHu-1024', 'gitourMock');
          var self = this;
          issue.listIssues().then(function(res) {console.log(res.data);self.res = res.data;})
        },

        creatIssue: function() {
          var G = window.GitHub;
          var gh = new G({ token: this.token });
          var issue = gh.getIssues('KevinHu-1024', 'gitourMock');
          var self = this;

          var issueData = {
            title: 'redux 从入门到放弃 reducer',
            body: '* This is a post from Github OAuth App.'
          };
          issueData = JSON.stringify(issueData);
          issue.createIssue(issueData).then(function(res) {console.log(res.data);self.res = res.data;});
        }
      },

      mounted: function() {
        var needOAuth = window.location.href.match(/\?code=(.*)/);
        if (needOAuth && window.localStorage && !localStorage.ishare_token) {
          var code = window.location.href.match(/\?code=(.*)/)[1];
          fetch('http://ishare.w3cript.com/authenticate/' + code)
            .then(function(res) { return res.json(); })
            .then(function(json) {
              if (json.token) {
                if (window.localStorage) {
                  localStorage.ishare_token = json.token;
                  console.log('新用户登陆');
                  window.location.href = window.location.host + window.location.pathname;
                  this.token = json.token;
                }
              } else {
                console.log(json.error);
              }
            })
        } else if (window.localStorage && window.localStorage.ishare_token) {
          console.log(localStorage.ishare_token, '已登录');
          this.token = localStorage.ishare_token;
        }
      },
    });
  }
)();