:: Redrawn Updater
:: Author: joseph the animator#2292
:: Original Author: tetradual#1525
:: License: MIT
title Redrawn Updater [Initializing...]

::::::::::::::::::::
:: Initialization ::
::::::::::::::::::::

:: Stop commands from spamming stuff, cleans up the screen
@echo off && cls

:: Lets variables work or something idk im not a nerd
SETLOCAL ENABLEDELAYEDEXPANSION

:: Make sure we're starting in the correct folder, and that it worked (otherwise things would go horribly wrong)
pushd "%~dp0"
if !errorlevel! NEQ 0 goto error_location
if not exist utilities ( goto error_location )
if not exist wrapper ( goto error_location )
if not exist server ( goto error_location )
goto noerror_location
:error_location
echo Doesn't seem like this script is in a Redrawn folder.
pause && exit
:noerror_location

:::::::::::::::::::::::::
:: Post-Initialization ::
:::::::::::::::::::::::::

title Redrawn Updater

if not exist .git ( goto nogit )
:yesgit
echo Redrawn Updater
echo A project from VisualPlugin adapted by IndyTheNerd and the Redrawn Team
echo:
echo Enter 1 to update Redrawn
echo Enter 0 to close the updater
goto wrapperidle
:nogit
echo You have not downloaded Redrawn using the installer... somehow??
echo Please download the installer and run it https://redrawnwrapper.github.io/Redrawn-Installer/install_redrawn.bat.
echo if your computer has 32bit UEFI, please run the installer here. https://redrawnwrapper.github.io/Redrawn-Installer/install_redrawn-x86.bat
pause & exit
:wrapperidle
echo:

:::::::::::::
:: Choices ::
:::::::::::::

set /p CHOICE=Choice:
if "!choice!"=="0" goto exitupdater
if "!choice!"=="1" goto update
echo Time to choose. && goto wrapperidle

:update
cls
pushd "%~dp0"
echo Pulling repository from GitHub...
git pull || git config --global --add safe.directory %USERPROFILE%\Redrawn && git add . && git stash && git pull
cls
echo Redrawn has been updated^^!
pause & exit

:exitupdater
pause & exit
