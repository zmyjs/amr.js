# AMRPlayer

AMRPlayer 是一个基于 [amr.js](https://github.com/jpemartins/amr.js) 的现代化音频播放器库，支持 AMR 音频格式的加载和播放。从我本次更新时起，原版库已经 13 年未更新，使用了多个全局变量，不利于模块化。
本项目对其进行了现代化改造，支持 ES Module、CommonJS 和 IIFE 格式，兼容现代构建工具（如 Webpack、Rollup、Vite 等）。

## 功能特性

- 支持加载和播放 AMR 音频文件。
- 提供音频播放控制（播放、暂停、停止）。
- 支持将 AMR 音频转换为 WAV 格式。
- 兼容现代 JavaScript 构建工具（ES Module、CommonJS、IIFE）。

## 安装

你可以通过 npm 或 yarn 安装 AMRPlayer：

```bash
npm install amrplayer
```

或使用 yarn：

```bash
yarn add amrplayer
```

## 引入方式

根据你的项目环境，可以选择以下任意一种方式引入 AMRPlayer。

### 1. ES Module（推荐）

如果你的项目使用 ES Module（例如基于 Vite 或现代浏览器环境），可以通过以下方式引入：

```javascript
import AMRPlayer from 'amrplayer';

// 使用 AMRPlayer
const player = new AMRPlayer();
```

### 2. CommonJS

如果你的项目使用 CommonJS（例如 Node.js 环境或旧版构建工具），可以通过以下方式引入：

```javascript
const AMRPlayer = require('amrplayer');

// 使用 AMRPlayer
const player = new AMRPlayer();
```

### 3. 浏览器

如果你直接在浏览器中使用 `<script>` 标签引入，可以通过以下方式：

```html
<script src="https://unpkg.com/amrplayer/dist/amrplayer.js"></script>
<script>
  // AMRPlayer 会作为全局变量暴露
  const player = new AMRPlayer();
</script>
```

## 使用示例

### 1. 初始化 AMRPlayer

```javascript
import AMRPlayer from 'amrplayer';

const player = new AMRPlayer();
```

### 2. 加载 AMR 音频文件

#### 从 `ArrayBuffer` 加载

```javascript
const arrayBuffer = ...; // 从文件或其他来源获取 ArrayBuffer
player.setBuffer(arrayBuffer);
```

#### 从 `Blob` 加载

```javascript
const blob = ...; // 从文件或其他来源获取 Blob
await player.setBlob(blob);
```

### 3. 播放音频

```javascript
const audio = player.getAudio(() => {
  console.log('音频播放结束');
});

audio.start(); // 开始播放
audio.toggle(); // 切换播放状态（播放/暂停）
```

### 4. 转换为 WAV 格式

```javascript
const wavBuffer = player.getWAV();
console.log('WAV 格式的音频数据:', wavBuffer);
```

### 5. 控制音频播放

```javascript
audio.stop(); // 停止播放
audio.suspend(); // 暂停音频上下文
audio.resume(); // 恢复音频上下文
audio.close(); // 关闭音频上下文
```

### 6. 监听音频状态

```javascript
console.log('当前音频状态:', audio.state);
```

## API 文档

### `new AMRPlayer(params)`

创建一个 AMRPlayer 实例。

- `params`: 可选参数对象，用于初始化 AMRPlayer。

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

- `onEnd`: 音频播放结束时触发的回调函数。
- 返回一个 `AMRAudio` 实例。

### `AMRPlayer.getWAV()`

将当前音频数据转换为 WAV 格式。

- 返回一个 `ArrayBuffer`，包含 WAV 格式的音频数据。

---

### `AMRAudio` 类

#### `new AMRAudio(float32Array)`

创建一个 `AMRAudio` 实例。

- `float32Array`: 用于创建音频缓冲区的 `Float32Array`。

#### `AMRAudio.createSource()`

创建音频源并将其连接到音频上下文的输出目标。设置音频播放结束时的回调。

#### `AMRAudio.start()`

开始播放音频。

#### `AMRAudio.stop()`

停止播放音频。

#### `AMRAudio.close()`

关闭音频上下文。

#### `AMRAudio.suspend()`

暂停音频上下文。

#### `AMRAudio.resume()`

恢复音频上下文。

#### `AMRAudio.toggle()`

切换音频播放状态（播放、暂停、恢复）。

#### `AMRAudio.state`

获取当前音频播放状态（`'stopped'`、`'running'`、`'suspended'`）。

---

## 构建与开发

如果你需要自行构建项目，可以按照以下步骤操作：

1. 克隆仓库：

   ```bash
   git clone https://github.com/your-username/amrplayer.git
   cd amrplayer
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 构建项目：

   ```bash
   npm run build
   ```

4. 开发模式（监听文件变化并自动构建）：

   ```bash
   npm run dev
   ```

## 贡献

欢迎贡献代码！如果你有任何改进建议或发现问题，请提交 Issue 或 Pull Request。

## 许可证

本项目基于 MIT 许可证开源。详情请参阅 [LICENSE](LICENSE) 文件。
