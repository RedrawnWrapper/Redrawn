@echo off
:: Redrawn Launcher
:: made with love by daza and miiartisan
:: Author: benson#0411
:: Project Runner: MiiArtisan#1687
:: License: MIT
:: Confirm measurements to proceed.
cd %USERPROFILE%\Redrawn
set SUBSCRIPT=y
echo Loading settings...
if not exist utilities\config.bat ( goto configmissing )
call utilities\config.bat
set WRAPPER_VER=0.0.1
set WRAPPER_BLD=1
title Redrawn v%WRAPPER_VER% ^(build %WRAPPER_BLD%^) [Initializing...]

::::::::::::::::::::
:: Initialization ::
::::::::::::::::::::

:: Stop commands from spamming stuff, cleans up the screen
@echo off && cls

:: check for updates

pushd "%~dp0"
if %AUTOUPDATE%==y ( 
	pushd "%~dp0"
	if exist .git (
		echo Updating...
		call utilities\PortableGit\bin\git.exe pull || call utilities\PortableGit\bin\git.exe config --global --add safe.directory %USERPROFILE%\Redrawn && call utilities\PortableGit\bin\git.exe add . && call utilities\PortableGit\bin\git.exe stash && call utilities\PortableGit\bin\git.exe pull
		PING -n 3 127.0.0.1>nul
		cls
	) else (
		echo Git not found. Skipping update.
		PING -n 3 127.0.0.1>nul
		cls
	)
) else (
	echo Auto-updating is off. Skipping update.
	PING -n 3 127.0.0.1>nul
	cls
)

:: Lets variables work or something idk im not a nerd
SETLOCAL ENABLEDELAYEDEXPANSION

:: Make sure we're starting in the correct folder, and that it worked (otherwise things would go horribly wrong)
pushd "%~dp0"
if %errorlevel% NEQ 0 goto error_location
if not exist utilities ( goto error_location )
if not exist wrapper ( goto error_location )
if not exist server ( goto error_location )
goto noerror_location
:error_location
echo File is missing. Verify everything is at where it should be or redownload Redrawn.
pause && exit
:noerror_location

:: patch detection
if exist "patch.jpg" goto patched

:: Prevents CTRL+C cancelling (please close with 0) and keeps window open when crashing
if "%~1" equ "point_insertion" goto point_insertion
start "" /wait /B "%~F0" point_insertion
exit

:point_insertion

:: Check *again* because it seems like sometimes it doesn't go into dp0 the first time???
pushd "%~dp0"
if %errorlevel% NEQ 0 goto error_location
if not exist utilities ( goto error_location )
if not exist wrapper ( goto error_location )
if not exist server ( goto error_location )

:: Create checks folder if nonexistent
if not exist "utilities\checks" md utilities\checks

:: Welcome, Director Ford!
echo Redrawn
echo A project from VisualPlugin adapted by MiiArtisan, DazaSeal and the Redrawn Team
echo Version %WRAPPER_VER%, build %WRAPPER_BLD%
echo:
echo:
if %VERBOSEWRAPPER%==y ( echo Verbose mode activated. && echo:)
goto configavailable

:: Restore config
:configmissing
echo Settings are missing for some reason?
echo Restoring...
goto configcopy
:returnfromconfigcopy
if not exist utilities\config.bat ( echo Something is horribly wrong. You may be in a read-only system/admin folder. & pause & exit )
call utilities\config.bat
:configavailable

::::::::::::::::::::::
:: Dependency Check ::
::::::::::::::::::::::

title Redrawn v%WRAPPER_VER% ^(build %WRAPPER_BLD%^) [Checking For HTTPS Server dependencies...]

:: Preload variables
set HTTPSERVER_DETECTED=n
set HTTPSCERT_DETECTED=n
if %INCLUDEDCHROMIUM%==y set BROWSER_TYPE=chrome

if %VERBOSEWRAPPER%==y ( echo Checking for http-server installation... )
npm list -g | findstr "http-server" >nul
if %errorlevel% == 0 (
	echo http-server is installed.
	goto skip_dependency_install
) else (
	echo http-server could not be found.
	goto installhttpserver
)

::::::::::::::::::::::::
:: Dependency Install ::
::::::::::::::::::::::::

title Redrawn v%WRAPPER_VER% ^(build %WRAPPER_BLD%^) [Installing dependencies...]
:: http-server
:installhttpserver
if %HTTPSERVER_DETECTED%==n (
	if %NODEJS_DETECTED%==y (
		echo Installing http-server...
		echo:

		:: Skip in dry run, not much use to run it
		if %DRYRUN%==y (
			echo ...actually, nah, let's skip this part.
			goto httpserverinstalled
		) 

		:: Attempt to install through NPM normally
		call npm install http-server -g

		:: Double check for installation
		echo Checking for http-server installation again...
		npm list -g | find "http-server" > nul
		if %errorlevel% == 0 (
			goto httpserverinstalled
		) else (
			echo:
			echo Online installation attempt failed. Trying again from local files...
			echo:
			if not exist "utilities\installers\http-server-master" (
				echo Well, we'd try that if the files existed.
				echo A normal copy of Redrawn should come with them.
				echo You should be able to find a copy on this website:
				echo https://www.npmjs.com/package/http-server
				echo Although http-server is needed, Offline will try to install anything else it can.
				pause
				goto after_nodejs_install
			)
			call npm install utilities\installers\http-server-master -g
			goto triplecheckhttpserver
		)

		:: Triple check for installation
		echo Checking for http-server installation AGAIN...
		:triplecheckhttpserver
		npm list -g | find "http-server" > nul
		if %errorlevel% == 0 (
			goto httpserverinstalled
		) else (
			echo:
			echo Local file installation failed. Something's not right.
			echo Unless this was intentional, ask for support or install http-server manually.
			echo Enter "npm install http-server -g" into a command prompt.
			echo:
			pause
			exit
		)
	) else (
		color cf
		echo:
		echo http-server is missing, but somehow Node.js has not been installed yet.
		echo Seems either the install failed, or Redrawn managed to skip it.
		echo If installing directly from nodejs.org does not work, something is horribly wrong.
		echo Please ask for help in the #support channel on Discord, or email me.
		pause
		exit
	)
	:httpserverinstalled
	echo http-server has been installed.
	echo:
	goto install_cert
)

color 0f
echo All dependencies now installed^^! Continuing with Redrawn boot.
echo:

:skip_dependency_install

::::::::::::::::::::::
:: Starting Redrawn ::
::::::::::::::::::::::

title Redrawn v%WRAPPER_VER% ^(build %WRAPPER_BLD%^) [Loading...]

:: Close existing node apps
:: Hopefully fixes EADDRINUSE errors??
if %VERBOSEWRAPPER%==y (
	echo Closing any existing node apps...
	if %DRYRUN%==n ( TASKKILL /IM node.exe /F )
	echo:
)

:: Start Node.js and http-server
echo Loading Node.js and http-server...
cd %USERPROFILE%\Redrawn\utilities
if %DRYRUN%==n ( start open_http-server.bat )
if %DRYRUN%==n ( start open_nodejs.bat )

:: Pause to allow startup
:: Prevents the video list opening too fast
:: timer is set for 2 minutes for slow computers
timeout 120

:: Open Wrapper in preferred browser
if %INCLUDEDCHROMIUM%==n (
	if %CUSTOMBROWSER%==n (
		echo Opening Redrawn in your default browser...
		if %DRYRUN%==n ( start http://localhost:4343 )
	) else (
		echo Opening Redrawn in your set browser...
		echo If this does not work, you may have set the path wrong.
		if %DRYRUN%==n ( start %CUSTOMBROWSER% http://localhost:4343 )
	)
) else (
	echo Opening Redrawn using included Chromium...
	pushd utilities\ungoogled-chromium
	if %APPCHROMIUM%==y (
		if %DRYRUN%==n ( start chrome.exe --allow-outdated-plugins --user-data-dir=the_profile --app=http://localhost:4343 )
	) else (
		if %DRYRUN%==n ( start chrome.exe --allow-outdated-plugins --user-data-dir=the_profile http://localhost:4343 )
	)
)
echo Redrawn has been started^^! The video list should now be open.

::::::::::::::::
:: Post-Start ::
::::::::::::::::

title Redrawn v%WRAPPER_VER% ^(build %WRAPPER_BLD%^)
if %VERBOSEWRAPPER%==y ( goto wrapperstarted )
:wrapperstartedcls
cls
:wrapperstarted

echo:
echo Redrawn v%WRAPPER_VER% ^(build %WRAPPER_BLD%^) running
echo A project from VisualPlugin adapted by MiiArtisan, DazaSeal and the Redrawn team
echo:
echo Enter 1 to reopen the video list
echo Enter 2 to open the server page
echo Enter ? to open the FAQ
echo Enter clr to clean up the screen
echo Enter 0 to close Redrawn
:wrapperidle
echo:
set /p CHOICE=Choice:
if "%choice%"=="0" goto exitwrapperconfirm
set FUCKOFF=n
if "%choice%"=="1" goto reopen_webpage
if "%choice%"=="2" goto open_server
if "%choice%"=="?" goto open_faq
if /i "%choice%"=="clr" goto wrapperstartedcls
if /i "%choice%"=="cls" goto wrapperstartedcls
if /i "%choice%"=="clear" goto wrapperstartedcls
echo Time to choose. && goto wrapperidle

:reopen_webpage
if %INCLUDEDCHROMIUM%==n (
	if %CUSTOMBROWSER%==n (
		echo Opening Redrawn in your default browser...
		start http://localhost:4343
	) else (
		echo Opening Redrawn in your set browser...
		start %CUSTOMBROWSER% http://localhost:4343 >nul
	)
) else (
	echo Opening Redrawn using included Chromium...
	pushd utilities\ungoogled-chromium
	if %APPCHROMIUM%==y (
		start chrome.exe --allow-outdated-plugins --user-data-dir=the_profile --app=http://localhost:4343 >nul
	) else (
		start chrome.exe --allow-outdated-plugins --user-data-dir=the_profile http://localhost:4343 >nul
	)
	popd
)
goto wrapperidle

:open_server
if %INCLUDEDCHROMIUM%==n (
	if %CUSTOMBROWSER%==n (
		echo Opening the server page in your default browser...
		start https://localhost:4664
	) else (
		echo Opening the server page in your set browser...
		start %CUSTOMBROWSER% https://localhost:4664 >nul
	)
) else (
	echo Opening the server page using included Chromium...
	pushd utilities\ungoogled-chromium
	if %APPCHROMIUM%==y (
		start chrome.exe --allow-outdated-plugins --user-data-dir=the_profile --app=https://localhost:4664 >nul
	) else (
		start chrome.exe --allow-outdated-plugins --user-data-dir=the_profile https://localhost:4664 >nul
	)
	popd
)
goto wrapperidle

:open_files
pushd ..
echo Opening the Redrawn folder...
start explorer.exe %USERPROFILE%\Redrawn
popd
goto wrapperidle

:youfuckoff
echo You fuck off.
set FUCKOFF=y
goto wrapperidle

:open_faq
echo Opening the FAQ...
start notepad.exe FAQ.txt
goto wrapperidle

:wipe_save
call utilities\reset_install.bat
if %errorlevel% equ 1 goto wrapperidle
:: flows straight to restart below

:restart
TASKKILL /IM node.exe /F
start "" /wait /B "%~F0" point_insertion
exit

::::::::::::::
:: Shutdown ::
::::::::::::::

:: Confirmation before shutting down
:exitwrapperconfirm
echo:
echo Are you sure you want to quit Redrawn?
echo Be sure to save all your work.
echo Type Y to quit, and N to go back.
:exitwrapperretry
set /p EXITCHOICE= Response:
echo:
if /i "%exitchoice%"=="y" goto point_extraction
if /i "%exitchoice%"=="yes" goto point_extraction
if /i "%exitchoice%"=="n" goto wrapperstartedcls
if /i "%exitchoice%"=="no" goto wrapperstartedcls
if /i "%exitchoice%"=="with style" goto exitwithstyle
echo You must answer Yes or No. && goto exitwrapperretry

:point_extraction

title Redrawn v%WRAPPER_VER% ^(build %WRAPPER_BLD%^) [Shutting down...]

:: Shut down Node.js, PHP and http-server
if %VERBOSEWRAPPER%==y (
	if %DRYRUN%==n ( TASKKILL /IM node.exe /F )
	if %DRYRUN%==n ( TASKKILL /IM php.exe /F )
	echo:
) else (
	if %DRYRUN%==n ( TASKKILL /IM node.exe /F 2>nul )
	if %DRYRUN%==n ( TASKKILL /IM php.exe /F 2>nul )
)

:: This is where I get off.
echo Redrawn has been shut down.
if %FUCKOFF%==y ( echo You're a good listener. )
echo This window will now close.
if %INCLUDEDCHROMIUM%==y (
	echo You can close the web browser now.
)
echo Open start_wrapper.bat again to start W:O again.
if %DRYRUN%==y ( echo Go wet your run next time. ) 
pause & exit

:exitwithstyle
title Redrawn v%WRAPPER_VER% ^(build %WRAPPER_BLD%^) [Shutting down... WITH STYLE]
echo SHUTTING DOWN REDRAWN
PING -n 3 127.0.0.1>nul
color 9b
echo BEWEWEWEWWW PSSHHHH KSHHHHHHHHHHHHHH
PING -n 3 127.0.0.1>nul
TASKKILL /IM node.exe /F
echo NODE DOT JS ANNIHILATED
PING -n 3 127.0.0.1>nul
TASKKILL /IM php.exe /F
echo PHP DESTROYED
PING -n 3 127.0.0.1>nul
echo TIME TO ELIMINATE REDRAWN
PING -n 3 127.0.0.1>nul
echo BOBOOBOBMWBOMBOM SOUND EFFECTSSSSS
PING -n 3 127.0.0.1>nul
echo REDRAWN ALSO ANNIHILA
PING -n 2 127.0.0.1>nul
exit
:configcopy
if not exist utilities ( md utilities )
echo :: Redrawn Config>> utilities\config.bat
echo :: This file is modified by settings.bat. It is not organized, but comments for each setting have been added.>> utilities\config.bat
echo :: You should be using settings.bat, and not touching this. Offline relies on this file remaining consistent, and it's easy to mess that up.>> utilities\config.bat
echo:>> utilities\config.bat
echo :: Opens this file in Notepad when run>> utilities\config.bat
echo setlocal>> utilities\config.bat
echo if "%%SUBSCRIPT%%"=="" ( pushd "%~dp0" ^& start notepad.exe config.bat ^& exit )>> utilities\config.bat
echo endlocal>> utilities\config.bat
echo:>> utilities\config.bat
echo :: Shows exactly Offline is doing, and never clears the screen. Useful for development and troubleshooting. Default: n>> utilities\config.bat
echo set VERBOSEWRAPPER=n>> utilities\config.bat
echo:>> utilities\config.bat
echo :: Won't check for dependencies (flash, node, etc) and goes straight to launching. Useful for speedy launching post-install. Default: n>> utilities\config.bat
echo set SKIPCHECKDEPENDS=n>> utilities\config.bat
echo:>> utilities\config.bat
echo :: Won't install dependencies, regardless of check results. Overridden by SKIPCHECKDEPENDS. Mostly useless, why did I add this again? Default: n>> utilities\config.bat
echo set SKIPDEPENDINSTALL=n>> utilities\config.bat
echo:>> utilities\config.bat
echo :: Opens Offline in an included copy of ungoogled-chromium. Allows continued use of Flash as modern browsers disable it. Default: y>> utilities\config.bat
echo set INCLUDEDCHROMIUM=y>> utilities\config.bat
echo:>> utilities\config.bat
echo :: Opens INCLUDEDCHROMIUM in headless mode. Looks pretty nice. Overrides CUSTOMBROWSER and BROWSER_TYPE. Default: y>> utilities\config.bat
echo set APPCHROMIUM=y>> utilities\config.bat
echo:>> utilities\config.bat
echo :: Opens Offline in a browser of the user's choice. Needs to be a path to a browser executable in quotes. Default: n>> utilities\config.bat
echo set CUSTOMBROWSER=n>> utilities\config.bat
echo:>> utilities\config.bat
echo :: Lets the launcher know what browser framework is being used. Mostly used by the Flash installer. Accepts "chrome", "firefox", and "n". Default: n>> utilities\config.bat
echo set BROWSER_TYPE=chrome>> utilities\config.bat
echo:>> utilities\config.bat
echo :: Runs through all of the scripts code, while never launching or installing anything. Useful for development. Default: n>> utilities\config.bat
echo set DRYRUN=n>> utilities\config.bat
echo:>> utilities\config.bat
goto returnfromconfigcopy
