# 管理后台


## 目录结构

```bash
├── build                      # 构建相关
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   │   ├──Breadcrumb          # 面包屑组件  
│   │   ├──Charts              # 图表组件
│   │   ├──Hamburger           # 图标动画控件
│   │   └──SvgIcon             # svg图标
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   │   ├── components         # 布局公用组件
│   │   │   ├──Sidebar         # 侧边栏菜单组件  
│   │   │   ├──AppMain.vue     # 主入口文件
│   │   │   ├──index.js        # 主输出文件
│   │   │   └──Navbar.vue      # Navbar组件
│   │   ├── mixin              # 组件混合运用
│   │   │   └──ResizeHandler.js# window的resize事件方法适配 
│   │   └── index.vue          # 布局入口文件
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   │   ├──home                # 系统首页
│   │   ├──login               # 登录页面
│   │   └──404.vue             # 页面不存在提示
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   ├── permission.js          # 权限管理
│   └── settings.js            # 菜单栏显示相关设置
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .gitignore                 # git忽略文件
├── .postcssrc.js              # 添加浏览器私缀
├── .travis.yml                # 自动化CI配置
├── babel.config.js            # babel-loader 配置
├── jest.config.js             # Javascript单元测试配置
├── LICENSE                    # 开源声明
├── package.json               # package.json
├── README.md                  # 描述文件
└── vue.config.js              # vue-cli 配置

```

## 开发

```bash
# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境--设置基本
npm run build:prod
```
