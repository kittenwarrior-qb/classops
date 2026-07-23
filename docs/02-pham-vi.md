# 02 — Phạm vi và các giai đoạn

> Chỉ điền file này SAU KHI hoàn thành 01-kham-pha.md.
> Nếu đang đọc mà chưa quan sát buổi học nào, quay lại.

---

## Tuyên bố vấn đề

Điền sau khi khám phá. Một câu, không hơn.

```
Vấn đề: ___________________________________________
Của ai: ___________________________________________
Tốn của họ: _______________________________________ mỗi tháng
Hiện đang xoay xở bằng: ___________________________
Chưa đủ vì: _______________________________________
```

Chưa điền được → chưa đủ hiểu để xây.

---

## Hai kịch bản sản phẩm

Tuỳ kết quả khám phá, sản phẩm sẽ khác nhau. Chọn một sau khi có dữ liệu.

### Kịch bản A — Điểm danh là trung tâm
Chọn khi: có bằng chứng thầy giáo cần ghi lại ai đi ai vắng, và việc đó
hiện đang gây khó.

Luồng chính: điểm danh → lịch sử chuyên cần → cảnh báo bé đi thưa

### Kịch bản B — Gia hạn là trung tâm
Chọn khi: gói tính theo thời gian, điểm danh không ảnh hưởng tiền, nhưng
việc quên nhắc gia hạn đang gây mất doanh thu.

Luồng chính: danh sách hạn thẻ → cảnh báo sắp hết → soạn tin nhắn nhắc

**Theo bằng chứng hiện có (gói 3 tháng, có ô "Hạn thẻ"), kịch bản B có vẻ
khả năng cao hơn.** Nhưng chưa xác nhận.

Kịch bản B nhẹ hơn A rất nhiều: không cần offline, không cần dùng mỗi buổi,
không cần thầy giáo đổi thói quen. Nếu B đúng thì đó là tin tốt.

---

## Nguyên tắc phạm vi

1. **Một luồng, làm cho tốt.** Không phải năm luồng làm dở.
2. **Không xây tính năng cho khách hàng chưa tồn tại.** Thấy chỗ có thể
   khác nhau giữa các studio thì làm sao cho *sửa sau này rẻ*, đừng xây
   sẵn giao diện cấu hình.
3. **Mỗi tính năng phải chỉ ra được nó tiết kiệm gì.** Không chỉ ra được
   thì không làm.
4. **Nghi ngờ thì cắt.** Thêm lại luôn dễ hơn gỡ ra.

---

## Danh sách KHÔNG làm

Cập nhật liên tục. Khi nào cũng dài hơn danh sách "làm".

- Thanh toán online / đối soát ngân hàng
- Tính lương giáo viên
- CRM tuyển sinh, quản lý lead
- Chat trong app
- App riêng cho phụ huynh
- Xếp lịch tự động
- Dashboard biểu đồ
- Báo cáo tài chính
- Đa ngôn ngữ
- Native app (iOS/Android)

Lý do cụ thể cho vài mục:

**Thanh toán:** dính đến tiền là dính đến trách nhiệm pháp lý. Không đáng
cho dự án đầu tay không thu phí.

**Tính lương:** mỗi studio một công thức. Làm xong thành hố cấu hình.

**App phụ huynh:** phụ huynh đã ở trong Zalo. Bắt họ cài app là mất họ.

---

## Các giai đoạn

Mỗi giai đoạn có **điều kiện qua cửa**. Không đạt thì quay lại, không đi tiếp.

### GĐ 0 — Khám phá
**Việc:** quan sát, trò chuyện, xem file thật
**Không viết code**
**Cửa:** trả lời được các giả định ở 00-gia-dinh.md

### GĐ 1 — Prototype không backend
**Việc:** vài màn hình bấm được, dữ liệu để trong file JSON với tên thật
của lớp mình
**Cửa:** đưa cho giáo viên xem, họ chỉ ra được chỗ SAI với thực tế.
Nếu họ chỉ khen đẹp → chưa chạm đúng vấn đề, quay lại GĐ 0.

### GĐ 2 — Bản chạy được
**Việc:** backend, lưu trữ thật, đăng nhập, import danh sách
**Cửa:** dữ liệu không mất sau khi xoá cache trình duyệt

### GĐ 3 — Chạy thử một lớp
**Việc:** một giáo viên dùng thật, song song cách cũ
**Cửa:** **họ tự mở app 5 lần liên tiếp mà không ai nhắc**

Đây là cửa quan trọng nhất trong cả dự án. Mọi thứ trước đó chỉ là chuẩn bị.

### GĐ 4 — Studio thứ hai
**Việc:** onboard một studio khác, tốt nhất là khác bộ môn
**Cửa:** onboard xong mà không phải sửa code quá 3 ngày

Đây là lúc kiểm chứng giả thuyết "phục vụ được nhiều loại lớp".

### GĐ 5 — Điểm quyết định
**Việc:** chọn một trong ba: đẩy thành sản phẩm có thu phí / đóng băng làm
portfolio hoàn chỉnh / dừng hẳn

Đặt ngày cụ thể cho mốc này ngay từ bây giờ: ___/___/______

Cả ba lựa chọn đều là kết quả tốt. Cái tệ duy nhất là lê lết duy trì một
thứ miễn phí trong hai năm vì ngại nói lời kết thúc.

---

## Bảng theo dõi giai đoạn

| GĐ | Trạng thái | Bắt đầu | Qua cửa | Ghi chú |
|---|---|---|---|---|
| 0 Khám phá | | | | |
| 1 Prototype | | | | |
| 2 Chạy được | | | | |
| 3 Thử một lớp | | | | |
| 4 Studio thứ 2 | | | | |
| 5 Quyết định | | | | |
