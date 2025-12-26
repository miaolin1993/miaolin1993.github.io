---
date: 2025-12-18 19:30:00
title: Npm发包
link: /blog/npm
---
# {{ $frontmatter.title }}

> 解决代码在不同场景下的复用问题，无论是谁以及什么设备，只需一个 npm i 即可稳定获取代码


前置准备：
- 源是npm默认源
- 有npm账号
- 权限处理正确

**源问题**

``` SHELL
# 查看当前npm源
npm config get registry

# npm默认源
https://registry.npmjs.org/

# 淘宝源
https://registry.npmmirror.com/

# 设置源
npm config set registry https://registry.npmjs.org/
```

发包的话，必须是在npm默认源操作才可以

**npm账号**

```SHELL 
# 官网注册账号
https://www.npmjs.com/

# 代码命令行登录，输入账号密码和验证
npm login

# 对packages.json里的版本进行升级，之后发布
npm publish

```

**2FA权限问题**

正常到这就发布成功了，若出现权限问题

最简单办法去官网设置一个2FA，嫌麻烦可以用下面办法跳过

先去官网新增一个Access Tokens

需要勾选Bypass two-factor authentication (2FA)，权限要给可写入

新建成功会获得token码，在.npmrc文件新增一行:

```SHELL
//registry.npmjs.org/:_authToken= 获取的npm token码
```

该绕过方法存在风险，确保个人电脑信息安全，或是持续交付场景下使用

**私有包权限问题**

可以在packages.json里添加，即可
```
  "publishConfig": {
    "access": "public"
  },
```

