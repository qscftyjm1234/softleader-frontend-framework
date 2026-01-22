@echo off
chcp 65001 > nul
REM ========================================
REM 專案複製工具 (排除 node_modules)
REM ========================================

echo.
echo ========================================
echo 專案複製工具
echo ========================================
echo.

REM 取得當前專案路徑
set "SOURCE_DIR=%~dp0"
set "SOURCE_DIR=%SOURCE_DIR:~0,-1%"

REM 計算預設專案名稱 (目前名稱 + "-clone")
for %%i in ("%SOURCE_DIR%") do set "CURRENT_DIR_NAME=%%~nxi"
for %%i in ("%SOURCE_DIR%") do set "PARENT_DIR=%%~dpi"
set "DEFAULT_NAME=%CURRENT_DIR_NAME%-clone"

REM 詢問專案名稱
echo 預設專案名稱: %DEFAULT_NAME%
set /p "NEW_PROJECT_NAME=請輸入新專案名稱 (直接按 Enter 使用預設): "

REM 如果使用者沒輸入，則使用預設名稱
if "%NEW_PROJECT_NAME%"=="" set "NEW_PROJECT_NAME=%DEFAULT_NAME%"

REM 合成完整的目標路徑
set "DEST_DIR=%PARENT_DIR%%NEW_PROJECT_NAME%"

REM 檢查目標路徑是否已存在
if exist "%DEST_DIR%" (
    echo [警告] 目標路徑已存在: %DEST_DIR%
    set /p "CONFIRM=是否要覆蓋? (Y/N): "
    if /i not "%CONFIRM%"=="Y" (
        echo 操作已取消
        pause
        exit /b 0
    )
)

echo.
echo 開始複製專案...
echo 來源: %SOURCE_DIR%
echo 目標: %DEST_DIR%
echo.

REM 使用 robocopy 複製檔案,排除 node_modules 和其他不需要的資料夾
robocopy "%SOURCE_DIR%" "%DEST_DIR%" /E /XD node_modules .nuxt .output .git .agent .gemini dist build /XF *.log pnpm-lock.yaml package-lock.json yarn.lock tsconfig.tsbuildinfo /NFL /NDL /NJH /NJS /nc /ns /np

REM 檢查 robocopy 的結果
if %ERRORLEVEL% LEQ 7 (
    echo.
    echo ========================================
    echo 複製完成!
    echo ========================================
    echo.
    echo 目標位置: %DEST_DIR%
    echo.
    REM 自動開啟目標資料夾
    explorer "%DEST_DIR%"
    echo 提醒: 請記得在新專案中執行以下指令:
    echo   1. npm install  或  pnpm install
    echo   2. 複製並設定 .env 檔案
    echo.
) else (
    echo.
    echo [錯誤] 複製過程中發生錯誤 (錯誤碼: %ERRORLEVEL%)
    echo.
)

pause
