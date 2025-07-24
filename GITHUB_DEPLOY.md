# 天气预报网站 - GitHub发布指南

## 📋 发布步骤

### 1. 创建GitHub仓库
1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `weather-forecast-app`
   - **Description**: `现代化的天气预报网站，支持实时查询和中文城市搜索`
   - **Public** (选择公开)
   - 不要勾选 "Add a README file"（我们已经有了）

### 2. 推送代码到GitHub
在当前项目目录下执行以下命令：

```bash
# 添加远程仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/weather-forecast-app.git

# 推送代码到GitHub
git branch -M main
git push -u origin main
```

### 3. 启用GitHub Pages
1. 进入您的GitHub仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分选择 "Deploy from a branch"
5. 选择 "main" 分支和 "/ (root)" 文件夹
6. 点击 "Save"

### 4. 访问您的网站
几分钟后，您的网站将在以下地址可用：
```
https://YOUR_USERNAME.github.io/weather-forecast-app/
```

## 🔧 配置API密钥

**重要提醒**：在GitHub上发布代码时，请注意API密钥的安全性！

### 方法1：环境变量（推荐）
1. 在GitHub仓库的 Settings > Secrets and variables > Actions 中添加密钥
2. 修改代码使用环境变量

### 方法2：用户自定义配置
让用户自己配置API密钥，提供配置界面。

### 方法3：移除API密钥
在推送到GitHub前，将API密钥替换为占位符：
```javascript
const API_KEY = 'YOUR_API_KEY_HERE'; // 用户需要自己配置
```

## 📁 项目结构
```
weather-forecast-app/
├── index.html              # 主页面
├── style.css               # 样式文件
├── script.js               # JavaScript逻辑
├── README.md               # 项目说明
├── .gitignore              # Git忽略文件
└── GITHUB_DEPLOY.md        # 部署指南
```

## 🌟 功能特点
- ✅ 实时天气查询
- ✅ 中文城市名称支持
- ✅ 地理定位功能
- ✅ 5天天气预报
- ✅ 响应式设计
- ✅ 现代化界面

## 📱 演示地址
- **CloudStudio**: http://2cddf01a939b487d971fce305f6698ea.ap-singapore.myide.io
- **GitHub Pages**: https://YOUR_USERNAME.github.io/weather-forecast-app/

## 🔄 更新代码
当您需要更新网站时：
```bash
git add .
git commit -m "更新描述"
git push origin main
```

GitHub Pages会自动更新您的网站。

## 📞 技术支持
如果遇到问题，请检查：
1. GitHub仓库是否为公开状态
2. GitHub Pages是否已启用
3. API密钥是否正确配置
4. 浏览器控制台是否有错误信息