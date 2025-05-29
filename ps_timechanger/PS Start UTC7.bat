@ECHO off

:: 1. Change LAUNCHER_PATH if needed (path should lead to shortcut, not an .exe! to keep your game settings.)
:: 2. Change TIME_LOCAL, you can find the name of your time zone by command "tzutil /g"
:: 3. Change REVERT_DELAY if needed (the time you need to run the game from launcher)

SET LAUNCHER_PATH=C:\Users\Public\Desktop\SagaOnline.lnk
SET TIME_MSK="Russian Standard Time"
SET TIME_LOCAL="SE Asia Standard Time"
SET REVERT_DELAY=60

::check if the launcher is already running, produces ERRORLEVEL
tasklist /fi "ImageName eq Launcher.bin" /fo csv 2>NUL | find /I "Launcher.bin">NUL

::assign currient time to the variable
FOR /F "tokens=* USEBACKQ" %%F IN (`tzutil /g`) DO (
	SET cur_time=%%F
)

::run the launcher if it's not running
IF %ERRORLEVEL%==1 (
	tzutil /s %TIME_MSK%
	start %LAUNCHER_PATH%
	ECHO Time changed to MSK. Running the launcher...
	
	::revert time after the delay (sec.)
	ECHO --------------------------------------------
	ECHO Time will be reverted after:
	timeout /t %REVERT_DELAY%
	tzutil /s %TIME_LOCAL%
	ECHO Local time is reverted.
	
) ELSE (
	ECHO Launcher is already running!
)