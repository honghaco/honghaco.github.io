---
layout: post
title: Photoshop CS2 - Disable the registration screen on startup
categories: [til]
tags: [photoshop, software, installation, windows]
description: This post gives the procedure to disable the registration screen on new Photoshop CS2 installation startup
fullview: false
comments: false
---

## Disable the registration screen on Photoshop CS2 startup

### Method 1: Delete the `dll` file manually

- Go to Photoshop installation directory. One of following ways:
    - Right-click on the Photoshop CS2 shortcut, choose **Open file location**
      Windows Explorer will open correspondingly the folder on system (x86/x64).
        - `C:\Program Files\Adoble\Photoshop CS2` on 32bit system.
        - `C:\Program Files (x86)\Adoble\Photoshop CS2` on 64bit system.
    - In Windows Explorer, navigate to one of two above folder,
      correspondingly to your current system.
- Delete the file:
```
regsresen_US.dll
```
Tada, you've got it.

### Method 2: Disable registration by Administration privileges

- Run the program with Administrator,
- Click **Do Not Register**.
- Close it, rerun as a normal user.

Tada, the registration screen has gone, again.

---
[Source][source]: Thanks to the video itself and those comments there.

[source]: https://www.youtube.com/watch?v=lC2jxXh2Kn4

