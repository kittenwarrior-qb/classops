# Ghi quyết định kiến trúc (ADR)

Mỗi quyết định kỹ thuật hoặc sản phẩm đáng kể → một file ở đây.

## Đặt tên

`NNNN-mo-ta-ngan.md` — ví dụ `0001-chon-nextjs-thay-vi-spring.md`

Số tăng dần, không tái sử dụng. Quyết định bị thay thế thì đổi trạng thái
thành "Đã thay thế bởi ADR-XXXX", không xoá file.

## Khi nào viết

**Viết khi:** chọn giữa nhiều phương án · quyết định ảnh hưởng nhiều tháng ·
làm ngược lại lời khuyên phổ biến

**Không viết khi:** chọn tên biến · chọn thư viện nhỏ dễ thay

Khoảng 5–10 ADR cho cả dự án là hợp lý. Nhiều hơn là đang viết nhật ký,
ít hơn là đang không suy nghĩ.

## Danh sách nên có

- [ ] 0001 Chọn Next.js thay vì Spring Boot
- [ ] 0002 Không dựng trên Odoo / ERPNext / Frappe
- [ ] 0003 Offline-first với Dexie làm nguồn sự thật (nếu kịch bản A)
- [ ] 0004 Chỉ lưu danh sách vắng, không lưu danh sách có mặt
- [ ] 0005 Không tích hợp Zalo ZNS, dùng navigator.share
- [ ] 0006 Hoãn mô hình gói học đến khi có dữ liệu thật
- [ ] 0007 Vàng ấm cho trạng thái vắng thay vì đỏ
- [ ] 0008 Giới hạn settings ở tham số, không chứa logic

Mỗi cái đều là một câu chuyện kể được trong buổi phỏng vấn.
