<template>
  <div id="app">
    <graph />
  </div>
</template>

<script>
import graph from './components/graph.vue';

export default {
  name: 'App',
  components: {
    graph,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
