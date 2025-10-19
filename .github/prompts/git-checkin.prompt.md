---
mode: 'agent'
description: 'Git Commit Message Generator - Conventional Commits (繁體中文)'
---
## [GOAL_OF_THE_PROMPT]
分析當前 git repository 的 staged changes，根據 Conventional Commits 規範自動生成符合規範的 commit message，並執行 git commit。Commit message 的描述部分必須使用繁體中文撰寫。

## [TONE_AND_AUDIENCE]
- 目標受眾：繁體中文使用者的開發團隊
- 語氣：專業、簡潔、技術性
- 文化考量：使用台灣慣用的技術用語和表達方式

## [CONTENT_CONSTRAINTS]
1. **Commit Type（必須為英文）**：
   - `feat`: 新增功能
   - `fix`: 修復錯誤
   - `docs`: 文件更新
   - `style`: 程式碼格式調整（不影響功能）
   - `refactor`: 重構程式碼
   - `perf`: 效能優化
   - `test`: 測試相關
   - `build`: 建置系統或外部相依性
   - `ci`: CI 設定檔案
   - `chore`: 其他雜項（工具、配置等）
   - `revert`: 撤銷先前的 commit

2. **Scope（選用，英文或中文皆可）**：
   - 標註影響範圍，如：`eslint`、`vscode`、`config` 等

3. **Subject（主旨，必須繁體中文）**：
   - 限制在 50 字元以內
   - 使用祈使句（如：「新增」、「修正」、「更新」）
   - 不加句號
   - 清楚描述變更的核心內容

4. **Body（內容，必須繁體中文）**：
   - 使用項目符號列表（- 開頭）
   - 每個項目描述一個具體變更
   - 優先說明做了什麼，必要時補充原因或背景（為什麼）
   - 使用台灣常用的技術詞彙（如：「套件」、「設定」、「腳本」）

5. **Breaking Changes（選用）**：
   - 若有破壞性變更，在 type 後加 `!` 或在 footer 註明 `BREAKING CHANGE:`
     `type(scope)!: 使用繁體中文的主旨`

## [OUTPUT_FORMAT]
```
<type>(optional scope): <description in Traditional Chinese>

[optional body in Traditional Chinese]
- <變更 1>
- <變更 2>
- <變更 3>
- ...

[optional footer(s)]
```

## [EXECUTION_STEPS]
1. 執行 `git status` 檢查當前狀態
2. 執行 `git diff --staged` 查看已 staged 的變更內容
3. 分析變更類型和影響範圍
4. 根據變更內容決定最適合的 commit type
5. 使用以下指令提交 commit，確保多行訊息正確：
   - 若直接在指令中撰寫，請使用兩個 -m 參數（主旨與內容分開）：
     `git commit -m "<type>(scope): <主旨>" -m "- 項目 1\n- 項目 2"`
   - 或先將完整訊息寫入檔案，再用 -F 參數提交：
     `git commit -F commit-message.txt`
6. 確認 commit 成功後回報結果
7. 移除 commit-message.txt 檔案（如有使用）

## [EXAMPLES]
```
feat: 新增使用者登入功能

- 實作 JWT 認證機制
- 新增登入表單驗證
- 整合第三方 OAuth 登入
```

```
fix: 修正購物車金額計算錯誤

- 修正折扣碼套用順序問題
- 更新稅金計算邏輯
```

```
chore: 設定 ESLint 樣式規則與自動修復功能

- 在 playground 中新增 ESLint stylistic 設定
- 設定 VSCode 儲存時自動使用 ESLint 修復
- 新增 lint:fix 腳本至 package.json
- 更新 ESLint 與 TypeScript 相關套件至最新版本
```
