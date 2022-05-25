:: Wrapper: Offline Config
:: This file is modified by settings.bat. It is not organized, but comments for each setting have been added.
:: You should be using settings.bat, and not touching this. Offline relies on this file remaining consistent, and it's easy to mess that up.

:: Opens this file in Notepad when run
setlocal
if "%SUBSCRIPT%"=="" ( pushd "%USERPROFILE%\Downloads\Vyond-Legacy-Offline\utilities" & start notepad.exe config.bat & exit )
:: If this thing does not open, then it means that you installed Vyond Legacy Offline Incorrectly.
endlocal

:: Shows exactly Offline is doing, and never clears the screen. Useful for development and troubleshooting. Default: y
:: verbose mode will stay on to help catch errors quickly.
set VERBOSEWRAPPER=y

:: Won't check for dependencies (flash, node, etc) and goes straight to launching. Useful for speedy launching post-install. Default: y
:: Skiping depends wil be on so this can start up without this blah blah long messages.
set SKIPCHECKDEPENDS=y

:: Won't install dependencies, regardless of check results. Overridden by SKIPCHECKDEPENDS. Mostly useless, why did I add this again? Default: n
set SKIPDEPENDINSTALL=n

:: Opens Offline in an included copy of ungoogled-chromium. Allows continued use of Flash as modern browsers disable it. Default: y
set INCLUDEDCHROMIUM=y

:: Opens INCLUDEDCHROMIUM in headless mode. Looks pretty nice. Overrides CUSTOMBROWSER and BROWSER_TYPE. Default: y
set APPCHROMIUM=y

:: Opens Offline in a browser of the user's choice. Needs to be a path to a browser executable in quotes. Default: n
set CUSTOMBROWSER=n

:: Lets the launcher know what browser framework is being used. Mostly used by the Flash installer. Accepts "chrome", "firefox", and "n". Default: chrome
set BROWSER_TYPE=chrome

:: Runs through all of the scripts code, while never launching or installing anything. Useful for development. Default: n
set DRYRUN=n

