# 项目介绍

利用THREE.js实现3D螺旋星系

# dat.gui参数说明

| 参数         | 说明                                       |
| ------------ | ------------------------------------------ |
| count        | 粒子数量                                   |
| size         | 粒子大小                                   |
| radius       | 整体半径                                   |
| branches     | 主轴分叉数量                               |
| spin         | 数值越大，主轴旋转的圈数越多               |
| randomArgu   | 数值越大，粒子偏移主轴的程度越大           |
| baseNumber   | 用于拟合指数函数，数值越大，粒子越接近主轴 |
| insideColor  | 中心的颜色                                 |
| outsideColor | 边缘的颜色                                 |

# 项目难点

要用到大量数学拟合曲线和调整随机程度

# 其他说明

打包使用的是parcel，确保你正确安装了parcel依赖

由于parcel的默认配置没有考虑引入图片，请把texture文件夹直接移动到dist文件夹下

否则背景加载会产生错误（完全白）



