
<div align=center>
<image src='./assets/1526620785154.jpg' width="550">
</div>

# weapp-start

[![NPM version](https://img.shields.io/npm/v/weapp-start.svg?style=flat)](https://npmjs.org/package/weapp-start)
[![Build Status](https://travis-ci.org/tolerance-go/weapp-start.svg?branch=master)](https://travis-ci.org/tolerance-go/weapp-start)
[![NPM downloads](http://img.shields.io/npm/dm/weapp-start.svg?style=flat)](https://npmjs.org/package/weapp-start)
[![Dependencies Status](https://david-dm.org/tolerance-go/weapp-start/status.svg)](https://david-dm.org/tolerance-go/weapp-start)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

改善小程序开发体验，高效，稳定的原生语法和组件，避免踩坑，同时提供更多的开发能力

> 我想要原生组件开发，我想要及时的文档更新，我想踩更少的坑，所以有了这个项目；如果去掉全部插件，原来的项目一样可以跑；但是如果你喜欢 less，那就加上 less，pug 呢？一样；欢迎 fork，star

# Features

* 支持 [npm](https://www.npmjs.com/) 包引入
* 支持 promise, async/await 等最新语法
* 支持多种编译器，如 pug/less/stylus
* 支持 ESlint
* 支持一键生成项目，组件模版
* 支持发布前资源压缩
* 支持自定义插件
* 多种工具，加速开发

# Install

```bash
npm i weapp-start -g
```

查看帮助

```bash
weapp-start -h
```

```bash
weapp-start <command> [options]

命令：
  weapp-start dev    watch build
  weapp-start build  打包构建
  weapp-start init   生成模版项目
  weapp-start new    生成模板页面

选项：
  -h, --help     显示帮助信息                                             [布尔]
  -v, --version  显示版本号                                               [布尔]
```

生成开发模版（项目模板都存放在[这里](https://github.com/tolerance-go/weapp-start-templates)，欢迎小伙伴 pr）

```bash
weapp-start init
```

进入生成目录，安装依赖

```bash
npm i
```

启动实时编译

```bash
weapp-start dev
```

使用微信开发者工具新建项目，项目目录选择刚刚生成的文件夹，会自动导入项目配置

# Tips

- `weapp-plugin-require` 是基于 `commonJS` 模块规范的静态处理，也就是说 `es6` 模块定义的话，需要配合 `weapp-plugin-babel` 插件使用，
`weapp-plugin-babel` 的顺序要在它之前。

- 小程序里面对于 `require('common.js')` 是当做相对路径的，而在 node 中是作为模块查找的，因此应该避免这种隐式的相对路径写法，应该用 `require('./common.js')` 代替；`weapp-plugin-require` 对二者做了兼容，不过会发出提示信息要求修改路径

- `weapp-plugin-jsmin` 只能对 es5 规范的代码进行压缩，将其顺序至于 `weapp-plugin-babel` 之后

- 所有压缩功能的插件，如果想对生成的额外文件进行处理，需要指定参数 `extra` 为 `true`

- 因为小程序的特有运行环境，在兼容外部 npm 包，比如 lodash 的时候，需要做一些 hack 操作，替换文本，但是它们更新太频繁了，精力不够，所以请在主项目锁死版本 lodash 版本号 `"lodash": "4.17.5"`

# Plugins

自定义插件文档 coming...

* [weapp-plugin-babel](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-babel) - 集成 [babel](https://github.com/babel/babel)，可以使用最新的 js 语法，而不必担心兼容
* [weapp-plugin-eslint](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-eslint) - 集成 [eslint](https://github.com/eslint/eslint)，自动检测代码规范
* [weapp-plugin-less](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-less) - 集成 [less](https://github.com/less/less.js)，使用 less 语法编写 wxss
* [weapp-plugin-pug](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-pug) - 集成 [pug](https://github.com/pugjs/pug)，使用 pug 语法编写 wxml
* [weapp-plugin-require](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-require) - 分析依赖，导入第三方 npm
* [weapp-plugin-stylus](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-stylus) - 集成 [stylus](https://github.com/stylus/stylus)，使用 stylus 语法编写 wxss
* [weapp-plugin-filter](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-filter) - 过滤文件
* [weapp-plugin-jsmin](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-jsmin) - 压缩 js
* [weapp-plugin-filemin](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-filemin) - 压缩 xml，json，css
* [weapp-plugin-imgmin](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-imgmin) - 压缩图片
* [weapp-plugin-postcss](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-plugin-postcss) - 集成 [postcss](https://github.com/postcss/postcss)，可以使用最新的 css 语法和特效，而不必担心兼容
* ...

# Utils

* [weapp-util-create-plugin](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-util-create-plugin) - 创建插件的工具方法
* [weapp-util-requestfix-promisify](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-util-requestfix-promisify) - 原生小程序所有api进行promise化；优化并发请求数量
* [weapp-util-watch-computed](https://github.com/tolerance-go/weapp-start/tree/master/packages/weapp-util-watch-computed) - 使原生小程序支持 watch，computed 属性
* ...

# Links

* [Contribution](https://github.com/tolerance-go/blog/issues/1#issue-313932480)
* Updatelog - 参考 `packages` 下各个包的 `CHANGELOG`

# License

[MIT](https://tldrlegal.com/license/mit-license)

<div align=center>
<image src='./assets/star.jpeg' width="550">
</div>