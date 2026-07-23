# 04 — Mô hình dữ liệu

> Chia làm hai phần: phần CỐ ĐỊNH ĐƯỢC NGAY (đúng với mọi studio, mọi bộ
> môn) và phần PHẢI ĐỢI (chỉ thiết kế sau khi có câu trả lời thật).

Thiết kế sai phần "phải đợi" là nguyên nhân số một khiến phải viết lại.

---

## Phần cố định được ngay

Bốn thực thể này giống nhau ở mọi loại lớp học.

```sql
studios
  id            uuid pk
  name          text
  settings      jsonb not null default '{}'
  created_at    timestamptz

users
  id            uuid pk
  studio_id     uuid fk        -- BẮT BUỘC, kể cả khi mới có 1 studio
  email         text unique
  name          text
  role          text           -- 'owner' | 'teacher'
  created_at    timestamptz

classes
  id            uuid pk
  studio_id     uuid fk
  name          text           -- "Kiddance cơ bản"
  branch        text           -- "Cs3"
  schedule      text           -- "thứ 2 & 4 · 18h30" (text tự do, chưa cần
                               --  cấu trúc hoá — xem ghi chú dưới)
  teacher_id    uuid fk null
  archived_at   timestamptz null

students
  id            uuid pk
  studio_id     uuid fk
  name          text
  birth_date    date null      -- có thể không cần, xem 06-du-lieu-tre-em.md
  note          text null
  archived_at   timestamptz null

enrollments
  id            uuid pk
  studio_id     uuid fk
  class_id      uuid fk
  student_id    uuid fk
  joined_at     date
  left_at       date null
```

### Ghi chú thiết kế

**`schedule` để dạng text tự do.** Cấu trúc hoá lịch học (thứ mấy, giờ nào,
lặp thế nào, nghỉ lễ ra sao) là một hố sâu. Chưa cần cho đến khi có tính
năng xếp lịch tự động — mà tính năng đó nằm trong danh sách KHÔNG làm.

**`archived_at` thay vì xoá.** Không bao giờ xoá cứng dữ liệu học viên. Lỡ
tay là mất vĩnh viễn.

**`enrollments` là bảng riêng, không phải cột `class_id` trong `students`.**
Vì một bé có thể học nhiều lớp, và có thể chuyển lớp — lúc đó cần giữ lịch sử.

---

## Điểm danh — chỉ làm nếu kịch bản A được xác nhận

```sql
attendance_sessions
  id                uuid pk
  studio_id         uuid fk
  class_id          uuid fk
  date              date
  recorded_by       uuid fk
  device_id         text
  client_timestamp  timestamptz    -- thời điểm ở máy client
  synced_at         timestamptz    -- thời điểm server nhận
  unique (studio_id, class_id, date)

attendance_absences
  session_id        uuid fk
  student_id        uuid fk
  reason            text null      -- 'reported' | 'unreported' | null
  primary key (session_id, student_id)
```

### Vì sao chỉ lưu người VẮNG

Hệ quả trực tiếp của quyết định thiết kế "mặc định có mặt". Lớp 24 bé vắng
2 → lưu 2 dòng thay vì 24. Ít dữ liệu hơn, và cấu trúc dữ liệu phản ánh
đúng cách người dùng nghĩ.

**Đánh đổi cần biết:** muốn biết ai có mặt phải join với `enrollments` tại
thời điểm đó. Chấp nhận được.

### Khoá unique và idempotency

`unique (studio_id, class_id, date)` là thứ làm cho việc gửi lại an toàn.
Server upsert theo khoá này — điện thoại mất sóng gửi lại 5 lần vẫn ra một
kết quả.

---

## Phần PHẢI ĐỢI — không thiết kế bây giờ

Đây là chỗ dễ sai nhất, và sai thì phải viết lại nhiều.

### Gói học / thẻ (`packages`, `credits`)

**Chưa biết:**
- Tính theo buổi hay theo thời gian? (bằng chứng hiện tại nghiêng về **thời gian**)
- Một bé có thể có nhiều gói cùng lúc không?
- Gói mua cho một lớp hay dùng được nhiều lớp?
- Hết hạn thì buổi còn lại mất hay giữ?

**Chỉ thiết kế sau khi trả lời được.** Nếu gói tính theo thời gian thì mô
hình đơn giản hơn nhiều so với sổ cái trừ buổi.

### Bảo lưu (`freezes`)

**Chưa biết:**
- Bảo lưu tính theo ngày hay theo buổi?
- Tối đa bao lâu, bao nhiêu lần?
- Ai duyệt?
- Trong thời gian bảo lưu, bé vẫn được vào lớp không?

Câu cuối nghe ngớ ngẩn nhưng thực tế nhiều studio trả lời "có, nếu lớp trống chỗ".

### Học bù (`makeups`)

**Chưa biết:**
- Bù ở lớp khác cùng trình độ được không?
- Bù ở chi nhánh khác được không?
- Có hạn bù không?
- Bù rồi thì buổi cũ tính thế nào?

### Tính lương giáo viên

Nằm trong danh sách KHÔNG làm. Mỗi studio một công thức.

---

## Quy tắc chung

1. **Mọi bảng có `studio_id`.** Không ngoại lệ.
2. **Mọi truy vấn qua hàm bọc sẵn `studio_id`.** Không viết query trần.
3. **Không xoá cứng.** Dùng `archived_at`.
4. **Tiền lưu bằng integer VNĐ**, không dùng float.
5. **Ngày giờ lưu `timestamptz`**, hiển thị theo giờ VN.
6. **`audit_log` từ đầu:**

```sql
audit_log
  id          uuid pk
  studio_id   uuid fk
  actor_id    uuid fk null
  action      text
  entity      text
  entity_id   uuid
  payload     jsonb
  created_at  timestamptz
```

Rẻ để thêm ngay, đắt để thêm sau. Và là thứ cứu bạn khi có tranh cãi
"tôi đâu có sửa cái đó".

---

## Migration

- Dùng `drizzle-kit`, mỗi migration một việc
- Chạy trong CI trước deploy, không chạy lúc app khởi động
- Không bao giờ sửa migration đã lên production — viết cái mới
- Trước mỗi migration trên production: chạy `pg_dump` trước
