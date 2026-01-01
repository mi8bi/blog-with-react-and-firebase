# React + TypeScript + Vite + Firebase ブログアプリ

このテンプレートは、React、TypeScript、Vite、Firebase を使用したブログアプリケーションです。HMR とESLint ルールがセットアップされています。

## セットアップ手順

### 1. 依存パッケージのインストール

```bash
npm install
# または
yarn install
```

### 2. Firebase プロジェクトの設定

Firebase コンソールで新しいプロジェクトを作成し、Firebase SDK をプロジェクトに追加します。

### 3. 環境変数の設定

プロジェクトのルートに `.env` ファイルを作成し、Firebase の設定を追加します。

```
VITE_FIREBASE_API_KEY=あなたのAPIキー
VITE_FIREBASE_AUTH_DOMAIN=あなたのプロジェクトID.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=あなたのプロジェクトID
VITE_FIREBASE_STORAGE_BUCKET=あなたのプロジェクトID.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=あなたのSender ID
VITE_FIREBASE_APP_ID=あなたのApp ID
```

### 4. Firebase の初期化

アプリケーションのエントリーポイントで Firebase を初期化します。

```ts
// main.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
```

### 5. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

## 使用技術

- [React](https://reactjs.org/) - ユーザインターフェースライブラリ
- [TypeScript](https://www.typescriptlang.org/) - 型安全なプログラミング
- [Vite](https://vitejs.dev/) - 高速ビルドツール
- [Firebase](https://firebase.google.com/) - バックエンドサービス

## その他

詳細な設定やカスタマイズについては、各技術の公式ドキュメントを参照してください。
