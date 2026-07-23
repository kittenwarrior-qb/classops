# 06 — Dữ liệu trẻ em và riêng tư

> Đọc file này TRƯỚC KHI chạm vào dữ liệu thật đầu tiên.
> Đây không phải mục tuân thủ hình thức. Đây là trách nhiệm thật.

---

## Bạn đang giữ cái gì

Tên trẻ em. Có thể cả ngày sinh, số điện thoại phụ huynh, lịch học — tức là
**biết một đứa trẻ có mặt ở đâu, vào giờ nào, mỗi tuần**.

Đó là dữ liệu nhạy cảm hơn hầu hết dữ liệu doanh nghiệp. Xử lý cẩu thả không
chỉ là lỗi kỹ thuật.

---

## Nguyên tắc: thu thập ít nhất có thể

Câu hỏi cho mỗi trường dữ liệu: **"nếu không có trường này thì sản phẩm hỏng
chỗ nào?"** Không trả lời được → không thu thập.

### Giai đoạn chạy thử — CHỈ lưu

- Tên học viên
- Lớp đang học
- Ngày điểm danh / trạng thái vắng

### Giai đoạn chạy thử — KHÔNG lưu

- Số điện thoại phụ huynh
- Ảnh học viên
- Ngày sinh (trừ khi chứng minh được là cần)
- Địa chỉ nhà
- Thông tin thanh toán
- Tình trạng sức khoẻ

Bấy nhiêu đủ để chứng minh hệ thống chạy, mà nếu có sự cố thì thiệt hại
gần bằng không.

Số điện thoại phụ huynh chỉ nhập **sau khi chủ studio đồng ý bằng văn bản**
(một tin nhắn Zalo là đủ, nhưng phải có).

---

## Ai có quyền cho phép

**Giáo viên KHÔNG có quyền cho phép bạn lưu dữ liệu học viên.** Dữ liệu
thuộc về studio, và về phụ huynh.

Trình tự đúng:
1. Nói chuyện với giáo viên → được
2. Xem file dữ liệu → được (chỉ xem cấu trúc, không sao chép)
3. Nhập dữ liệu thật vào hệ thống của mình → **cần chủ studio đồng ý**

Nếu chưa gặp được chủ, dùng tên giả hoặc viết tắt (Nguyễn Ý An → "N.Y.A")
để prototype. Vẫn đủ thuyết phục.

---

## Yêu cầu kỹ thuật tối thiểu

- [ ] HTTPS ở mọi nơi, không có ngoại lệ
- [ ] `seed.json` và mọi file dữ liệu thật trong `.gitignore` **từ commit
      đầu tiên** — repo public chỉ có `seed.example.json` với tên giả
- [ ] Không log tên học viên ra console, Sentry, hay bất kỳ log nào
- [ ] `studio_id` trong mọi bảng, mọi query qua hàm bọc sẵn
- [ ] Giáo viên chỉ xem được lớp mình dạy
- [ ] Backup `pg_dump` hằng đêm, file mã hoá
- [ ] Nút xuất toàn bộ dữ liệu ra Excel bất cứ lúc nào
- [ ] Nút xoá toàn bộ dữ liệu studio, xoá thật
- [ ] Không xoá cứng từng bản ghi (dùng `archived_at`), nhưng xoá studio
      thì phải xoá thật

Hai gạch cuối nghe mâu thuẫn nhưng không: xoá nhầm một học viên phải khôi
phục được; còn khi studio muốn rời đi thì phải xoá sạch.

---

## Nếu lỡ commit dữ liệu thật lên repo public

Xảy ra thường xuyên hơn bạn nghĩ.

1. Xoá khỏi lịch sử git (`git filter-repo` hoặc BFG), không chỉ commit mới
2. Force push
3. Nếu repo đã public một thời gian: coi như dữ liệu đã lộ, phải báo cho
   studio
4. Đổi mọi khoá/token có trong đó

Cách tránh: `.gitignore` trước khi tạo file, không phải sau.

---

## Nói gì với studio

Nói trước, bằng chữ, không nói miệng. Ba điểm:

**Đây là dự án cá nhân, không phải công ty.** Không cam kết SLA, không cam
kết duy trì vĩnh viễn.

**Dữ liệu là của anh.** Xuất ra Excel lúc nào cũng được. Muốn xoá là xoá sạch.

**Giai đoạn này chỉ lưu tên và ngày điểm danh.** Không lưu số điện thoại
phụ huynh cho đến khi anh đồng ý.

Nói ba điều này làm bạn *đáng tin hơn*, không phải yếu thế hơn. Và nó tránh
được chuyện sau này họ coi bạn là nhân viên IT không lương.

---

## Khi dừng dự án

Nếu đến GĐ 5 bạn quyết định dừng:

1. Báo trước ít nhất 30 ngày
2. Xuất toàn bộ dữ liệu ra Excel, gửi cho họ
3. Xác nhận họ đã nhận và mở được file
4. Xoá dữ liệu khỏi hệ thống của mình
5. Xoá luôn backup

Bước 5 hay bị quên. Backup nằm im trong object storage vẫn là dữ liệu trẻ
em bạn đang giữ.

---

## Ghi chú cho hồ sơ cá nhân

Xử lý chuyện này chỉn chu là **điểm cộng lớn khi phỏng vấn**. Rất ít sinh
viên nghĩ tới. Ghi lại trong README một mục ngắn về cách xử lý dữ liệu —
nó cho thấy bạn hiểu rằng phần mềm chạm vào người thật.
