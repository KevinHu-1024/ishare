(
  function() {
    window.ishare = window.ishare || {};
    window.ishare.IshareApp = window.ishare.IshareApp || {};
    window.ishare.IshareRouter = window.ishare.IshareRouter || [];

    var Index = window.ishare.indexPage;
    var Bar = { template: '<div>bar</div>' };

    var routers = [
      { path: '/', component: Index },
      { path: '/bar', component: Bar }
    ];

    window.ishare.IshareRouter = new VueRouter({
      routes: routers,
    });

    window.ishare.IshareApp = new Vue({
      router: window.ishare.IshareRouter,
    }).$mount('#app');
  }
).call(this);