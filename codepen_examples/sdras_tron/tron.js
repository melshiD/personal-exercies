const App = {
    data() {
      return {
        x: 0,
        y: 0
      };
    },
    methods: {
      coords(e) {
        this.x = e.clientX / 10;
        this.y = e.clientY / 10;
      }
    }
  };
  
  Vue.createApp(App).mount("#app");
  