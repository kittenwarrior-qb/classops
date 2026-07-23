# 07 — Chạy thử và đo lường

---

## Chỉ số duy nhất thật sự quan trọng

> **Người dùng tự mở app mà không ai nhắc, 5 lần liên tiếp.**

Không phải số dòng code, không phải số tính năng, không phải lời khen.

Mọi chỉ số khác đều là phụ. Nếu chỉ số này không đạt, mọi thứ khác vô nghĩa.

---

## Chuẩn bị trước khi đưa cho ai

- [ ] Dữ liệu thật của đúng lớp họ dạy, không phải "Nguyễn Văn A"
- [ ] Đã tự dùng thử ít nhất 3 lần trên điện thoại thật
- [ ] Không có warning trong console
- [ ] PostHog gắn đúng sự kiện (xem dưới)
- [ ] Sentry chạy
- [ ] Có cách liên lạc khi họ gặp lỗi
- [ ] Đã đọc 06-du-lieu-tre-em.md và làm đủ

---

## Sự kiện cần đo

Đủ để trả lời câu hỏi quan trọng, không hơn.

```
app_opened            { source: 'homescreen' | 'browser' }
attendance_started    { class_id }
attendance_saved      { class_id, duration_seconds, absent_count }
attendance_abandoned  { class_id, seconds_before_leaving }
message_shared        { channel_hint }
sync_completed        { queued_seconds }
sync_failed           { error_type }
```

**Không đo:** tên học viên, bất kỳ dữ liệu cá nhân nào.

### Câu hỏi mà số liệu phải trả lời

1. Họ có tự mở không, hay chỉ mở khi mình nhắc? → `app_opened` theo ngày
2. Điểm danh mất bao lâu thật? → `duration_seconds`
3. Có ai bỏ dở giữa chừng không? → `attendance_abandoned`
4. Sync có chạy ngoài đời thật không? → `queued_seconds`
5. Họ có dùng nút gửi tin nhắn không? → `message_shared`

Câu 3 và 5 hay bị bỏ qua nhưng là hai câu cho biết nhiều nhất.

---

## Cách bàn giao

**Ngồi cạnh 2 buổi đầu.** Không hướng dẫn. Đưa điện thoại và im lặng. Ghi
lại chỗ họ ngập ngừng — đó là chỗ thiết kế sai, không phải chỗ họ chậm hiểu.

**Từ buổi 3 biến mất.** Không nhắn hỏi "app dùng được không". Câu đó tạo áp
lực phải khen. Cứ để số liệu nói.

**Nói trước câu này:**
> "Nếu thấy phiền thì bỏ luôn, đừng ráng dùng vì tao/em."

Nghe ngược đời nhưng cần thiết. Người quen sẽ dùng vì nể, và bạn học được
số 0.

---

## Đọc tín hiệu

### Tín hiệu THẬT (đang được việc)
- Họ hỏi ngược chi tiết vận hành: "bé bảo lưu thì tính sao?"
- Họ tự đề xuất dùng cho lớp khác
- Họ khoe với đồng nghiệp
- Họ báo lỗi kèm ảnh chụp màn hình
- Họ hỏi khi nào có tính năng X

### Tín hiệu GIẢ (đang lịch sự)
- "Hay đấy em"
- "Để anh xem"
- Khen giao diện đẹp mà không hỏi gì thêm
- Dùng đúng những buổi bạn có mặt

**Khen là dấu hiệu xấu. Câu hỏi khó mới là dấu hiệu tốt.**

### Nếu sau 2 tuần họ không tự mở
Đó là "không", dù không ai nói ra. Đừng thuyết phục. Hỏi cho ra vì sao:

> "Anh nói thật giùm em, chỗ nào làm anh ngại dùng?"

Câu trả lời đó đáng giá hơn cả tháng code.

---

## Studio thứ hai

Chỉ tìm sau khi studio đầu tiên đạt chỉ số.

- Xin giới thiệu, đừng nhắn tin lạnh. Trong ngành này giáo viên biết nhau hết
- Ưu tiên **khác bộ môn** (võ, yoga, gia sư) để kiểm chứng giả thuyết "phục
  vụ được nhiều loại lớp"
- Đo bằng: onboard mất bao lâu, phải sửa code bao nhiêu

Chỗ nào phải sửa cứng trong code chính là chỗ cần thành cấu hình — và lúc
đó bạn mới biết **chính xác** cần cấu hình cái gì.

---

## Đặt ranh giới cho chữ "miễn phí"

Viết ra, gửi qua Zalo, không nói miệng:

- Miễn phí trong giai đoạn thử nghiệm
- Đổi lại: phản hồi thật + cho phép dùng làm bài giới thiệu trong hồ sơ
  cá nhân + giới thiệu sang studio khác nếu thấy được
- Không cam kết SLA, không cam kết duy trì vĩnh viễn
- Dữ liệu là của họ, xuất/xoá lúc nào cũng được

Không đặt ranh giới → sau vài tháng bạn thành nhân viên IT không lương và
bực bội cả hai bên.

---

## Xây tên tuổi song song

Đây là mục tiêu chính, đừng để thành việc làm thêm lúc cuối.

- **Viết ngắn mỗi tuần** (LinkedIn/blog): quyết định nào, vì sao, sai chỗ
  nào. Câu chuyện "tôi đi học lớp nhảy, thấy thầy chụp màn hình chuyển khoản
  rồi gõ tay vào Google Form" mạnh hơn mọi mô tả kỹ thuật
- **README có ảnh app chạy trên điện thoại thật**, không phải ảnh trình duyệt
- **Săn con số:** sau 6 tháng muốn nói được "5 lớp, 120 học viên, 900 lượt
  điểm danh, uptime 99%". Một câu đó ăn đứt mười project CRUD

Ngày có người copy bạn là ngày nên ăn mừng — nghĩa là đã đủ nổi để đáng copy.
