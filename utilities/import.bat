title Wrapper: Offline Import Script
:: Helps to make importing files using the theme editing workaround easier
:: Author: benson#0411
:: License: MIT

:: Initialize (stop command spam, clean screen, make variables work, set to UTF-8)
@echo off && cls
SETLOCAL ENABLEDELAYEDEXPANSION

:: Move to base folder, and make sure it worked (otherwise things would go horribly wrong)
pushd "%~dp0"
if !errorlevel! NEQ 0 goto error_location
pushd ..
if !errorlevel! NEQ 0 goto error_location
if not exist utilities\import.bat ( goto error_location )
if not exist wrapper ( goto error_location )
if not exist server ( goto error_location )
popd utilities
if !errorlevel! NEQ 0 goto error_location
goto noerror_location
:error_location
echo Doesn't seem like this script is in Wrapper: Offline's utilities folder.
goto end
:noerror_location

:: Prevents CTRL+C cancelling and keeps window open when crashing
if "!SUBSCRIPT!"=="" (
	if "%~1" equ "point_insertion" goto point_insertion
	start "" /wait /B "%~F0" point_insertion
	exit
)
:point_insertion

:: patch detection
if exist "..\patch.jpg" echo importing doesn't matter if whopper's patched && goto end

:: Initialize variables
set FOLDERFILLED=n
set THEMEFOLDER=..\server\store\3a981f5cb2739137\import\

:: Check if files exist in import folder
if not exist import_these ( md import_these & goto askforfile )
for /f %%A in ('dir /B /A:-D import_these 2^>nul') do (
	if "%%A" NEQ "File Not Found" ( goto filesdetected )
)
goto askforfile

:: List all files in folder and verify they should be imported
:filesdetected
echo Would you like to import the following files?
echo Press Y to do it, press N to not do it.
echo:
dir /B /A:-D import_these
echo:
:importaskretry
set /p IMPORTCHOICE= Response:
echo:
if not '!importchoice!'=='' set importchoice=%importchoice:~0,1%
if /i "!importchoice!"=="y" goto startimport
if /i "!importchoice!"=="n" goto end
echo You must answer Yes or No. && goto importaskretry

:: Get file to import, move it to import folder
:askforfile
if !folderfilled!==n (
	echo Please drag the file you wish to import to this window, and press enter.
	echo If this doesn't work, right click the file while holding shift, and click Copy as path.
	echo You can use the utilities\import_these folder to add many files at once.
	echo:
	echo Type gotodir to open the import theme folder for manual modification.
	echo Type 0 to close this script, and go back to the launcher if started from there.
	:reaskforfile
	echo:
	set /p CFDIR= File:
	set CFDIR=%cfdir:"=%
	if /i "!CFDIR!"=="gotodir" start "" "!themefolder!" & goto end
	if /i "!CFDIR!"=="0" goto end
	if not exist "!CFDIR!" echo That doesn't seem to exist. & goto reaskforfile
	echo:
	for %%i in ("!cfdir!") do ( set CFID=%%~nxi )
	pushd import_these
	if exist "!cfid!" ( echo ...I have no idea how this code is activating, yet this file is already in the import_these folder. )
	copy "!cfdir!" "!cfid!" >nul
	popd
)

:startimport
for %%a in (import_these\*) do (
	:: Get file information
	for %%b in ("%%a") do (
		set CFNAME=%%~nb
		set CFEXT=%%~xb
		set CFID=%%~nxb
	)

	:: Images
	set "CFTYPE="
	if !cfext!==.png set CFTYPE="img"
	if !cfext!==.jpg set CFTYPE="img"
	if !cfext!==.jpeg set CFTYPE="img"
	if !cfext!==.gif set CFTYPE="img" & echo Note: GIFs won't be animated, it'll just show the first frame.
	if !cfext!==.webp echo Sorry, WebPs don't work. & echo: & goto moveconflicts
	:: Sounds
	if !cfext!==.mp3 set CFTYPE="mp3"
	if !cftype!=="mp3" (
		echo Press 1 if !cfname! is music or a sound effect.
		echo Press 2 if !cfname! is a voice clip.
		:mp3askretry
		set /p MP3CHOICE= Response:
		echo:
		if "!mp3choice!"=="0" goto end
		if "!mp3choice!"=="1" set CFTYPE="sound"
		if "!mp3choice!"=="2" (
			set CFTYPE="voice"
			goto voice
			)
		if "!CFTYPE!"=="" echo You must answer what type of file it is. && goto mp3askretry
		echo:
	)
	if !cfext!==.wav echo Sorry, WAVs don't work. & echo: & goto moveconflicts
	if !cfext!==.ogg echo Sorry, OGGs don't work. & echo: & goto moveconflicts
	:: Error catch
	if !cfext!==.swf set CFTYPE="swf"
	if !cftype!=="" echo Seems you've added an invalid file. & echo: & goto moveconflicts

	:: Set name
	echo What do you want this to be called?
	echo Press enter without typing to make it !cfname!.
	set /p CFNAME= Name:
	echo:

	:: SWF ask type
	if !cftype!=="swf" (
		echo Press 1 if !cfname! is an image file.
		echo Press 2 if !cfname! is a sound file.
		:swfaskretry
		set /p SWFCHOICE= Response:
		echo:
		if "!swfchoice!"=="0" goto end
		if "!swfchoice!"=="1" set CFTYPE="img"
		if "!swfchoice!"=="2" set CFTYPE="sound"
		if "!CFTYPE!"=="" echo You must answer what type of file it is. && goto swfaskretry
		echo:
	)

	:: Ask category
	if !cftype!=="img" (
		echo Press 1 to import !cfname! as a backdrop.
		echo Press 2 to import !cfname! as a prop.
		:imgaskretry
		set /p IMGCHOICE= Response:
		echo:
		if "!imgchoice!"=="0" goto end
		if "!imgchoice!"=="1" set CFSUBTYPE="bg"
		if "!imgchoice!"=="2" set CFSUBTYPE="prop"
		if "!CFSUBTYPE!"=="" echo You must answer what type of image it is. && goto imgaskretry
		echo:
	)
	if !cftype!=="sound" (
		echo Press 1 to import !cfname! as music.
		echo Press 2 to import !cfname! as a sound effect.
		echo Press 3 to import !cfname! as a voiceover.
		:soundaskretry
		set /p SOUNDCHOICE= Response:
		echo:
		if "!soundchoice!"=="0" goto end
		if "!soundchoice!"=="1" set CFSUBTYPE="bgmusic"
		if "!soundchoice!"=="2" set CFSUBTYPE="soundeffect"
		if "!soundchoice!"=="2" set CFSUBTYPE="voiceover"
		if "!CFSUBTYPE!"=="" echo You must answer what type of sound it is. && goto soundaskretry
		echo:
	)
	if !cfsubtype!=="voiceover" goto voice

	:: Additional attributes
	if !cfsubtype!=="prop" (
		echo Press 1 to make !cfname! a normal prop.
		echo Press 2 to make !cfname! holdable.
		echo Press 3 to make !cfname! headgear.
		:propaskretry
		set /p PROPCHOICE= Response:
		echo:
		if /i "!propchoice!"=="0" goto end
		if /i "!propchoice!"=="1" set CFATTACHATTR=holdable="0" wearable="0"
		if /i "!propchoice!"=="2" set CFATTACHATTR=holdable="1" wearable="0"
		if /i "!propchoice!"=="3" set CFATTACHATTR=holdable="0" wearable="1"
		if "!CFATTACHATTR!"=="" echo You must answer what type of prop it is. && goto propaskretry
		echo:
	)
	if !cftype!=="sound" (
		:: Uses MediaInfo to get sound duration in exact milliseconds
		echo Calculating sound duration...
		echo:
		for /f "delims=" %%b in ('mediainfo.exe "--Output=General;%%Duration%%" "%%a"') do set CFDUR=%%b
	)

	echo Moving file to theme...
	echo:
	copy /y %%a !themefolder!!cfid! >nul
	pushd !themefolder!
	if !cftype!=="img" (
		if not exist !cfsubtype! ( md !cfsubtype! )
		pushd !cfsubtype!
	)
	if !cftype!=="sound" (
		if not exist sound ( md sound )
		pushd sound
	)
	if exist "!cfid!" (
		echo This file already exists in the import theme^^!
		echo If you want to replace the old one, press Y.
		echo If you'd like to skip it and rename the new file, press N.
		echo Note that replacing may cause issues.
		:replaceaskretry
		set /p REPLACECHOICE= Response:
		echo:
		if not '!replacechoice!'=='' set replacechoice=%replacechoice:~0,1%
		if /i "!replacechoice!"=="0" goto end
		if /i "!replacechoice!"=="y" goto overwritefile
		if /i "!replacechoice!"=="n" popd & goto moveconflicts
		echo You must answer Yes or No. && goto replaceaskretry
	)
	:overwritefile
	move /y "..\!cfid!" "!cfid!" >nul
	popd

	:: Put XML string together
	set GLOBXMLATTRS=enable="Y" is_premium="N" money="0" sharing="0"
	if !cftype!=="img" (
		if !cfsubtype!=="bg" (
			set CFXML=^<background id="!cfid!" name="!cfname!" default="N" aid="9603" !globxmlattrs! /^>
		)
		if !cfsubtype!=="prop" (
			set CFXML=^<prop id="!cfid!" name="!cfname!" !cfattachattr! placeable="1" facing="left" thumb="" aid="9004" !globxmlattrs! /^>
		)
	)
	if !cftype!=="sound" (
		set CFXML=^<sound id="!cfid!" name="!cfname!" subtype=!cfsubtype! duration="!cfdur!" downloadtype="progressive" aid="24304" !globxmlattrs! /^>
	)
	echo Calculated XML string: !cfxml!

	:: Find number of lines in theme XML, then ignore the last one
	for /f %%b in ('findstr /n .* theme.xml ^| find /C ":"') do set XML_LINES=%%b
	set /a CFLINE= !xml_lines! - 1
	echo Putting string on line !cfline!.

	echo Adding file to XML...
	:: Loop through every line until one to add string into
	if exist "temp.xml" del "temp.xml"
	set /a count=1
	for /F "tokens=*" %%b in (theme.xml) do (
		SETLOCAL DISABLEDELAYEDEXPANSION
		echo:%%b>> "temp.xml"
		endlocal
		set /a count+=1
		if !count! GEQ !cfline! goto linereached
	)
	:linereached
	:: Print our string and a blank line for the next one
	echo !cfxml!>> temp.xml
	echo:>> temp.xml
	:: Print the last of theme.xml to our temp file
	more +!cfline! theme.xml>> temp.xml
	:: Make our temp file the normal file
	copy /y temp.xml theme.xml >nul
	del temp.xml
	:: NOTE: There's almost certainly a way to optimize this by reading off temp.xml if it exists, I'm just too lazy to do it and I just wanna get 1.2.0 out. I have another project I need to work on. Wrapper: Offline is fun, but it's getting in my way. I'm proud of myself for finishing this importer, but I am very fucking glad I'm done coding it. This has been me slightly ranting about my life in a random batch comment thank you all for coming like and subscribe watch benson on youtube
	popd
	echo !cfname! imported.
	echo:
	echo:
	
	:: Copy theme.xml to _THEMES folder
	copy /y !themefolder!theme.xml wrapper\_THEMES\import.xml

	:: Move file out of the way so we don't repeat it
	pushd import_these
	if not exist imported ( md imported )
	move /y "!cfid!" imported\"!cfid!" >nul
	popd
	goto startimport

	:: Move conflicting files out of the way
	:moveconflicts
	pushd import_these
	if not exist conflicts ( md conflicts )
	move /y "!cfid!" conflicts\"!cfid!" >nul
	popd
	goto startimport
)

:: Zip the XML because it demands that we do so
echo Zipping XML...
7za.exe a "!themefolder!\import.zip" "!themefolder!\theme.xml" >nul

:voice
	pushd import_these
	if !cftype!=="voice" (
		echo Press 1 to import !cfname! into Slot 1.
		echo Press 2 to import !cfname! into Slot 2.
		echo Press 3 to import !cfname! into Slot 3.
		:voiceslotaskretry
		set /p VOICESLOTCHOICE= Response:
		echo:
		if "!voiceslotchoice!"=="0" goto end
		if "!voiceslotchoice!"=="1" set VOICESLOT="1"
		if "!voiceslotchoice!"=="2" set VOICESLOT="2"
		if "!voiceslotchoice!"=="3" set VOICESLOT="3"
		if "!VOICESLOT!"=="" echo You must select a voice slot. && goto voiceslotaskretry
		echo:
	)
	if !VOICESLOT!=="1" (
	ren "!cfid!" "rewriteable.mp3"
	if not exist voice ( md voice )
	move /y "rewriteable.mp3" voice\"rewriteable.mp3" >nul
	echo To import the voice clip, type anything into the Import 1 text-to-speech voice.
	echo To change the voice clip, run this importer again.
	goto end
)
	if !VOICESLOT!=="2" (
	ren "!cfid!" "rewriteable2.mp3"
	if not exist voice ( md voice )
	move /y "rewriteable2.mp3" voice\"rewriteable2.mp3" >nul
	echo To import the voice clip, type anything into the Import 2 text-to-speech voice.
	echo To change the voice clip, run this importer again.
	goto end
)
	if !VOICESLOT!=="3" (
	ren "!cfid!" "rewriteable3.mp3"
	if not exist voice ( md voice )
	move /y "rewriteable3.mp3" voice\"rewriteable3.mp3" >nul
	echo To import the voice clip, type anything into the Import 3 text-to-speech voice.
	echo To change the voice clip, run this importer again.
	goto end
)

:end
endlocal
if "%SUBSCRIPT%"=="" (
	echo Closing...
	pause & exit
) else (
	exit /b
)
