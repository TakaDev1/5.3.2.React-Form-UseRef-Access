# React Form useRef Radio Button

`useRef`を使用して、ラジオボタンでサイズを選択するフォームを作成する練習アプリです。

ReactのState管理は使用せず、送信時に`ref`からラジオボタンの選択状態を取得します。

---

## 目次

* [1. 概要](#1-概要)
* [2. 学習内容](#2-学習内容)
* [3. 課題内容](#3-課題内容)
* [4. 条件](#4-条件)
* [5. ファイル構成](#5-ファイル構成)
* [6. 実装内容](#6-実装内容)

  * [6.1 useRefの作成](#61-userefの作成)
  * [6.2 ラジオボタンへのref設定](#62-ラジオボタンへのref設定)
  * [6.3 選択状態の確認](#63-選択状態の確認)
  * [6.4 フォーム送信処理](#64-フォーム送信処理)
* [7. useRefを使用する理由](#7-userefを使用する理由)
* [8. fieldsetとlegend](#8-fieldsetとlegend)
* [9. 動作イメージ](#9-動作イメージ)
* [10. 起動方法](#10-起動方法)

---

## 1. 概要

ラジオボタンを使用して、「小」「中」「大」の3つのサイズから1つを選択できるフォームを作成します。

選択状態は`useRef`を使用して取得し、ReactのState管理は使用しません。

送信時に選択されたサイズを`alert`で表示します。

---

## 2. 学習内容

このアプリでは、以下の内容を学習します。

* `useRef`
* ラジオボタン
* `checked`
* `ref.current`
* フォーム送信処理
* `event.preventDefault()`
* `fieldset`
* `legend`
* Uncontrolledコンポーネント
* 再レンダリングを発生させないフォーム処理

---

## 3. 課題内容

ラジオボタンで以下のサイズから1つを選択できるフォームを作成します。

```text
小
中
大
```

送信時に選択されたサイズを`alert`で表示します。

例えば「中」を選択した場合、

```text
中
```

と表示します。

何も選択されていない場合は、

```text
サイズが選択されていません
```

と表示します。

---

## 4. 条件

以下の条件を満たすように実装します。

### 条件1

それぞれのラジオボタンに`useRef`を作成します。

```ts
const smallRef = useRef<HTMLInputElement>(null);
const mediumRef = useRef<HTMLInputElement>(null);
const largeRef = useRef<HTMLInputElement>(null);
```

### 条件2

サイズが選択されていない場合は、

```text
サイズが選択されていません
```

と表示します。

### 条件3

ReactのState管理を使用せず、再レンダリングを伴わずに実装します。

---

## 5. ファイル構成

```text
src/
├── hooks/
│   └── useHandleSize.ts
├── Pages/
│   └── SizeAlert.tsx
├── App.tsx
├── index.css
└── main.tsx
```

### ファイルの役割

| ファイル               | 役割                  |
| ------------------ | ------------------- |
| `useHandleSize.ts` | `useRef`とサイズ判定処理を管理 |
| `SizeAlert.tsx`    | サイズ選択フォームを表示        |
| `App.tsx`          | アプリ全体の構成            |
| `index.css`        | Tailwind CSSの読み込み   |
| `main.tsx`         | Reactアプリのエントリーポイント  |

---

## 6. 実装内容

### 6.1 useRefの作成

それぞれのラジオボタンを参照するために、3つの`ref`を作成します。

```ts
import { useRef } from "react";

const smallRef = useRef<HTMLInputElement>(null);
const mediumRef = useRef<HTMLInputElement>(null);
const largeRef = useRef<HTMLInputElement>(null);
```

それぞれの`ref`は、対応するラジオボタンのDOM要素を参照します。

```text
smallRef
  ↓
「小」のラジオボタン

mediumRef
  ↓
「中」のラジオボタン

largeRef
  ↓
「大」のラジオボタン
```

---

### 6.2 ラジオボタンへのref設定

作成した`ref`を、それぞれのラジオボタンに設定します。

```tsx
<input
  type="radio"
  name="size"
  ref={smallRef}
/>

<input
  type="radio"
  name="size"
  ref={mediumRef}
/>

<input
  type="radio"
  name="size"
  ref={largeRef}
/>
```

`name="size"`を共通にすることで、3つのラジオボタンを同じグループとして扱います。

そのため、同時に複数のサイズを選択することはできません。

---

### 6.3 選択状態の確認

ラジオボタンが選択されているかどうかは、`checked`で確認できます。

```ts
smallRef.current?.checked
```

`checked`が`true`なら、そのラジオボタンが選択されています。

今回のサイズ判定では、条件演算子を使用して選択されたサイズを判定します。

```ts
const size = smallRef.current?.checked
  ? "小"
  : mediumRef.current?.checked
    ? "中"
    : largeRef.current?.checked
      ? "大"
      : "";
```

判定の流れは以下の通りです。

```text
「小」が選択されている？
        ↓
      Yes → "小"

      No
        ↓
「中」が選択されている？
        ↓
      Yes → "中"

      No
        ↓
「大」が選択されている？
        ↓
      Yes → "大"

      No
        ↓
       ""
```

---

### 6.4 フォーム送信処理

フォームが送信されたときに選択されたサイズを確認します。

```ts
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  const size = smallRef.current?.checked
    ? "小"
    : mediumRef.current?.checked
      ? "中"
      : largeRef.current?.checked
        ? "大"
        : "";

  if (!size) {
    alert("サイズが選択されていません");
  } else {
    alert(size);
  }
};
```

`event.preventDefault()`によって、フォーム送信時のページリロードを防ぎます。

---

## 7. useRefを使用する理由

今回の課題では、サイズの選択状態を`useState`で管理しません。

通常、`useState`を使用すると、

```text
ラジオボタンを選択
      ↓
Stateを更新
      ↓
再レンダリング
```

という流れになります。

今回は`useRef`を使用するため、

```text
ラジオボタンを選択
      ↓
DOMのcheckedが変更される
      ↓
ReactのStateは変更されない
      ↓
State更新による再レンダリングは発生しない
```

という仕組みになります。

送信時に必要になったタイミングで、

```ts
smallRef.current?.checked
```

のようにDOMから選択状態を取得します。

このようなフォームは、**Uncontrolledコンポーネント**の考え方に該当します。

---

## 8. fieldsetとlegend

今回のラジオボタンは、`fieldset`と`legend`を使用してグループ化しています。

```tsx
<fieldset>
  <legend>サイズ</legend>

  <label>
    <input type="radio" name="size" />
    小
  </label>

  <label>
    <input type="radio" name="size" />
    中
  </label>

  <label>
    <input type="radio" name="size" />
    大
  </label>
</fieldset>
```

### `fieldset`

関連するフォーム項目を1つのグループとしてまとめます。

### `legend`

`fieldset`でまとめたフォームグループのタイトルを表します。

今回の場合、

```text
fieldset
  └── legend → サイズ
       ├── 小
       ├── 中
       └── 大
```

という構造になります。

---

## 9. 動作イメージ

### 「小」を選択

```text
サイズ

○ 小
○ 中
○ 大

[確認]
```

「確認」をクリックすると、

```text
小
```

というアラートが表示されます。

### 「中」を選択

```text
サイズ

○ 小
● 中
○ 大

[確認]
```

「確認」をクリックすると、

```text
中
```

というアラートが表示されます。

### 何も選択していない場合

```text
サイズ

○ 小
○ 中
○ 大

[確認]
```

「確認」をクリックすると、

```text
サイズが選択されていません
```

というアラートが表示されます。

---

## 10. 起動方法

### パッケージのインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

表示されたURLにアクセスして、ラジオボタンの動作を確認します。
