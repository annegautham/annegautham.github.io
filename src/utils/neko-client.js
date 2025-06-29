let nekoInstance;

export default {
  start() {
    if (!nekoInstance) {
      nekoInstance = new window.Neko();
    }
    nekoInstance.start();
  },
  stop() {
    if (nekoInstance) {
      nekoInstance.stop();
    }
  },
};
