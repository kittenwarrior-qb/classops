# 05 — Nguyên tắc thiết kế và giọng văn

---

## Bối cảnh sử dụng — nguồn gốc của mọi ràng buộc

Ba nhóm người dùng, ba bối cảnh khác nhau đến mức **không nên là cùng một
giao diện responsive**.

### Giáo viên
Đứng trong phòng tập. Một tay cầm điện thoại, thao tác một ngón cái. Hai
phút trước giờ vào lớp. Trẻ con chạy loạn xung quanh. Wifi yếu.

→ Xong việc dưới 20 giây. Vùng chạm ≥ 48px. Chạy offline.

### Phụ huynh
Không nên "dùng" app. Chỉ nên **nhận** thông tin. Họ đã ở trong Zalo rồi.

→ Không xây giao diện cho phụ huynh. Chỉ sinh ra văn bản để thầy gửi.

### Chủ studio
Ngồi laptop, tuần một lần, chỉ cần con số.

→ Màn hình riêng, desktop, làm sau cùng.

---

## Tối giản không phải mục tiêu — hiển nhiên mới là

Tối giản kiểu Apple giả định người dùng chịu khám phá: icon không nhãn, cử
chỉ ẩn, menu ba chấm. Người dùng ở đây không có nhu cầu khám phá.

**Hiển nhiên đôi khi cần NHIỀU chữ hơn:** nút ghi rõ "Lưu điểm danh" thay
vì dấu tick; nhãn nằm ngoài ô input thay vì placeholder biến mất khi gõ.

Quy tắc phân tầng:
- **Độc đáo ở bề mặt:** chữ, màu, giọng văn, khoảng thở
- **Quy ước ở tương tác:** nút ở đâu, vuốt làm gì, back đi về đâu

Đừng mua sự độc đáo bằng khả năng dùng được.

---

## Quyết định thiết kế cốt lõi

**Mặc định tất cả CÓ MẶT. Chỉ chạm vào người vắng.**

Lớp 24 bé thường vắng 2-3 → 3 thao tác thay vì 24.

Hệ quả lan ra toàn bộ hệ thống:
- Người có mặt hiển thị **im lặng** — không dấu tích, không màu. 23 dấu
  tích là 23 điểm nhiễu thị giác
- Chỉ dòng **ngoại lệ** mới có màu nền
- Database chỉ lưu danh sách vắng

Đây là ví dụ của "thiết kế theo xác suất thực tế" thay vì theo logic dữ liệu.

---

## Màu

**Vắng dùng vàng ấm, không dùng đỏ.**

Đỏ nghĩa là lỗi. Một đứa bé nghỉ học không phải lỗi — phụ huynh đã báo
trước rồi. Vừa đúng nghĩa hơn, vừa khác biệt hơn.

Giữ đỏ cho lỗi thật (mất dữ liệu, thao tác nguy hiểm).

---

## Các quy tắc khác

**Mặc định phải đúng sẵn.** Thiết kế theo trường hợp phổ biến nhất, không
theo trường hợp tổng quát.

**Undo thay vì hộp thoại xác nhận.** "Bạn có chắc không?" là cách đổ trách
nhiệm lên người dùng. Cứ làm, rồi cho nút hoàn tác 5 giây.

**Offline phải vô hình.** Không banner đỏ. Chỉ một chấm xám nhỏ khi đang
chờ đồng bộ, biến mất khi xong.

**Không có màn hình trắng.** Mọi trạng thái rỗng phải có một nút hành động.

**Không bắt ai cấu hình mới dùng được.** Studio mới với settings rỗng vẫn
phải chạy.

---

## Giọng văn — dấu ấn rẻ nhất và mạnh nhất

Hầu hết app Việt viết như văn bản hành chính. Viết như một người là khác
biệt ngay lập tức, mà không tốn một dòng CSS.

| Không viết | Viết |
|---|---|
| Lưu thành công | Xong rồi |
| Vui lòng nhập tên lớp | Lớp này tên gì? |
| Thẻ còn 3 buổi | còn 3 buổi nữa là hết thẻ |
| Không có dữ liệu | Chưa có buổi nào |
| Đồng bộ thất bại | Chưa gửi được, đang thử lại |
| Điểm danh thành công 23/24 học viên | Xong · 23 bé có mặt |

**Nguyên tắc:** nói với *người*, không nói với *hệ thống*.

**Xưng hô:** gọi người học theo cài đặt của studio ("bé" / "học viên" /
"võ sinh"). Xưng hô với người dùng là "thầy".

**Không emoji.** Câu ngắn.

**Lỗi:** nói chuyện gì xảy ra và làm gì tiếp. Không xin lỗi, không viết
"Error:", không hiện exception thô.

---

## Chữ

**Be Vietnam Pro.** Thiết kế riêng cho tiếng Việt. Phần lớn app Việt dùng
Inter hoặc Roboto với dấu dựng xấu — dùng font đúng đã là dấu ấn.

Kiểm tra bắt buộc: "Ẩ", "ợ", "ỹ", "ễ" ở mọi cỡ chữ, đặc biệt trong vòng
tròn avatar nơi dấu hay bị cắt.

---

## Danh sách hoàn thiện

Chạy sau mỗi màn hình, đừng để đến cuối. Hầu hết dưới 15 phút.

- [ ] Trạng thái rỗng có nút hành động
- [ ] Skeleton khi tải, không dùng spinner toàn màn hình
- [ ] Tên dài không vỡ layout (test "Nguyễn Hoàng Bảo Trân Anh")
- [ ] Dấu tiếng Việt không bị cắt ở mọi cỡ chữ
- [ ] Phản hồi chạm tức thì (`active:scale-[0.98]`)
- [ ] Nút khoá khi đang xử lý, chống bấm hai lần
- [ ] Console không có warning
- [ ] Favicon và `<title>` đúng
- [ ] Không vỡ khi xoay ngang
- [ ] Vùng chạm ≥ 48px
- [ ] Focus keyboard nhìn thấy được
- [ ] `prefers-reduced-motion` được tôn trọng

---

## Về chuyện sợ bị copy

UI là thứ dễ copy nhất. Nếu sự độc đáo nằm ở giao diện, đó là moat bằng cát.

Thứ không copy được: quan hệ với người dùng, hiểu biết từ việc đứng trong
phòng tập, dữ liệu tích luỹ, và câu chuyện của chính mình.

Với sản phẩm đầu tay, rủi ro lớn hơn nhiều không phải bị copy — mà là
**không ai biết đến**.
