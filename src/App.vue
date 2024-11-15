<template>

  <router-view></router-view>

</template>

<script  lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const route = useRoute();

    // 监听路由变化，动态设置 favicon
    watch(
      () => route.path,
      (newPath) => {
        let faviconUrl = '';
        console.log(newPath);

        // 根据路由路径设置不同的 favicon 图标
        if (newPath === '/home' || newPath === '/') {
          faviconUrl = '/game.svg';
        } else if (newPath.startsWith('/Typing_Practice')) {
          faviconUrl = '/typing.svg';
        }
        // 修改 favicon
        const link = document.querySelector('link[rel="icon"]') || document.createElement('link');
        link.rel = 'icon';
        link.href = faviconUrl;
        document.head.appendChild(link);
      },
      { immediate: true }
    );
  }
};
</script>

<style scoped>

</style>
