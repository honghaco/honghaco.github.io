---
layout: post
title: BSOD | WppRecorder.sys
categories: [tech]
tags: [windows, bsod, bootcamp]
description: BSOD SYSTEM THREAD EXCEPTION NOT HANDLED which is caused by WppRecorder.sys
fullview: false
comments: false
---

# BSOD: SYSTEM THREAD EXCEPTION NOT HANDLED (WppRecorder.sys)

Source: [BSOD system_thread_excption_not_handled (WppRecorder.sys)][1].

## Tình huống

Một máy Macbook Air (Mid 2015), cài đặt Windows 8.1 song song cùng Mac sử dụng Bootcamp. Tuy nhiên, chỉ một thời gian ngắn, chừng một tuần sau khi cài đặt, Windows khởi động lên bị BSOD với Error Code:

```
SYSTEM_THREAD_EXCEPTION_NOT_HANDLED (WppRecorder.sys)
```

Tình trạng này không được xử lý dứt điểm sau khi cài đặt lại Windows theo cách dùng Bootcamp.

---

I have installed windows 2012 R2, all have been working fine and installed a Hyper-v server which am have install AD,DNS, DHCP which has been working grate.

After install an update on virtual server I rebooted and now am receiving a **BSOD:** `system_thread_excption_not_handled (WppRecorder.sys)` and it not allowing me to access anything.

I have look into the firmware setting on the virtual server  and noticed file type called `bootmgfw.efi` on the firmware virtual setting. Which details:

- Description: Windows Boot Manager
- Value:

```
\HD(2,GPTBA6F9016-9039-4EED-95D7-7C9DFDA947F4,77056,66560)\EFI\Microsoft\Boot\bootmgfw.efi
```

- Firmware device path:

```
\HD(2,GPTBA6F9016-9039-4EED-95D7-7C9DFDA947F4,77056,66560)\EFI\Microsoft\Boot\bootmgfw.efi
```

I am using a physical hard disk which I have created using virtual disks which is offline and I have other Hyper-v Virtual server which are using the same settings and it working fine.

Can anyone help me with this issue?
Many thanks,
PJ
PJ Moka

- - -

## Xử lý

### Chuẩn đoán nguyên nhân - Diagnostic & Explaination

Xin trích nguyên văn như sau đây. Nội dung không hoàn toàn là ngữ cảnh đúng cho trường hợp máy hiện tại đang gặp, nhưng là tình huống và nguyên nhân tương tự.

---

This looks like a known bug related to 4KB-sector ('Advanced Format') disk drives and NTFS compression.

The updated servicing stack in Windows Server 2012 R2/Windows 8.1 compresses some rarely used files in `c:\windows\WinSxS` as a part of CBS (Component Based Servicing) Scavenging process. (Presumably, this change was introduced in 8.1 due to complaints related to low available disk space on low-end Windows tablet devices, where disk space is tight).

After you install or remove an update, the CBS Scavenging scheduled task will re-check the `WinSXS` folder and compress some of the files.

The problem is that it also compresses some driver files (such as `cdrom.sys`), and those driver files may be hard-linked to the live copy in `system32\drivers` folder. As a result, when the CBS Scavenger compresses these files, the actual cdrom.sys file in `system32\drivers` becomes compressed.

The compression itself is not the issue, however - Windows will load compressed drivers just fine.

It turns that the cdrom.sys driver has a bug - it accesses memory past the declared `.data` section in the driver image.

The NTFS driver performs the decompression "in place", so the memory that is past the `.data` section may contain "random" data.

It turns out that if the sector size is 512 bytes, the bug in `cdrom.sys` does not lead to a crash, because those "random" bytes are in fact zero.

However, when using a NTFS volume that is located on a 4KB Advanced Format drive, the bytes past the `.data` section of `cdrom.sys` contain (by chance) some bytes from the `.pdata` section of `cdrom.sys`.

And this is precisely what causes the crash right during the DriverEntry of `cdrom.sys`.

---

### Phương án 1

Dưới đây là cách thực hiện để xử lý lỗi trên. Không nhất thiết theo cách từng bước một, nhưng phải đủ yêu cầu ở các bước:

- **Xả nén** các file `*.sys` (drivers)
- **Tắt chức năng/hành vi nén** của `fs` (File System - NTFS)

**Các bước tiến hành:**

- Khởi động vào chế độ khôi phục (Thường sau khi bị BSOD, máy khởi động lại tự động vào chế độ này).

    Boot to the recovery console (you should automatically get there after a few Blue Screen crashes).

- Khởi chạy cửa sổ dòng lệnh. Nếu mượn môi trường cài đặt Windows, gọi `CMD` bằng tổ hợp `Shift + F10`. Trong WinPE khỏi tính.

    Launch command prompt.

- Chạy dòng lệnh sau đây. Gọi `compact`, thêm `/h` để biết thêm chi tiết.

    Run the following command:

```
c:\windows\system32\compact.exe /U c:\windows\system32\drivers\*.sys
```
- Khởi động lại máy. Lúc này máy có thể vào môi trường desktop bình thường.

    Reboot

- Ngay sau khi khởi động thành công, thực hiện tắt chức năng nén của NTFS toàn hệ thống tránh gặp lại vấn đề tương tự. Câu lệnh như dưới.

    As soon as you successfully boot, disable NTFS compression system-wide so that the CBS Scavenger does not reintroduce the issue again:

```
fsutil behavior set DisableCompression 1
```

- Khởi động lại lượt nữa, để áp dụng thay đổi.

    Reboot again (so the `DisableCompression` setting takes effect)

---

**Lưu ý thêm:**

Files that are compressed will stay compressed (and readable).

However, CBS Scavenger will be unable to compress the files and cause the issue.

P.S.

The `cdrom.sys` is not the only driver that has this issue - I've also seen nearly identical crashes in `intelppm.sys` (but they are not 100% reproducible).

## Phương án 2

Microsoft đã phát hành một bản vá cho lỗi này, theo dõi thêm tại [KB3027108][3].

Thực hiện tải và cài đặt bản vá [KB3027108][3]. Tuy nhiên [KB3027108][3] yêu cầu máy đã có cập nhật số [KB2919355][4] được cài đặt, và [KB2919355][4] lại yêu cầu bản cập nhật [KB2919442][5] đã được cài đặt. Vậy nên các bước tiến hành:

1. Cài đặt cập nhật [KB2919442][5].
2. Cài đặt cập nhật [KB2919355][4].
3. Cài đặt bản vá [KB3027108][3].

Dung lượng tải về tất cả chừng 1GiB.

- - -

## Trường hợp tương tự

Dưới đây là nội dung một người dùng cùng gặp lỗi tương tự, tuy nhiên cách xử lý ở mục này người viết chưa từng thực hiện và xác nhận kết quả.

Source: [Windows 8.1 BSoD wpprecorder.sys][2].

---

### Tình huống

Hello,

Recently I've been receiving this error. It always appears when windows is first starting. Usually it will happen once, then once the PC restarts it will boot fine. Just today however, the error repeated itself 4 times, and I was forced to run a system restore (which made me able to boot the pc properly). However, if the issue is becoming worse I would like to get it resolved.

I've run the System File Checker, and will attach the CBS. Corrupted files were found but unable to be repaired.

## Cách xử lý

The file causing the error with the System File Check is that stupid Canon printer file that seems to effect about 85% of users. It is not part of your problem, unless perhaps you actually have a Canon printer.

You can fix that by running the command below in an `CMD` with Administrator:

```sh
DISM /online /cleanup-image /restorehealth
```

[1]: https://social.technet.microsoft.com/Forums/windowsserver/en-US/e98498f1-a6fe-4235-999d-c2f8f507fea7/bsod-systemthreadexcptionnothandled-wpprecordersys?forum=winserverhyperv
[2]: https://windowsforum.com/threads/windows-8-1-bsod-wpprecorder-sys.191251/
[3]: https://support.microsoft.com/en-us/kb/3027108
[4]: https://support.microsoft.com/en-us/kb/2919355
[5]: https://support.microsoft.com/en-us/kb/2919442
