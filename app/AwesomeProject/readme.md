# react naive + node

node 使用express + express-generator + ejs + supervisor

1. 读取数据模块

2. 数据存储模块 先用get请求用于测试

3. 阅读模块写入接口

4. 登陆模块`express-session` 提供身份验证

    ```powershell
    npm install express-session --save
    ```

5. 添加界面 login.ejs index.ejs edit.ejs edit.js

6. 细节修改 添加接口的校验

## react native

环境搭建

---

react 生命周期

修改Info.plist文件 在App Transport Security Settings下面添加

```sh
Allow Arbitrary Loads：yes #可以使用外部图片等资源
```

1. TabBarIOS

2. 抽象 `TWebView` 首页和天气模块共用

3. 使用高德地图api 移动端的适配

4. 封装工具 获取屏幕的宽高/像素密度/fetch请求

5. 阅读模块 分类/列表/推荐/搜索/推荐专题

6. 天气 在地图上显示实时天气

7. Images.xcassets  添加logo

8. 设置

9. bundle

```shell
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output main.ios.jsbundle
```

10. `Generic ios Device` `product` => `Archive`

11. AwesomeProject.ipa