---
layout: post
title: Re-enable ISO Mounting in Windows 8
categories: [windows]
tags: [8, 8.1, iso, mounting, tips]
description: How to re-enable ISO Mounting in Windows 8 File Explorer
fullview: false
comments: false
---

[Source][source] 

## Introduction

One of the great features in Windows 8 is built-in support to mount ISO image files in File Explorer. You still have the option of installing a 3rd party app to handle ISO mounting if you wish (such as Virtual CloneDrive) but Windows can handle it just fine. Mounting an ISO image is easy, just right-click and choose Mount. Windows will mount the image and list it as a drive letter in File Explorer.

If the .ISO file association is changed from Windows File Explorer to another application, the built-in Windows 8 ISO mounting option is disabled. Here is how to re-enable the feature.

## Steps

1. **Right-click** the .ISO file, choose **Properties**.
2. In **Opens with:** item, Click the **Change** button.
3. Choose **Windows Explorer** from the application list.
4. The **Opens with** option will change back to **Windows Explorer**.
5. Click **Apply**, then **OK** to close the **Properties** dialog.

## Result

You now can mount iso files easily right in the Windows Explorer again, just by right-click the iso then select the **Mount** option.

## Conclusion

Windows 8 ISO mounting is now back to its default operation. Remember that if you re-install another disc image burning application, or configure Windows to open the .ISO file format with a 3rd party application, you will need to perform this procedure again.

[source]: https://community.spiceworks.com/how_to/12394-how-to-re-enable-iso-mounting-in-windows-8-file-explorer
