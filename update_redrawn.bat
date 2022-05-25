@echo off
title Redrawn [Updating...]
cd %USERPROFILE%\Downloads
if not exist Redrawn ( echo You have not downloaded Redrawn using the installer. Please try again later. & pause & exit )
cd Redrawn
echo Updating....
:: Save the config in a temp copy before the update.
pushd utilities
if exist config.bat (
ren config.bat tempconfig.bat
)
pushd ..\
call utilities\PortableGit\bin\git.exe pull || call utilities\PortableGit\bin\git.exe stash && call utilities\PortableGit\bin\git.exe pull
:: Delete any files added when the online lvm feature and debug mode is turned on.
pushd wrapper
if exist config-offline.json (
if exist config-online.json (
del config-online.json
)
)
if exist env-nodebug.json (
if exist env-debug.json (
del env-debug.json
)
)
pushd ..\
if exist 405-error-redirect-fix.js (
del 405-error-redirect-fix.js
)
:: Rename the temp copy of the config.bat file to the main copy of the config.bat file after the update.
pushd utilities
if exist tempconfig.bat (
if exist config.bat (
del config.bat
)
ren tempconfig.bat config.bat
)
pushd ..\
:: Delete some modded revision stuff cuz thats not needed to run VLO
pushd wrapper
if exist revision (
rd /q /s revision
)
pushd ..\
echo Redrawn Has Been Updated
pause
