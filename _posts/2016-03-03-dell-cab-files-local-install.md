---
layout: post
title: Manual Installation of a Dell Driver Pack on a local machine
categories: [tech]
tags: [installation, driver, dell]
description: DELL | Cài đặt driver từ CAB cho các dòng Business, E
fullview: false
comments: false
---

Dell cung cấp các gói trình điều khiển cho các dòng Laptop như Latitude, Precisions,...

Dưới đây là hướng dẫn nhanh phương án cài đặt trình điều khiển sử dụng Dell Driver Pack thay vì tải và cài đặt riêng lẻ từng trình điều khiển tương ứng mỗi thiết bị của máy. Tiện lợi, nhanh chóng và đầy đủ hơn.

## Download the `cab`s

Go to the page at:

[http://en.community.dell.com/techcenter/enterprise-client/w/wiki/2065](http://en.community.dell.com/techcenter/enterprise-client/w/wiki/2065)

Then download the cab file that matches your Dell hardware system and the OS, e.g Latitude E6410 and Windows 7.

## Extract the cab

- Make new folder to store extracted drivers at the next step.

```batch
mkdir drivers
```

- Run CMD, navigate to the folder which was created ealier.

```batch
cd drivers
```

- Run the command (required Administrator permissions):

```batch
expand -F:* <source-cab> <where-to-extract-to>
```

## Install drivers automatically using `pnputil`

- Detect which platform your system is: x86 (32bit), or x64 (64bit). `$arch=?`
- Navigate to the folder:

```batch
cd drivers\extracted\folder\$arch
```

- Using `for loop` through all `*.inf` file and call `pnputil` to install:

```batch
for /f %i in ('dir /b /s *.inf') do pnputil.exe -i -a %i
```

## Done.

Source: [Manual Installation of a Dell Driver Pack on a local machine](http://www.1337admin.org/tutorials/manual-installation-of-a-dell-driver-pack-on-a-local-machine/)

