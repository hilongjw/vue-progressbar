<script>
export default {
  props:{
    precent: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      default(){
        return {
         color: '#73ccec', 
         height: '2px'
        }
      }
    }
  }
}
</script>
<style scoped>
.cov-progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.6s;
  opacity: 1;
  background-color: #73ccec;
}
</style>
<template>
  <div 
    class="cov-progress" 
    :style="{
      'width': precent+'%', 
      'height': options.height,
      'background-color': options.color,
    }"
  >
  </div>
</template>
