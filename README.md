# columbus-magic-url

## 安装

+ 使用 `npm` 或 `yarn` 安装
```bash
# npm 安装
npm i columbus-magic-url -S

# yarn 安装
yarn add columbus-magic-url
```

+ 使用`script`引入

`script`引入时，会注入全局变量`columbusMagicUrl`

## API

### encode

#### 入参

属性 | 类型 | 说明
--- | ---| ---
url | string | url地址
params | object | url需要携带的参数（会与原url携带的参数比较并增量更新）

#### 返回值

返回编码后的url

#### 示例

```js
import { encode } from 'columbus-magic-url';

const url = encode('https://example.com?from=wx', {from: 'abc', info: {id: 1, name: 'test'}});
// https://example.com?from=abc&info=eyJpZCI6MSwibmFtZSI6InRlc3QifQ%253D%253D
```

### encodeStringify

#### 入参

属性 | 类型 | 说明
--- | ---| ---
params | object | 需要编码的对象

#### 返回值

返回编码后的字符串

#### 示例

```js
import { encodeStringify } from 'columbus-magic-url';

const url = encodeStringify({from: 'abc', info: {id: 1, name: 'test'}});
// eyJmcm9tIjoiYWJjIiwiaW5mbyI6eyJpZCI6MSwibmFtZSI6InRlc3QifX0%3D
```

### decode

#### 入参

属性 | 类型 | 说明
--- | ---| ---
url | string | url地址

#### 返回值

url中携带的参数

#### 示例

```js
import { decode } from 'columbus-magic-url';

const params = decode('https://example.com?from=abc&info=eyJpZCI6MSwibmFtZSI6InRlc3QifQ%253D%253D');
// {from: 'abc', info: {id: 1, name: 'test'}}
```

### decodeParse

#### 入参

属性 | 类型 | 说明
--- | ---| ---
str | string | 字符串

#### 返回值

object

#### 示例

```js
import { decodeParse } from 'columbus-magic-url';

const params = decodeParse('eyJmcm9tIjoiYWJjIiwiaW5mbyI6eyJpZCI6MSwibmFtZSI6InRlc3QifX0%3D');
// {from: 'abc', info: {id: 1, name: 'test'}}
```

### decodeWithReturnOrignUrl

#### 入参

属性 | 类型 | 说明
--- | ---| ---
url | string | url地址

#### 返回值

属性 | 类型 | 说明
--- | ---| ---
originUrl | string | 原始url地址
params | object | url中携带的参数

#### 示例

```js
import { decodeWithReturnOrignUrl } from 'columbus-magic-url';

const params = decodeWithReturnOrignUrl('https://example.com?from=abc&info=eyJpZCI6MSwibmFtZSI6InRlc3QifQ%253D%253D');
// {originUrl: 'https://example.com', params: {from: 'abc', info: {id: 1, name: 'test'}}}
```

### encodeColumbusConnect 与 decodeColumbusConnect

仅对`url`携带的connect生效，用法同`encode`与`decode`

#### 示例
```js
import { encodeColumbusConnect, decodeColumbusConnect } from 'columbus-magic-url';

const url = encodeColumbusConnect('https://example.com?from=wx', { info: {id: 1, name: 'test'}, source: 'shop' });
// https://example.com?from=wx&connect=eyJpbmZvIjp7ImlkIjoxLCJuYW1lIjoidGVzdCJ9LCJzb3VyY2UiOiJzaG9wIn0%253D

const params = decodeColumbusConnect('https://example.com?from=wx&connect=eyJpbmZvIjp7ImlkIjoxLCJuYW1lIjoidGVzdCJ9LCJzb3VyY2UiOiJzaG9wIn0%253D');
// { info: {id: 1, name: 'test'}, source: 'shop' }
```
