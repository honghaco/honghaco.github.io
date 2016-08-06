---
layout: post
title: Powering on virtual machines from cli on VMWARE
categories: [vmware]
tags: [vmware, virtualization, cli]
description: Provides steps to power on virtual machines from the command line (either through the ESX host console or through the RCLI/vSphere CLI) if the host cannot be managed from vCenter Server or from the vSphere Client.
fullview: false
comments: false
---

## Powering on a virtual machine from the command line when the host cannot be managed using vSphere Client (1038043)

I'm living on a Linux System. And, you known, there's no VSphere Client for Linux (not even Web Client).
This lead me to control ESXi the Linux way. Let's launch a `ssh` session that connect to ESXi. 

### Purpose

This article provides steps to power on virtual machines from the command line (either through the ESX host console or through the RCLI/vSphere CLI) if the host cannot be managed from vCenter Server or from the vSphere Client.

### Resolution

- **Note:** The steps in this article require root access to the host, either at the physical console or using SSH. For more information on enabling root access, see:


### ESXi 4.x, 5.x and 6.0

To power on a virtual machine from the command line:

- List the inventory ID of the virtual machine with the command:
```
    vim-cmd vmsvc/getallvms | grep <vm name>
```
**Note:** The first column of the output shows the vmid.

- Check the power state of the virtual machine with the command:

```
vim-cmd vmsvc/power.getstate <vmid>
```

- Power-on the virtual machine with the command:

```
vim-cmd vmsvc/power.on <vmid>
```

[Source](https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1038043)

