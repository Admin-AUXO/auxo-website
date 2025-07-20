@echo off
echo ========================================
echo  GitHub Repository Setup
echo ========================================
echo.

echo Before running this script, make sure you have:
echo 1. Created a repository on GitHub
echo 2. Have the repository URL ready
echo.

set /p repo_url="Enter your GitHub repository URL (e.g., https://github.com/username/repo-name.git): "

if "%repo_url%"=="" (
    echo Error: Repository URL cannot be empty
    pause
    exit /b 1
)

echo.
echo Adding remote repository...
git remote add origin %repo_url%

echo.
echo Verifying remote repository...
git remote -v

echo.
echo Setup complete! You can now run deploy.bat to push your files.
echo.
pause