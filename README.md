# Rsship

Rsshipは、WebサイトのRSS情報を管理するためのツールです。
情報の収集、要約、活用を目的とし、情報の大海を進むための船のようになることを目指しています。

Rsship is a tool for managing RSS information on websites.
For the purpose of collecting, summarizing, and utilizing information, we aim to be like a ship for traveling through the ocean of information.

## NPMスクリプト説明

### test

未実装

### start

electornを実行する。
前提として、ビルドが終わっている必要がある

### build-dev

`clean` を実行後、 `build-dev-renderer` / `build-dev-main` を実行する。
詳細は、書く項目を参照

### build-dev-renderer

`webpack.renderer.config.js`を利用してwebpackによるtsファイルのコンパイルを実行し、`renderer.js`をdist配下に作成する。

### build-dev-main

`webpack.renderer.config.js`を利用してwebpackによるtsファイルのコンパイルを実行し、`main.js` / `preload.js`をdist配下に作成する。

### clean

`dist`配下のファイルをすべて削除する。
### build-dev:start

`build-dev` 実行後、`start` を実行する。
開発者モードでビルドして実行を行うためのコマンド。
コマンドの組み合わせでできるが、タイピングが面倒だったので作った。

## 実行ファイルの配布

検討中
