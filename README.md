# Vue project

## NOTE

【原因】项目本身存在一个 mock 的 data.json 文件，但是需要去配置本地路由来使用

【步骤】

- 首先进行 `yarn` 或者 `npm install` 安装依赖
- 然后去 `node_modules` 里面找到 `webpack-dev-server` 的包，在包里找到 `Server.js`
- 然后配置里面的 `express` 的路由，将我们的 json 文件单独用作一个本地路由请求的返回值
- 这样以来就可以通过路由来获取我们的 mock 数据

这里没有使用其他的 mock 方式，后面可以进行优化，目前可以使用就好了。
