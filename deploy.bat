@echo off
echo ========================================
echo  Auxo Executive Website Deployment
echo ========================================
echo.

echo [1/5] Adding all files to git...
git add .

echo [2/5] Checking git status...
git status

echo.
echo [3/5] Committing changes...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Update website files for GitHub Pages deployment

git commit -m "%commit_message%"

echo.
echo [4/5] Checking remote repository...
git remote -v

echo.
echo [5/5] Pushing to GitHub...
echo Note: You may need to authenticate with GitHub
git push origin master

echo.
echo ========================================
echo  Deployment Complete!
echo ========================================
echo.
echo Your website will be available at:
echo https://[your-username].github.io/[your-repo-name]
echo.
echo GitHub Actions will automatically build and deploy your site.
echo Check the Actions tab in your GitHub repository for build status.
echo.
pause