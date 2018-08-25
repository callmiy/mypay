@echo off
start %CMDER_ROOT%\vendor\conemu-maximus5\ConEmu64.exe -FS -Reuse -run "cd %CD% && %~1"
