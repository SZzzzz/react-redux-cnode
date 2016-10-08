## 项目简介
一个WebApp版的cnode客户端,采用了react, redux, react-router构建。采用了比较新的技术,例如:
- 采用`isomorpfic-fetch`库代替`XMLHttpRequest`实现网络请求。
- 使用`PostCSS`处理CSS。
- 使用`CSSModules`处理组件内部的类名。

## 预览
[DEMO](https://szzzzz.github.io/demo/cnode/)

## 运行项目
本项目基于node4.4.5版本,请注意版本
```
  git clone https://github.com/SZzzzz/react-redux-cnode.git
  cd react-redux-cnode
  npm install 
  npm install webpack-dev-server webpack -g (没有安装webpack的需要安装)
  npm run dev (浏览器输入http://loacalhost:8888 查看)
```

## 实现
本项目采用了redux管理状态,状态树如图:
![status tree](https://github.com/SZzzzz/react-redux-cnode/tree/master/src/images/status_tree.png)