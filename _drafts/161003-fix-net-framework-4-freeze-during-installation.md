There is another way with the same procedure, you can fix this manually.

1. Turn off Windows Updates:
a. Using the `services.msc`:
- Open Rung dialog: Windows + R
- Type: services.msc -> New windows will be open up
- Scroll down then select the Windows Update services
- Stop it! (Right-click then select top or sth like that)
b. Using the `cmd`:
* Start CMD:
- Windows 7:
+ Press Start
+ Search for CMD
+ Right-click, choose `Run as Administrator`
- Windows 8:
+ Press Windows + X to toggle the Quick Menu
+ Select the `Command Prompt (Admin)` options
* Stop Windows Update services
- You should be in C:\Windows\System32 now.
- Type the command to stop Windows Update:
+ net stop "Windows Update"
+ The computer should notice you that the service has been stopped successfully
2. Move/Rename/Delete the `C:\Windows\SoftwareDistrubution` folder
* From Windows Explorer
- Open Windows Explorer: Computer or Library for examples
- Navigate to C:\Windows
- Rename/Move the folder whose name above to whatever you want, append the trailing `-old` for example
* From CMD
- You should be putted in `C:\Windows\System32` now, type one of the following commands
- 1st Command: `move ..\SoftwareDistribution ..\SoftwareDistribution-old`
- 2nd Command: `move c:\Windows\SoftwareDistribution c:\Windows\SoftwareDistribution-old`
3. Restart the .NET FW installation proccess.

Resource: [FIX: .Net Framework 4 freeze during installation](https://windowspro.eu/fix-net-framework-4-freeze-installation)
