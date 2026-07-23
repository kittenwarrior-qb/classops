# 10 — Danh sách tính năng

> **Trạng thái: chưa có tính năng nào được xác nhận là cần thiết.**
> Danh sách này là ứng viên, không phải kế hoạch. Cập nhật sau GĐ 0.

Chia theo mức độ chắc chắn, không chia theo màn hình.

---

## Nhóm A — Lõi: đúng ở cả hai kịch bản

Xây được ngay mà không sợ phí, vì bất kể sản phẩm xoay quanh điểm danh hay
gia hạn thì vẫn cần.

| # | Tính năng | Ghi chú |
|---|---|---|
| A1 | Đăng nhập Google | Auth.js, một nút |
| A2 | Nhiều studio, nhiều chi nhánh | `studio_id` mọi bảng từ đầu |
| A3 | Phân quyền chủ / giáo viên | Giáo viên chỉ thấy lớp mình dạy |
| A4 | Quản lý lớp | Tạo, sửa, lưu trữ |
| A5 | Quản lý học viên | Tạo, sửa, lưu trữ (không xoá cứng) |
| A6 | Ghi danh học viên vào lớp | Bảng riêng, giữ lịch sử chuyển lớp |
| A7 | Import danh sách từ CSV / Google Sheet | Dán link hoặc upload, tự đoán cột, xem trước |
| A8 | Xem danh sách lớp | Lớp hôm nay lên đầu |
| A9 | Xem chi tiết học viên | Thông tin + lịch sử |
| A10 | Sinh tin nhắn + chia sẻ | `navigator.share()`, fallback clipboard. **Không tích hợp Zalo** |
| A11 | Template tin nhắn theo studio | File config, có placeholder |
| A12 | Cài đặt studio | Cách gọi học viên, ngưỡng cảnh báo, template |
| A13 | Xuất toàn bộ dữ liệu ra Excel | Bắt buộc — cam kết với studio |
| A14 | Xoá toàn bộ dữ liệu studio | Bắt buộc — cam kết với studio |
| A15 | Audit log | Rẻ để thêm ngay, đắt để thêm sau |
| A16 | Hạ tầng i18n + chuẩn tiếng Việt | Gom chuỗi một file, sắp tên theo tên, tìm không dấu. Xem `11-ngon-ngu.md` |

**16 tính năng. Đây là toàn bộ phần chắc chắn.**

---

## Nhóm B — Chỉ nếu KỊCH BẢN A (điểm danh là trung tâm) đúng

| # | Tính năng | Ghi chú |
|---|---|---|
| B1 | Màn hình điểm danh | Mặc định có mặt, chạm vào người vắng |
| B2 | Lưu chỉ danh sách vắng | Hệ quả của B1 |
| B3 | Chạy hoàn toàn offline | Dexie làm nguồn sự thật |
| B4 | Hàng đợi đồng bộ (outbox) | Idempotency, retry backoff |
| B5 | Lịch sử chuyên cần của một học viên | |
| B6 | Cảnh báo học viên vắng nhiều | Ngưỡng để trong settings |
| B7 | Ghi lý do vắng (có báo / không báo) | |

B3 và B4 là phần khó nhất về kỹ thuật trong cả dự án — và cũng là phần
đáng khoe nhất trong hồ sơ cá nhân.

---

## Nhóm C — Chỉ nếu KỊCH BẢN B (gia hạn là trung tâm) đúng

| # | Tính năng | Ghi chú |
|---|---|---|
| C1 | Theo dõi hạn thẻ / hạn gói | Ngày bắt đầu, ngày hết hạn |
| C2 | Danh sách sắp hết hạn | Sắp theo ngày, lọc theo chi nhánh |
| C3 | Cảnh báo trước N ngày | N để trong settings |
| C4 | Sinh tin nhắn nhắc gia hạn | Dùng lại A10 |
| C5 | Ghi nhận đã gia hạn | Kéo dài hạn, ghi lịch sử |
| C6 | Danh sách đã hết hạn chưa gia hạn | Danh sách cần gọi lại |

**Nhóm C nhẹ hơn nhóm B rất nhiều:** không cần offline, không cần dùng mỗi
buổi, không cần thầy giáo đổi thói quen. Nếu kịch bản B đúng thì đó là tin
tốt về mặt công sức — nhưng kém hấp dẫn hơn về mặt kỹ thuật cho hồ sơ.

Bằng chứng hiện có (gói "3tr/3 tháng", ô "Hạn thẻ" trong Google Form) đang
nghiêng về kịch bản này.

---

## Nhóm D — Hoãn đến GĐ 3, không thiết kế bây giờ

Cần câu trả lời thật trước khi thiết kế. Đoán bây giờ = viết lại sau.

| # | Tính năng | Chưa biết gì |
|---|---|---|
| D1 | Gói học / thẻ buổi | Tính theo buổi hay theo thời gian? Nhiều gói cùng lúc? |
| D2 | Bảo lưu | Theo ngày hay theo buổi? Ai duyệt? Tối đa bao lâu? |
| D3 | Học bù | Bù lớp khác được không? Chi nhánh khác? Có hạn bù? |
| D4 | Chuyển lớp / chuyển chi nhánh | Gói có đi theo không? |
| D5 | Học thử miễn phí | Có tồn tại không? |

---

## Nhóm E — Không làm, kể cả khi được yêu cầu

| Tính năng | Lý do |
|---|---|
| Thanh toán online / đối soát ngân hàng | Dính tiền là dính trách nhiệm pháp lý. Không đáng cho dự án đầu tay miễn phí |
| Tính lương giáo viên | Mỗi studio một công thức → hố cấu hình |
| CRM tuyển sinh, quản lý lead | Ngoài phạm vi |
| Chat trong app | Zalo đã làm tốt hơn |
| App riêng cho phụ huynh | Phụ huynh đã ở trong Zalo. Bắt cài app là mất họ |
| Xếp lịch tự động | Hố sâu về mô hình dữ liệu |
| Dashboard biểu đồ | Chủ studio mở 2 lần rồi thôi |
| Tích hợp Zalo ZNS | Tính tiền theo tin nhắn, không kham nổi khi miễn phí |
| Ship ngôn ngữ thứ hai | Chưa có người dùng cần. Hạ tầng i18n thì có làm (A16) — xem `11-ngon-ngu.md` |
| Native app iOS/Android | PWA đủ, không phải qua app store |

---

## Tổng kết

| Nhóm | Số tính năng | Trạng thái |
|---|---|---|
| A — Lõi | 16 | Xây được ngay |
| B — Nếu kịch bản A | 7 | Chờ xác nhận |
| C — Nếu kịch bản B | 6 | Chờ xác nhận |
| D — Hoãn | 5 | Chờ dữ liệu thật |
| E — Không làm | 10 | Đóng |

**Phạm vi thực tế của sản phẩm: 16 + 6 hoặc 16 + 7 tính năng.**
Khoảng 22–23 tính năng. Đó là một sản phẩm nhỏ, và nó nên nhỏ.

---

## Cập nhật file này khi nào

- Sau GĐ 0: chốt kịch bản A hay B, xoá nhóm còn lại
- Sau GĐ 3: mở nhóm D dựa trên câu trả lời thật
- Sau GĐ 4: nếu studio thứ hai đòi tính năng ở nhóm E, ghi lại nhưng đừng
  làm ngay — cần hai studio cùng đòi mới xem xét
