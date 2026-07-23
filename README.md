# ClassOps

Hệ thống vận hành cho các lớp học nhỏ ở Việt Nam — nhảy, yoga, võ, bơi,
nhạc, gia sư.

Xuất phát từ việc đi học một lớp nhảy hiphop và thấy studio (3 chi nhánh)
quản lý học viên, học phí và hạn thẻ hoàn toàn bằng tay trên Google Form
và Zalo.

> **Trạng thái: GĐ 0 — Khám phá. Chưa xây gì.**
> Vấn đề cốt lõi chưa được xác nhận. Xem [docs/00-gia-dinh.md](docs/00-gia-dinh.md).

---

## Nguyên tắc

1. Không viết code cho một vấn đề chưa xác nhận là có thật
2. Mỗi giai đoạn có điều kiện qua cửa — chưa đạt thì không đi tiếp
3. Dữ liệu trẻ em là dữ liệu thật, không phải dữ liệu đồ án
4. Thà bỏ dự án sớm còn hơn xây một thứ không ai dùng

---

## Cho AI agent

Đọc **[AGENTS.md](AGENTS.md)** trước khi làm bất cứ việc gì.
`CLAUDE.md` chỉ trỏ về đó — một nguồn sự thật duy nhất cho mọi công cụ.

---

## Tài liệu

| File | Nội dung | Đọc khi |
|---|---|---|
| [00-gia-dinh](docs/00-gia-dinh.md) | Giả định và câu hỏi cần trả lời | **Bắt đầu từ đây** |
| [01-kham-pha](docs/01-kham-pha.md) | Cách đi tìm câu trả lời | Trước khi gặp người dùng |
| [02-pham-vi](docs/02-pham-vi.md) | Phạm vi và các giai đoạn | Sau khi có câu trả lời |
| [03-kien-truc](docs/03-kien-truc.md) | Quyết định kỹ thuật | Trước dòng code đầu tiên |
| [04-data-model](docs/04-data-model.md) | Mô hình dữ liệu | Trước migration đầu tiên |
| [05-thiet-ke](docs/05-thiet-ke.md) | Nguyên tắc thiết kế và giọng văn | Trước màn hình đầu tiên |
| [06-du-lieu-tre-em](docs/06-du-lieu-tre-em.md) | Riêng tư và trách nhiệm | **Trước khi chạm dữ liệu thật** |
| [07-trien-khai](docs/07-trien-khai.md) | Chạy thử và đo lường | Khi có bản chạy được |
| [08-nhat-ky](docs/08-nhat-ky.md) | Nhật ký và ghi quyết định | Mỗi ngày |
| [09-dung-du-an](docs/09-dung-du-an.md) | Khi nào nên dừng | Đọc trước, không phải khi thất bại |
| [10-tinh-nang](docs/10-tinh-nang.md) | Danh sách tính năng | Khi cân nhắc thêm bớt |
| [11-ngon-ngu](docs/11-ngon-ngu.md) | i18n và chuẩn tiếng Việt | Trước màn hình đầu tiên |

---

## Cấu trúc

```
AGENTS.md              hiến pháp dự án — nguồn sự thật cho mọi AI agent
CLAUDE.md              trỏ về AGENTS.md
seed.example.json      dữ liệu ảo, được commit
seed.json              dữ liệu thật, KHÔNG BAO GIỜ commit
docs/                  12 file tài liệu theo giai đoạn
docs/adr/              ghi quyết định kiến trúc
docs/quan-sat/         bảng quan sát buổi học (nội dung không commit)
```

---

## Dữ liệu

`seed.example.json` chứa dữ liệu **hoàn toàn ảo**: Chi nhánh 1–3, Thầy giáo
1–3, Học viên 1–30, Ca 1–3. Không có thông tin thật của bất kỳ ai.

Có sẵn vài ca thử: một học viên vắng nhiều (`hv-003`), vài học viên đã hoặc
sắp hết hạn thẻ, một tên rất dài để kiểm tra bố cục (`hv-028`), một tên nhiều
dấu khó để kiểm tra font (`hv-029`), và ba tuần lịch sử điểm danh.

**Dữ liệu thật không bao giờ nằm trong repo.** Xem
[docs/06-du-lieu-tre-em.md](docs/06-du-lieu-tre-em.md).

---

## Bắt đầu

```bash
git init
git add .
git commit -m "chore: project scaffold and docs"
```

Sau đó: đọc `docs/00-gia-dinh.md`, rồi đi quan sát một buổi học với mẫu ở
`docs/quan-sat/mau-quan-sat.md`.

Chưa viết code.
