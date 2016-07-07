---
layout: post
title: .NET Framework 3.5 installation error on Windows 8
categories: [windows]
tags: [8, 8.1, netframework, update, kb, NetFx3]
description: Resolving the .NET Framework 3.5 on Windows 8 installation error
fullview: false
comments: false
---

[Source][source] 

## Introduction

This problem occurs when you try to install the Microsoft .NET Framework 3.5 on a computer that is running Windows 10, Windows 8.1, Windows Server 2012 R2, Windows 8 or Windows Server 2012.

Note Installation of the Microsoft .Net framework may throw errors that are not listed in this article, but you might be able to try the following steps to fix those errors as well.

## Resolutions for Windows 8.1, Windows Server 2012 R2, Windows 8 or Windows Server 2012

I list one method only, that use a Windows installation media such as an iso for .NET Framework 3.5 offline installation. Or, add NetFx3 feature to the current Windows system.

### Method 3: Use Windows installation media

You can use the Windows installation media as the file source when you enable the .NET Framework 3.5 feature. To do this, follow these steps:

1. Insert the Windows installation media.
2. At an elevated command prompt, run the following command:

    ```
    Dism /online /enable-feature /featurename:NetFx3 /All /Source:<drive>:\sources\sxs /LimitAccess
    ```

    Note In this command, `<drive>` is a placeholder for the drive letter for the DVD drive or for the Windows 8 installation media. For example, you run the following command:

    ```
    Dism /online /enable-feature /featurename:NetFx3 /All /Source:G:\sources\sxs /LimitAccess

    ```
3. Wait for the installation completes.

## Conclusion

You now can check the **Features and functions** dialog to make sure the .NET Framework 3.5 installation had successed.

[source]: https://support.microsoft.com/en-us/kb/2734782
