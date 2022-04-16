:: Redrawn Updater
:: Author: MiiArtisan#1687 (fuck octanuary)
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
echo Doesn't seem like this script is in the Redrawn folder.
pause && exit
:noerror_location

:::::::::::::::::::::::::
:: Post-Initialization ::
:::::::::::::::::::::::::

title Redrawn Updater

if not exist .git ( goto nogit )
:yesgit
echo Redrawn
echo A project from VisualPlugin adapted by MiiArtisan, DazaSeal and the Redrawn Team
echo:
echo Enter 1 to update Redrawn
echo Enter 0 to close the updater
goto wrapperidle
:nogit
echo You have not downloaded Redrawn using the batch installer.
echo Please download and run the batch file inside.
pause & exit
:wrapperidle
echo:

:::::::::::::
:: Choices ::
:::::::::::::

set /p CHOICE=Choice:
if "!choice!"=="0" goto exit
if "!choice!"=="1" goto update
echo Time to choose. && goto wrapperidle

:update
cls
pushd "%~dp0"
echo Pulling the repository from GitHub...
git pull
cls
echo Redrawn has been updated successfully^^!
start "" "%~dp0"
pause & exit

:exit
pause & exit
