# Online Word Wolf

通話しながらワードウルフできる Web アプリ

## Functions

- 名前を決める
- 名前を編集
- 新しい部屋をつくる
- 部屋への招待コードをコピーできる
- 招待コードで部屋に入る

## Issue

- theme card
- timer
- voting
- resalt
- continue
- icon を決める
- username の重複を回避
- alertModal をつくる
- 部屋から人がいなくなったら room を削除（ホストの継承も）

## Memo

- theme の申請
- userthemeversion
- 認証の永続性を調査（"始める"時のみにしたい）
- 登録制も検討

## Architecture

- React
- typescript
- Next.js
- Firebase
- styled-component
- mdx
- Recoil

## Components

### Layout

- Header
- Main
- Footer (FooterMenu)

### pages

displays を配置（State も Logic も持たない）

- Home
  /
- Room
  room
- Room[roomId]
  room/roomId

### display

pages に配置（props を持たない）

- OnGame
- StartButton

### templates

displays に配置

- NamePlate
- InviteCode
- Members

### Other

汎用性の高い Components

- button
- modal
- Input（未完成）
