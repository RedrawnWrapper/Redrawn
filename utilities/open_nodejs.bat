@echo off
cd %USERPROFILE%\Redrawn\wrapper
if not exist node_modules ( npm install && npm start ) else ( npm start )
