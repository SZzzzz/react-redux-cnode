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

## 状态树
本项目使用redux管理状态,状态树如图:
![截图](https://raw.githubusercontent.com/SZzzzz/react-redux-cnode/master/src/images/status_tree.png)  
基本思路是每个页面对应一个reducer,管理本页面的状态。其中:
- `footer`对应底部tab条
- `homePage`对应主页
- `loginPage`对应登陆页面
- `profilePage`对应本人信息页面,保存有个人信息
- `currentTopic`对应当前进入的主题,具有缓存作用
- `currentUser`对应点击头像或用户名进入的用户信息界面

## TODO
- 修复下拉刷新的bug
- 适配移动端
- 将输入框替换为富文本编辑器
- 增加回复某人功能
- 增加上拉刷新功能
- 增加消息功能

## 总结
- 简单学习了一下PostCSS,觉得比SASS更强大,只不过需要自己配置,各种插件让人眼花缭乱,略显麻烦,所以这次只用了autoprefixer,以后会更多的尝试。
- 使用了CSS Modules,感觉和组件化开发很搭,组件内部的样式命名再也不用担心冲突了。
- 对React全家桶有了深入的了解,路由决定渲染哪些组件,而store中的数据决定如何渲染组件。
- Store中每个数据的变化都要经过Dispatch,Reducer,有些简单的状态这么处理起来感觉很麻烦,可能复杂度上去之后,这种单向数据流才能真正体现出威力。

## 遇到的一些问题
- `webpaack-dev-server`的配置,在`webpack.config.js`配置非常麻烦,而且文档说的含糊不清,建议还是在命令行中使用参数的方式配置。
- `webfont`需要搭配`url-loader`,如果需要将`webfont`的编码以字符串的形式传递的话,需要转换形式,例如:`&#xe714;`改写为`\ue714`。
- react组件的生命周期一定要搞清楚,否则会出现很多问题。
- 路由在生产环境和开发环境可能不一样,需要定义一个前缀,使用`webpack.definePlugin`控制前缀是否添加。