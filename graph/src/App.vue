<template>
  <div id="app">
    <!-- <graph /> -->
    <!-- <pie></pie> -->
    <!-- <c-select></c-select> -->
    <bar></bar>
  </div>
</template>

<script>
// import graph from './components/graph.vue';
// import pie from './components/pie.vue';
// import graph from './components/graph2.vue';
// import cSelect from './components/cSelect.vue';
import bar from './components/bar.vue';
export default {
  name: 'App',
  components: {
    // graph,
    // cSelect,
    // pie,
    bar,
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
