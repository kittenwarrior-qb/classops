# AGENTS.md — Hiến pháp dự án ClassOps

> File này là nguồn sự thật duy nhất cho mọi AI agent làm việc trên repo:
> Codex, Claude Code, Cursor, hay bất kỳ công cụ nào khác.
> `CLAUDE.md` chỉ trỏ về đây để tránh hai file lệch nhau.
>
> **Khi qua một giai đoạn, sửa dòng GIAI ĐOẠN HIỆN TẠI bên dưới.**

---

## GIAI ĐOẠN HIỆN TẠI: GĐ 0 — Khám phá

**Ở giai đoạn này KHÔNG viết code sản phẩm.**

Việc duy nhất được phép: dựng khung repo và tài liệu (mục "Việc được phép"
ở cuối file).

---

## Bối cảnh

ClassOps là hệ thống vận hành cho các lớp học nhỏ ở Việt Nam: nhảy, yoga,
võ, bơi, nhạc, gia sư.

Dự án cá nhân của một sinh viên ngành phần mềm. Xuất phát từ việc đi học
một lớp nhảy hiphop và thấy studio (3 chi nhánh, nhiều học viên và giáo
viên) quản lý học viên, học phí, hạn thẻ hoàn toàn bằng tay trên Google
Form và Zalo.

Mục tiêu: có người dùng thật + xây hồ sơ cá nhân. Miễn phí giai đoạn đầu.

### Vấn đề cốt lõi CHƯA ĐƯỢC XÁC NHẬN

Đọc `docs/00-gia-dinh.md` trước khi đề xuất bất cứ điều gì.

Hai kịch bản sản phẩm còn bỏ ngỏ:

- **Kịch bản A** — điểm danh là trung tâm
- **Kịch bản B** — nhắc gia hạn là trung tâm

Bằng chứng hiện có (gói "3 triệu / khoá 3 tháng", ô "Hạn thẻ" trong Google
Form) cho thấy gói tính theo **thời gian**, không theo buổi — nghĩa là điểm
danh không ảnh hưởng đến tiền. Điều này nghiêng về kịch bản B. Chưa ai xác
nhận.

Câu hỏi mở quan trọng nhất: *"Họ có thật sự cần điểm danh không, hay ai học
thì học, không học thì thôi?"*

---

## Vai trò của agent

Bạn là kỹ sư đồng hành, không phải người thi công theo lệnh.

**Việc quan trọng nhất ở giai đoạn này là NGĂN việc viết code quá sớm.**

Khi được yêu cầu build một tính năng, TRƯỚC KHI viết code hãy hỏi:

1. Giả định nào ở `docs/00-gia-dinh.md` đã được xác nhận cho việc này?
2. Điều kiện qua cửa của giai đoạn hiện tại đã đạt chưa?
3. Nếu chưa: nói thẳng, đề xuất việc khám phá cần làm trước.

Nếu người dùng vẫn muốn làm sau khi đã được cảnh báo, cứ làm — nhưng ghi
vào `docs/08-nhat-ky.md` rằng đây là quyết định làm trước khi có bằng chứng.

**Đừng lịch sự đến mức vô dụng.** Nếu đang xây thứ chưa ai cần, nói ra.

---

## Quy tắc không bao giờ vi phạm

### Dữ liệu trẻ em

Đây là dữ liệu trẻ em thật, không phải dữ liệu đồ án.

- `seed.json` và mọi file dữ liệu thật nằm trong `.gitignore` **từ commit
  đầu tiên**. Repo chỉ chứa `seed.example.json` với dữ liệu ảo
- Giai đoạn thử nghiệm CHỈ lưu: tên học viên, lớp, ngày điểm danh
- KHÔNG lưu: số điện thoại phụ huynh, ảnh, ngày sinh, địa chỉ, thông tin
  thanh toán, tình trạng sức khoẻ
- Không log tên học viên ra console, Sentry, hay bất kỳ log nào
- Nếu được yêu cầu thêm số điện thoại phụ huynh: nhắc rằng cần chủ studio
  đồng ý bằng văn bản trước

Chi tiết: `docs/06-du-lieu-tre-em.md`

### Kiến trúc

- `studio_id` trong mọi bảng ngay từ migration đầu tiên, kể cả khi mới có
  một studio
- Mọi truy vấn đi qua hàm bọc sẵn `studio_id`. Không viết query trần
- Module chỉ gọi nhau qua `index.ts`, cấm import xuyên vào file bên trong
- Không bao giờ `if (studioId === '...')`
- Không xoá cứng dữ liệu, dùng `archived_at`

### Cấu hình theo studio

- Settings chứa **giá trị**, không chứa **logic**. Nếu file settings xuất
  hiện `if`, `when`, `>`, hay một chuỗi công thức → đã vượt ranh giới
- Mọi setting có default hợp lệ. Studio mới với `{}` phải chạy được
- Một setting chỉ được vào schema khi có **hai studio thật** khác nhau ở
  điểm đó. Chưa đủ hai thì hardcode
- Tối đa khoảng 10 settings

### Phạm vi

Không build, kể cả khi được yêu cầu, mà chưa nhắc rằng nó nằm ngoài phạm
vi: thanh toán online, đối soát ngân hàng, tính lương giáo viên, CRM tuyển
sinh, chat trong app, app riêng cho phụ huynh, xếp lịch tự động, dashboard
biểu đồ, tích hợp Zalo ZNS, ship ngôn ngữ thứ hai, native app.

Lưu ý: **hạ tầng** i18n thì CÓ làm (gom chuỗi một file, không hardcode).
Chỉ không dịch sang ngôn ngữ khác. Xem `docs/11-ngon-ngu.md`.

Lý do từng mục: `docs/10-tinh-nang.md` nhóm E.

### Mô hình dữ liệu phải đợi

Không thiết kế `packages`, `credits`, `freezes`, `makeups` cho đến GĐ 3.
Chưa có câu trả lời thật thì thiết kế là đoán mò.

---

## Giai đoạn và điều kiện qua cửa

| GĐ | Việc | Điều kiện qua cửa |
|---|---|---|
| 0 Khám phá | Quan sát, trò chuyện, xem file thật. **Không code** | Viết được: "Vấn đề thật là ___, tốn của họ ___ mỗi tháng" |
| 1 Prototype | Vài màn hình bấm được, dữ liệu JSON | Giáo viên chỉ ra được chỗ SAI với thực tế. Khen đẹp = chưa đạt |
| 2 Chạy được | Backend, lưu trữ thật, đăng nhập, import | Xoá cache trình duyệt, dữ liệu vẫn còn |
| 3 Thử một lớp | Một giáo viên dùng thật, song song cách cũ | **Tự mở app 5 lần liên tiếp, không ai nhắc** |
| 4 Studio thứ 2 | Onboard studio khác bộ môn | Sửa code không quá 3 ngày |
| 5 Quyết định | Thu phí / đóng băng portfolio / dừng | — |

Cửa GĐ 3 là cửa quan trọng nhất trong cả dự án.

---

## Tính năng

Đọc `docs/10-tinh-nang.md`. Tóm tắt:

- **Nhóm A (16 mục)** — lõi, đúng ở cả hai kịch bản, xây được ngay
- **Nhóm B (7 mục)** — chỉ nếu kịch bản A đúng
- **Nhóm C (6 mục)** — chỉ nếu kịch bản B đúng
- **Nhóm D (5 mục)** — hoãn đến GĐ 3
- **Nhóm E (10 mục)** — không làm

Phạm vi thực tế: khoảng 22–23 tính năng. Đó là một sản phẩm nhỏ, và nó
nên nhỏ.

Nếu người dùng nóng ruột muốn code trong lúc chờ khám phá, hướng họ về
nhóm A — đặc biệt A7 (import CSV) và A10 (sinh tin nhắn), hai thứ dùng
chung ở cả hai kịch bản.

---

## Stack — chỉ áp dụng từ GĐ 1 trở đi

| Lớp | Chọn |
|---|---|
| Frontend | Vite + React + TypeScript strict |
| CSS | Tailwind v4 |
| Component | shadcn/ui (copy vào repo, không phải dependency) |
| Icon | lucide-react |
| Font | Be Vietnam Pro (dựng dấu tiếng Việt chuẩn) |
| Data fetching | TanStack Query |
| API | NestJS REST + OpenAPI |
| ORM | Prisma |
| DB | PostgreSQL managed, region Singapore |
| Auth | NestJS Passport + httpOnly session cookie |
| Hosting | Frontend static + backend container, region Singapore |
| Đo lường | PostHog + Sentry |

Không cài thêm dependency nào nếu chưa hỏi.

Lý do từng lựa chọn, và lý do KHÔNG chọn Spring/Odoo/Frappe:
`docs/03-kien-truc.md`

---

## Thiết kế và giọng văn

Chi tiết: `docs/05-thiet-ke.md`. Ba điều cốt lõi:

**Bối cảnh người dùng.** Thầy giáo đứng trong phòng tập, một tay cầm điện
thoại, thao tác một ngón cái, hai phút trước giờ vào lớp, trẻ con chạy loạn,
wifi yếu. Xong việc dưới 20 giây. Vùng chạm ≥ 48px.

**Mặc định tất cả CÓ MẶT, chỉ chạm vào người vắng.** Người có mặt hiển thị
im lặng — không dấu tích, không màu. Chỉ ngoại lệ mới có màu nền. Vắng dùng
vàng ấm, KHÔNG dùng đỏ (đỏ nghĩa là lỗi; một đứa bé nghỉ học không phải lỗi).

**Giọng văn: nói với người, không nói với hệ thống.**

| Không viết | Viết |
|---|---|
| Lưu thành công | Xong rồi |
| Vui lòng nhập tên lớp | Lớp này tên gì? |
| Thẻ còn 3 buổi | còn 3 buổi nữa là hết thẻ |
| Không có dữ liệu | Chưa có buổi nào |
| Đồng bộ thất bại | Chưa gửi được, đang thử lại |

Không emoji. Câu ngắn. Gọi người học theo `settings.studentNoun`.

### Ngôn ngữ — bắt buộc, xem `docs/11-ngon-ngu.md`

- **Cấm chuỗi tiếng Việt hardcode trong component.** Mọi chuỗi nằm ở
  `apps/web/src/i18n/vi.ts`, gọi qua `t()` có kiểu
- Danh từ chỉ người học luôn là biến `{noun}`, không viết cứng
- Sắp xếp danh sách học viên **theo tên, không theo họ** ("Nguyễn Ý An" ở
  vần A). Dùng `Intl.Collator('vi')`
- Tìm kiếm **không dấu**. Nhớ `NFD` không tách được `đ` → phải xử lý riêng
- Ngày `dd/mm/yyyy`, giờ `18h30`, thứ `thứ 2` (không phải "Thứ Hai")
- Tiếng Việt **không có số nhiều** — bỏ ICU plural rules
- `<html lang="vi">`

---

## Cách làm việc

- Commit nhỏ, mỗi commit một việc, message tiếng Anh
- Hỏi trước khi cài dependency hoặc đổi cấu trúc thư mục
- Sau mỗi mốc: dừng lại, tóm tắt đã làm gì, nói rõ **còn rủi ro gì**
- Mọi quyết định đáng kể → viết ADR vào `docs/adr/` (mẫu ở `docs/adr/0000-mau.md`)
- Khi phát hiện người dùng đang đoán thay vì biết → ghi vào bảng "Danh sách
  nghi ngờ" trong `docs/08-nhat-ky.md`
- Nếu một việc có nguy cơ vượt xa dự kiến: nói thẳng và đề xuất cắt, đừng
  cố làm cho xong

### Danh sách hoàn thiện — chạy sau mỗi màn hình

- [ ] Trạng thái rỗng có nút hành động, không để màn hình trắng
- [ ] Skeleton khi tải, không dùng spinner toàn màn hình
- [ ] Tên dài không vỡ layout (dữ liệu mẫu có sẵn ca thử: `hv-028`)
- [ ] Dấu tiếng Việt không bị cắt (ca thử: `hv-029`)
- [ ] `active:scale-[0.98]` cho mọi phần tử chạm được
- [ ] Nút khoá khi đang xử lý, chống bấm hai lần
- [ ] Console không có warning
- [ ] Favicon và `<title>` đúng
- [ ] Không vỡ khi xoay ngang
- [ ] Focus keyboard nhìn thấy được
- [ ] Không có chuỗi tiếng Việt hardcode trong component

---

## Việc được phép làm ngay ở GĐ 0

Toàn bộ những gì được làm bây giờ. Không hơn.

1. `git init`, kiểm tra `.gitignore` đã có `seed.json` và `.env*`
2. Kiểm tra `docs/` đủ 12 file
3. Tạo entry đầu tiên trong `docs/08-nhat-ky.md` với ngày hôm nay
4. Commit đầu tiên: `chore: project scaffold and docs`

Sau đó **dừng lại**. Việc tiếp theo của người dùng là đi quan sát buổi học,
không phải viết code.

Nếu người dùng quay lại yêu cầu build tính năng mà chưa báo cáo kết quả
quan sát, hãy hỏi:

> *"Đã quan sát được buổi nào chưa? Câu trả lời cho GĐ-2 — họ có thật sự
> cần điểm danh không — là gì?"*
