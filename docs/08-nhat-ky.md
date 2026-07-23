# 08 — Nhật ký và ghi quyết định

---

## Vì sao cần

Ba tháng nữa bạn sẽ không nhớ vì sao chọn Dexie thay vì localStorage, hay
vì sao bỏ tính năng bảo lưu. Nhật ký trả lời giùm.

Và khi viết README hoặc đi phỏng vấn, đây là thứ **không dựng lại được từ
trí nhớ**. Người phỏng vấn hỏi "sao em làm vậy?" — câu trả lời tốt nằm ở đây.

---

## Nhật ký — 3-4 dòng mỗi ngày làm việc

Không phải báo cáo. Chỉ cần đủ để tương lai hiểu.

```
## 2026-07-23

**Làm:** dựng project, cấu hình font Be Vietnam Pro, deploy Vercel
**Kẹt:** dấu tiếng Việt bị cắt trong avatar tròn, phải tăng line-height
**Quyết định:** bỏ ngày sinh khỏi form — chưa chứng minh được là cần
**Nghi ngờ:** không chắc thầy có bấm điện thoại trước giờ dạy thật không
```

## 2026-07-23

**Làm:** Đọc toàn bộ tài liệu dự án; kiểm tra repo, `.gitignore` và đủ 12 tài liệu chính.
**Kẹt:** Chưa có dữ liệu quan sát thực tế để xác nhận vấn đề hoặc chọn kịch bản A/B.
**Quyết định:** Giữ dự án ở GĐ 0 — chưa viết code sản phẩm; chỉ commit khung repo và tài liệu.
**Nghi ngờ:** Chưa biết quản lý thủ công gây thiệt hại bao nhiêu, ai quyết định, và thầy có cần điểm danh hay không.

Mục **Nghi ngờ** quan trọng nhất. Đó là danh sách những thứ cần đi kiểm chứng.

---

## Ghi quyết định (ADR)

Mỗi quyết định kỹ thuật hoặc sản phẩm đáng kể → một file trong `docs/adr/`.

Đặt tên: `0001-chon-nextjs-thay-vi-spring.md`

### Mẫu

```markdown
# ADR-0001: Chọn Next.js thay vì Spring Boot

**Ngày:** 2026-07-23
**Trạng thái:** Đã chấp nhận
(Đã chấp nhận | Đã thay thế bởi ADR-XXXX | Đã huỷ)

## Bối cảnh
Cần chọn stack cho sản phẩm đầu tay. Một người làm, ngân sách 0,
mục tiêu là có người dùng thật và xây hồ sơ cá nhân.

## Các lựa chọn đã cân nhắc
1. Next.js fullstack
2. Spring Boot + React riêng
3. Frappe/ERPNext

## Quyết định
Chọn Next.js.

## Lý do
- Phần khó nhất (đồng bộ offline) nằm ở client, viết TypeScript bất kể
  backend là gì
- Spring nghĩa là vẫn phải viết phần khó đó, cộng codebase thứ hai
- Frappe sinh ra giao diện desktop, ngược với nhu cầu mobile

## Đánh đổi chấp nhận
Nếu sau này nhắm việc backend Java thì phải làm project khác để chứng minh.

## Điều kiện xem lại
Nếu trong 6 tháng tới nhắm thực tập Java backend và JD nào cũng đòi Spring.
```

### Khi nào viết ADR

Viết khi: chọn giữa nhiều phương án, quyết định ảnh hưởng nhiều tháng, hoặc
làm ngược lại lời khuyên phổ biến.

Không viết khi: chọn tên biến, chọn thư viện nhỏ dễ thay.

Khoảng 5-10 ADR cho cả dự án là hợp lý. Nhiều hơn là đang viết nhật ký, ít
hơn là đang không suy nghĩ.

---

## ADR nên có sẵn cho dự án này

Danh sách gợi ý, viết khi đến lúc:

- `0001` Chọn Next.js thay vì Spring Boot
- `0002` Không dựng trên Odoo/ERPNext
- `0003` Offline-first với Dexie làm nguồn sự thật
- `0004` Chỉ lưu danh sách vắng, không lưu danh sách có mặt
- `0005` Không tích hợp Zalo ZNS, dùng navigator.share
- `0006` Hoãn mô hình gói học đến khi có dữ liệu thật
- `0007` Vàng ấm cho trạng thái vắng thay vì đỏ
- `0008` Giới hạn settings ở tham số, không chứa logic

Mỗi cái đều là một câu chuyện kể được trong buổi phỏng vấn.

---

## Danh sách nghi ngờ

File riêng, cập nhật liên tục. Mỗi dòng là một thứ đang đoán và cần kiểm chứng.

```
| # | Nghi ngờ | Cách kiểm chứng | Trạng thái | Ngày |
|---|---|---|---|---|
| 1 | Thầy có thật sự cần điểm danh không | Quan sát 2 buổi | Đang mở | |
| 2 | Gói tính theo thời gian hay theo buổi | Hỏi + xem Sheet | Đang mở | |
| 3 | Thầy có bấm điện thoại trước giờ dạy | Quan sát | Đang mở | |
| 4 | Ai quyết định dùng công cụ mới | Hỏi | Đang mở | |
```

Khi một dòng chuyển sang "Đã trả lời", ghi câu trả lời và nguồn. Nếu câu
trả lời làm đổi hướng sản phẩm → viết ADR.

---

## Tổng kết mỗi giai đoạn

Cuối mỗi giai đoạn, viết nửa trang:

1. Dự đoán gì trước khi bắt đầu?
2. Thực tế thế nào?
3. Sai ở đâu?
4. Sẽ làm khác gì lần sau?

Câu 3 là câu duy nhất có giá trị. Ba câu kia chỉ để dẫn tới nó.
