#!/usr/bin/env pwsh

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Auxo Executive Website Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/5] Adding all files to git..." -ForegroundColor Yellow
git add .

Write-Host "[2/5] Checking git status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "[3/5] Committing changes..." -ForegroundColor Yellow
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update website files for GitHub Pages deployment"
}

git commit -m $commitMessage

Write-Host ""
Write-Host "[4/5] Checking remote repository..." -ForegroundColor Yellow
git remote -v

Write-Host ""
Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Note: You may need to authenticate with GitHub" -ForegroundColor Magenta
git push origin master

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your website will be available at:" -ForegroundColor White
Write-Host "https://[your-username].github.io/[your-repo-name]" -ForegroundColor Cyan
Write-Host ""
Write-Host "GitHub Actions will automatically build and deploy your site." -ForegroundColor White
Write-Host "Check the Actions tab in your GitHub repository for build status." -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to continue"