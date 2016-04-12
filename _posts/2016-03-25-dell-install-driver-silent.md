---
layout: post
title: DELL | Install drivers silently
categories: [tech]
tags: [installation, driver, dell]
description: Cài đặt các driver trên các máy Dell một cách 'thầm lặng'
fullview: false
comments: false
---

Trình điều khiển của các máy Dell có thể được tải về tại [`dell.com/support`](https://dell.com/support). Thường cách cài đặt là nhấp chạy từng file EXE đã tải về, và qua từng bước trên hộp thoại hiện ra.

Các file driver của Dell cung cấp một tùy chọn dòng lệnh, giúp thực hiện việc cài đặt một cách 'thầm lặng', mà không tương tác với người dùng, trong thời gian đó người cài đặt có thể chuyển sang thực hiện công việc khác.

## Thực hiện

Giả sử file driver đang có và cần cài đặt là `ABC.EXE`, để xem các tùy chọn dòng lệnh khả dụng của file thực thi này, ta xem thử:

```
ABC.EXE /?
```

Giả sử thư mục chứa file cần cài đặt là:

```
C:\Users\win\Downloads\
```

### Khởi chạy `CMD`:

Các cách như:

1. Tại cửa sổ *Downloads* của *Explorer*, nhấn giữ *Shift* + nhấp chuột phải, và chọn "*Open command window here*".
2. Khởi chạy `CMD` từ menu **Start** với quyền Administrator, sau đó, di chuyển đến thư mục chứa file cài đặt:

```
C:\Windows\System32> cd /d c:\Users\win\Downloads\
```

### Chạy file cài đặt với tùy chọn `/s` (Không quan trọng HOA/thường):

```
ABC.EXE /s
```

Tada, xong rồi. Nếu đang mở cửa sổ Devices Manager bạn sẽ thấy driver được nhận.

### Cài đặt nhiều file cùng lúc

Giả sử các file driver được tải về toàn bộ, để tránh khỏi phải gõ nhiều lần, có thể dùng vòng lặp để chạy tất cả các file này, như sau:

```
for %x in (*.EXE) do %x /s
```

Lúc này, tất cả các file EXE sẽ được gọi chạy với tùy chọn `/s`. Hãy xem kết quả bên cửa sổ Devices Manager.

- Phần trong ngoặc `(*.EXE)` được gọi là *set*, bạn có thể đổi khác miễn sao đúng yêu cầu thực tế sử dụng khi dùng.

- **Lưu ý:** Sử dụng `%x` khi gõ trực tiếp tại `CMD`, nếu chạy batch (`.bat`), thêm một `%` vào trước thành `%%x`.

### Lưu ý:

Chỉ áp dụng dùng `/s` với các file cài đặt ứng dụng, và driver, được cung cấp từ trang [dell.com/support](https://dell.com/support). Các file khác như update firmware của một thiết bị, vv.. có thể không có, hoặc cách dùng tùy chọn khác.

## Tài nguyên khác

Cài đặt driver Dell theo trình tự khuyến cáo, theo dõi chi tiết tại: [How to reinstall drivers in the correct order](http://www.dell.com/support/article/us/en/19/SLN148687/EN).
