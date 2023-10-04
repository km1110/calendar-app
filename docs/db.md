# ER 図

## データベース

```mermaid
---
title: "タイトル"
---
erDiagram
    users ||--o{ schedules : ""
    users ||--o{ projects : ""
    users ||--o{ tasks : ""

    projects ||--o{ tasks : ""

    tasks ||--o{ tags : ""

    users {
      varchar id PK "ID"
      varchar firebase_uid "firebase uid"
      varchar username "ユーザー名"
      varchar email "メールアドレス"
      timestamp created_at "作成日時"
      timestamp updated_at "更新日時"
    }

    schedules {
      varchar id PK "ID"
      varchar user_id FK "ユーザーID:users.id"
      text title "タイトル"
      text description  "概要"
      text location  "場所"
      datetime date  "日付"
      timestamp created_at "作成日時"
      timestamp updated_at "更新日時"
    }

    projects {
      varchar id PK "ID"
      varchar user_id FK "ユーザーID"
      varchar title "タイトル"
      text description "概要"
      timestamp created_at "作成日時"
      timestamp updated_at "更新日時"
    }

    tasks {
      varchar id PK "ID"
      varchar user_id FK "ユーザーID"
      varchar project_id FK "プロジェクトID"
      varchar tag_id FK "タグID"
      varchar name "タスク名"
      boolean status "状態"
      timestamp created_at "作成日時"
      timestamp updated_at "更新日時"
    }

    tags {
      varchar id PK "ID"
      varchar name "タグ名"
    }
```
