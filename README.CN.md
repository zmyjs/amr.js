# AMRPlayer

AMRPlayer 是 [amr.js](https://github.com/jpemartins/amr.js) 的现代化版本，支持 AMR 音频格式的加载和播放。

amr.js 已经停止更新，其使用了大量全局变量，不支持严格模式，不支持模块化，并且缺少文档。

本项目对其进行了现代化改造，支持 ES Module、CommonJS 和 IIFE 格式，兼容现代构建工具（如 Webpack、Rollup、Vite 等）。并加入播放控制支持、以及便捷的数据写入方式。

> 我在项目中用到AMR音频解释，发现可选择的库并不多，amr.js 虽然缺少维护但是仍然可用，感谢原作者们的付出，因此也把我的成果分享给大家。

[English](./README.md)

## 功能特性

- 方便加载AMR音频文件。
- 提供音频播放控制。
- 支持将AMR音频转换为WAV格式。
- 支持严格模式，支持模块化，兼容现代 JavaScript 构建工具。
- 不再使用多个全局变量，在浏览器环境只暴露一个全局变量。

## 安装

你可以通过 npm 安装 AMRPlayer：

```bash
npm install amrplayer
```

## 引入方式

根据你的项目环境，可以选择以下任意一种方式引入 AMRPlayer。

### 1. ES Module（推荐）

如果你的项目使用 ES Module（例如 Vite 或现代浏览器环境），可以通过以下方式引入：

```javascript
import AMRPlayer from 'amrplayer';

// 使用 AMRPlayer
const amrplayer = new AMRPlayer();
```

### 2. CommonJS

如果你的项目使用 CommonJS，可以通过以下方式引入：

```javascript
const AMRPlayer = require('amrplayer');

// 使用 AMRPlayer
const amrplayer = new AMRPlayer();
```

### 3. 浏览器

如果你直接在浏览器中使用 `<script>` 标签引入，可以通过以下方式：

```html
<script src="https://unpkg.com/amrplayer/dist/amrplayer.js"></script>
<script>
    // AMRPlayer 会作为全局变量暴露
    const amrplayer = new AMRPlayer();
</script>
```

## 使用示例

### 初始化 AMRPlayer

```javascript
import AMRPlayer from 'amrplayer';

const amrplayer = new AMRPlayer();
```

### 加载 AMR 音频文件

#### 从 `ArrayBuffer` 加载

```javascript
fetch('audio.amr')
   .then(response => response.arrayBuffer())
   .then(arrayBuffer => amrplayer.setBuffer(arrayBuffer));
```

#### 从 `Blob` 加载

```html
<input type="file" name="file" id="file" accept=".amr">
```

```javascript
const file = document.getElementById('file').files[0];
// 注意 setBlob 为异步接口
await amrplayer.setBlob(file);
```

### 转换为 WAV 格式

方便利用 `<audio>` 进行播放。

```html
<audio id="audio" controls></audio>
```

```javascript
const url = amrplayer.getWAV();
document.getElementById('audio').src = url;
```

### 音频播放

```javascript
const amraudio = amrplayer.getAudio(() => console.log('音频播放结束'));

// 同步接口
amraudio.start(); // 开始播放
amraudio.stop(); // 停止播放

// 异步接口
amraudio.suspend(); // 暂停播放
amraudio.resume(); // 继续播放
amraudio.toggle(); // 一键切换播放状态
amraudio.close(); // 当不再使用 amraudio 时，关闭音频上下文
```

### 音频状态

```javascript
console.log('当前音频状态:', amraudio.state);
```

## API 文档

### `new AMRPlayer()`

### `AMRPlayer.setBuffer(arrayBuffer)`

将传入的 `ArrayBuffer` 解码为 `Float32Array` 并设置为音频数据。

- `arrayBuffer`: 要解码的 `ArrayBuffer`。
- 返回解码后的 `Float32Array`。

### `AMRPlayer.setBlob(blob)`

将传入的 `Blob` 转换为 `ArrayBuffer` 并设置为音频数据。

- `blob`: 要转换的 `Blob`。
- 返回一个 `Promise`，解析为解码后的 `Float32Array`。

### `AMRPlayer.getAudio(onEnd)`

创建一个 `AMRAudio` 实例，并设置音频播放结束时的回调函数。

- `onEnd`: 音频播放结束时触发的回调函数
- 返回一个 `AMRAudio` 实例。

### `AMRPlayer.getWAV()`

将当前音频数据转换为 WAV 格式。

- 返回 base64 字符串：`data:audio/wav;base64,...`

---

### `AMRAudio` 类

#### `new AMRAudio(float32Array)`

创建一个 `AMRAudio` 实例。

- `float32Array`: 用于创建音频缓冲区的 `Float32Array`。

#### `AMRAudio.start()`

开始播放音频。

#### `AMRAudio.stop()`

停止播放音频。

#### `AMRAudio.close()`

关闭音频上下文。异步接口。

#### `AMRAudio.suspend()`

暂停音频上下文。异步接口。

#### `AMRAudio.resume()`

恢复音频上下文。异步接口。

#### `AMRAudio.toggle()`

切换音频播放状态，循环切换：播放->暂停->继续播放。异步接口。

#### `AMRAudio.state`

获取当前音频播放状态：`'stopped', 'running', 'suspended'`。

#### `AMRAudio.onEnd()`

当播放结束时自动调用。自动结束或调用`AMRAudio.stop()`都会触发。

---

## 许可证

本项目基于 MIT 许可证开源。详情请参阅 [LICENSE](LICENSE) 文件。
