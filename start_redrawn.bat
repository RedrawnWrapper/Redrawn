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
:: Starting Wrapper ::
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
timeout 16

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
if %VERBOSEWRAPPER%==n ( echo DON'T CLOSE THIS WINDOW^^! Use the quit option ^(0^) when you're done. ) else ( echo Verbose mode is on, see the two extra CMD windows for extra output. )
if %DRYRUN%==y ( echo Don't forget, nothing actually happened, this was a dry run. )
if %JUSTIMPORTED%==y ( echo Note: You'll need to reload the editor for your file to appear. )
:: Hello, code wanderer. Enjoy seeing all the secret options easily instead of finding them yourself.
echo:
echo Enter 1 to reopen the video list
echo Enter 2 to open the server page
echo Enter ? to open the FAQ
echo Enter clr to clean up the screen
echo Enter 0 to close Redrawn
set /a _rand=(%RANDOM%*67/32768)+1
if %_rand%==25 echo Enter things you think'll show a secret if you're feeling adventurous
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
:: funni options
if "%choice%"=="43" echo OH MY GOD. FOURTY THREE CHARS. NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO & goto wrapperidle
if /i "%choice%"=="benson" echo watch benson on youtube & goto wrapperidle
if /i "%choice%"=="ford" echo what up son & goto wrapperidle
if /i "%choice%"=="no" echo stahp & goto wrapperidle
if /i "%choice%"=="yes" echo Alright. & goto wrapperidle
if /i "%choice%"=="fuck off" goto youfuckoff
if /i "%choice%"=="fuck you" echo No, fuck you. & goto wrapperidle
if /i "%choice%"=="sex" echo that's fake & goto wrapperidle
if /i "%choice%"=="watch benson on youtube" goto w_a_t_c_h
if /i "%choice%"=="browser slayer" goto slayerstestaments
if /i "%choice%"=="patch" goto patchtime
if /i "%choice%"=="random" goto sayarandom
if /i "%choice%"=="octanuary" echo i am a traitor and retard & goto wrapperidle
if /i "%choice%"=="die" echo die please & goto wrapperidle
if /i "%choice%"=="aaron doan" echo YOU^^%^^!^^! Noo Wrapper Is Patched Forever^^!^^!^^! Cries And Hits You So Many Times & goto wrapperidle
if /i "%choice%"=="spark" echo OOOOH GUYS IM A FUCKING DICK & goto wrapperidle
:: dev options
if /i "%choice%"=="amnesia" goto wipe_save
if /i "%choice%"=="restart" goto restart
if /i "%choice%"=="folder" goto open_files
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
start explorer.exe Redrawn
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

:w_a_t_c_h
echo watch benson on youtube
echo watch benson on youtube
echo watch benson on youtube
echo watch benson on youtube
echo watch benson on youtube
echo wa
goto wrapperidle

:patchtime
echo:
echo would you like to patch whoper online
echo press y or n
:patchtimeretry
set /p PATCHCHOICE= Response:
echo:
if not '%patchchoice%'=='' set patchchoice=%patchchoice:~0,1%
if /i "%patchchoice%"=="y" echo too bad B^) & goto wrapperidle
if /i "%patchchoice%"=="n" echo good & goto wrapperidle
echo yes or no question here && goto patchtimeretry

:sayarandom
:: welcome to "inside jokes with no context" land
set /a _rand=%RANDOM%*15/32767
if %_rand%==0 echo stress level ^>0
if %_rand%==1 echo Something random.
if %_rand%==2 echo oisjdoiajfgmafvdsdg
if %_rand%==3 echo my head is unscrewed & echo what do i need it for
if %_rand%==4 echo when you're eating popcorn you're eating busted nuts
if %_rand%==5 echo chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken 
if %_rand%==6 echo when u nut so hard that ur roblox crashes
if %_rand%==7 echo seven seven seven seven seven seven seven seven seven seven seven seven seven seven seven seven
if %_rand%==8 echo DONT ASK HOW I GOT IT OR YOU WILL BE BANNED FROM MY CHANNEL WITH NO SECOND CHANCES
if %_rand%==9 echo everything you know is wrong & echo black is white up is down and short is long
if %_rand%==10 echo It's a chekcpoint.
if %_rand%==11 echo Another monday... & echo Another mind-numbing, run-of-the-mill monday... & echo ANOTHER MUNDANE, MORIBUND, HUMDRUM MONDAY!
if %_rand%==12 echo try typing "with style" when exiting
if %_rand%==13 echo elmo
if %_rand%==14 echo gnorm gnat says: trans rights are human rights
if %_rand%==15 echo wrapper inline
if %_rand%==16 echo SUS
goto wrapperidle

:slayerstestaments
echo:
echo In the first age,
PING -n 3 127.0.0.1>nul
echo In the first battle,
PING -n 3 127.0.0.1>nul
echo When the shadows first lengthened,
PING -n 4 127.0.0.1>nul
echo One stood.
PING -n 3 127.0.0.1>nul
echo Slowed by the waste of unoptimized websites,
PING -n 4 127.0.0.1>nul
echo His soul harvested by the trackers of Google
PING -n 5 127.0.0.1>nul
echo And exposed beyond anonymity, 
PING -n 4 127.0.0.1>nul
echo He chose the path of perpetual torment.
PING -n 6 127.0.0.1>nul
echo In his ravenous hatred,
PING -n 3 127.0.0.1>nul
echo He found no peace,
PING -n 3 127.0.0.1>nul
echo And with boiling blood,
PING -n 3 127.0.0.1>nul
echo He scoured the search results,
PING -n 4 127.0.0.1>nul
echo Seeking vengeance against the companies who had wronged him.
PING -n 6 127.0.0.1>nul
echo He wore the crown of the Taskkillers,
PING -n 4 127.0.0.1>nul
echo and those that tasted the bite of his sword
PING -n 5 127.0.0.1>nul
echo named him...
PING -n 3 127.0.0.1>nul
echo the Browser Slayer.
PING -n 3 127.0.0.1>nul
:: here comes something that looks awesome normaly but is disgusting when escaped for batch
:: credit to http://www.gamers.org/~fpv/doomlogo.html
echo ^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=     ^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=     ^=^=^=^=^=^=^=^=^=^=^=^=^=^=^=   ^=^=^=^=^=^=^=^=  ^=^=^=^=^=^=^=^=
echo ^\^\ ^. ^. ^. ^. ^. ^. ^.^\^\   //^. ^. ^. ^. ^. ^. ^.^\^\   //^. ^. ^. ^. ^. ^. ^.^\^\  ^\^\^. ^. ^.^\^\// ^. ^. //
echo ^|^|^. ^. ^._____^. ^. ^.^|^| ^|^|^. ^. ^._____^. ^. ^.^|^| ^|^|^. ^. ^._____^. ^. ^.^|^| ^|^| ^. ^. ^.^\/ ^. ^. ^.^|^|
echo ^|^| ^. ^.^|^|   ^|^|^. ^. ^|^| ^|^| ^. ^.^|^|   ^|^|^. ^. ^|^| ^|^| ^. ^.^|^|   ^|^|^. ^. ^|^| ^|^|^. ^. ^. ^. ^. ^. ^. ^|^|
echo ^|^|^. ^. ^|^|   ^|^| ^. ^.^|^| ^|^|^. ^. ^|^|   ^|^| ^. ^.^|^| ^|^|^. ^. ^|^|   ^|^| ^. ^.^|^| ^|^| ^. ^| ^. ^. ^. ^. ^.^|^|
echo ^|^| ^. ^.^|^|   ^|^|^. _-^|^| ^|^|-_ ^.^|^|   ^|^|^. ^. ^|^| ^|^| ^. ^.^|^|   ^|^|^. _-^|^| ^|^|-_^.^|^\ ^. ^. ^. ^. ^|^|
echo ^|^|^. ^. ^|^|   ^|^|-^'  ^|^| ^|^|  ^`-^|^|   ^|^| ^. ^.^|^| ^|^|^. ^. ^|^|   ^|^|-^'  ^|^| ^|^|  ^`^|^\_ ^. ^.^|^. ^.^|^|
echo ^|^| ^. _^|^|   ^|^|    ^|^| ^|^|    ^|^|   ^|^|_ ^. ^|^| ^|^| ^. _^|^|   ^|^|    ^|^| ^|^|   ^|^\ ^`-_/^| ^. ^|^|
echo ^|^|_-^' ^|^|  ^.^|/    ^|^| ^|^|    ^\^|^.  ^|^| ^`-_^|^| ^|^|_-^' ^|^|  ^.^|/    ^|^| ^|^|   ^| ^\  / ^|-_^.^|^|
echo ^|^|    ^|^|_-^'      ^|^| ^|^|      ^`-_^|^|    ^|^| ^|^|    ^|^|_-^'      ^|^| ^|^|   ^| ^\  / ^|  ^`^|^|
echo ^|^|    ^`^'         ^|^| ^|^|         ^`^'    ^|^| ^|^|    ^`^'         ^|^| ^|^|   ^| ^\  / ^|   ^|^|
echo ^|^|            ^.^=^=^=^' ^`^=^=^=^.         ^.^=^=^=^'^.^`^=^=^=^.         ^.^=^=^=^' /^=^=^. ^|  ^\/  ^|   ^|^|
echo ^|^|         ^.^=^=^'   ^\_^|-_ ^`^=^=^=^. ^.^=^=^=^'   _^|_   ^`^=^=^=^. ^.^=^=^=^' _-^|/   ^`^=^=  ^\/  ^|   ^|^|
echo ^|^|      ^.^=^=^'    _-^'    ^`-_  ^`^=^'    _-^'   ^`-_    ^`^=^'  _-^'   ^`-_  /^|  ^\/  ^|   ^|^|
echo ^|^|   ^.^=^=^'    _-^'          ^`-__^\^._-^'         ^`-_^./__-^'         ^`^' ^|^. /^|  ^|   ^|^|
echo ^|^|^.^=^=^'    _-^'                                                     ^`^' ^|  /^=^=^.^|^|
echo ^=^=^'    _-^'                                                            ^\/   ^`^=^=
echo ^\   _-^'                                                                ^`-_   /
echo  ^`^'^'                                                                      ^`^`^'
goto wrapperidle

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

:patched
title candypaper nointernet PATCHED edition
color 43
echo OH MY GODDDDD
PING -n 3 127.0.0.1>nul
echo SWEETSSHEET LACKOFINTERNS PATCHED DETECTED^^!^^!^^!^^!^^!^^!^^!^^!^^!^^!^^!^^!
PING -n 3 127.0.0.1>nul
echo can never be use again...
PING -n 4 127.0.0.1>nul
echo whoever put patch.jpeg back, you are grounded grounded gorrudjnmed for 6000
PING -n 3 127.0.0.1>nul
:grr
echo g r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r r 
goto grr

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
