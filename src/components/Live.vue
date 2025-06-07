<template>
    <div ref="live2dContainer" class="live2d-container"></div>
  </template>
  
  <script>
  export default {
    name: 'Live2DWidget',
    mounted() {
      this.loadLive2D();
    },
    methods: {
      loadLive2D() {
        // 引入 live2d-widget.min.js
        const script = document.createElement('script');
        script.src = '/live2d.min.js';
        script.async = true;
        script.onload = () => {
          // 初始化 Live2D 小人
          window.L2Dwidget.init({
            "model": {
              // 配置模型路径（替换为你自己的模型路径）
              "jsonPath": "/path/to/your/model/moc.json",
              "texturePath": "/path/to/your/model/textures/",
              "scale": 1.0,
              "x": 0.5,
              "y": 0.6,
              "z": 0,
              "rotation": 0,
              "hOffset": 0,
              "vOffset": 0
            },
            "display": {
              "position": "right", // 显示位置
              "width": 150,
              "height": 300,
              "hOffset": 0,
              "vOffset": -20
            },
            "mobile": {
              "show": false
            },
            "react": {
              "opacityDefault": 0.7,
              "opacityOnHover": 0.2
            }
          });
        };
        document.head.appendChild(script);
      }
    }
  };
  </script>
  
  <style scoped>
  .live2d-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 150px;
    height: 300px;
    pointer-events: none; /* 防止遮挡点击事件 */
  }
  </style>