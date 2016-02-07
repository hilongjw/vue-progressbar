<script>
export default {
  props:{
    percent: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      default(){
        return {
          canSuccess: true, 
          color: 'rgb(143, 255, 199)',
          failedColor: 'red',
          show: false,
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
  z-index: 999999;
}
</style>
<template>
  <div 
    class="cov-progress" 
    :style="{
      'width': percent+'%',
      'height': options.height,
      'background-color': options.canSuccess? options.color : options.failedColor,
      'opacity': options.show ? 1 : 0
    }"
  >
  </div>
</template>
