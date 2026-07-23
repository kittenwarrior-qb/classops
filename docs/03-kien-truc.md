# 03 — Kiến trúc và quyết định kỹ thuật

> Đọc trước dòng code đầu tiên. Nhưng đừng đọc trước khi xong 00 và 01 —
> chọn kỹ thuật khi chưa biết vấn đề là cách nhanh nhất để chọn sai.

---

## Bối cảnh ràng buộc

- Một người làm, không có team
- Ngân sách gần bằng 0
- Sản phẩm đầu tay, mục tiêu chính là có người dùng thật và xây hồ sơ cá nhân
- Người dùng ở Việt Nam, dùng điện thoại, mạng không ổn định

Mọi quyết định dưới đây suy ra từ bốn dòng trên.

---

## Stack

| Lớp | Chọn | Lý do |
|---|---|---|
| Framework | Next.js 15 App Router + TypeScript | Một ngôn ngữ, một codebase, một lần deploy |
| CSS | Tailwind v4 | |
| Component | shadcn/ui | Copy vào repo, không phải dependency — sửa thoải mái |
| Icon | lucide-react | |
| Font | Be Vietnam Pro | Dựng dấu tiếng Việt chuẩn; Inter/Roboto dấu xấu |
| Local DB | Dexie (IndexedDB) | Chỉ cần nếu làm kịch bản A (offline) |
| API | tRPC | Type-safe đầu-cuối, không phải viết client |
| ORM | Drizzle | Schema là TypeScript, migration rõ ràng |
| DB | Neon Postgres, region Singapore | Free tier thật |
| Auth | Auth.js, Google provider | Giáo viên nào cũng có Gmail; SMS OTP tốn tiền |
| Hosting | Vercel, region `sin1` | Mặc định là `iad1` (Mỹ) → phải đổi |
| Đo lường | PostHog + Sentry | Để biết người dùng có tự mở app không |

### Vì sao không chọn Java/Spring

Phần khó nhất (đồng bộ offline) nằm ở client, viết TypeScript bất kể backend
là gì. Chọn Spring = vẫn phải viết phần khó đó, cộng thêm codebase thứ hai.

**Đổi lại nếu:** mục tiêu nghề nghiệp là backend Java và JD nào cũng đòi
Spring. Nhưng đổi *sau khi* sản phẩm chạy, không phải trước.

### Vì sao không dùng Odoo / ERPNext / Frappe

Ba lý do:
1. Chúng sinh ra giao diện nhập liệu desktop — ngược với màn hình mobile
   một-ngón-cái mà sản phẩm này cần
2. Lý do studio không dùng phần mềm có sẵn chính là vì phần mềm đó nặng và
   cần training. Dựng trên ERP là tái tạo đúng thất bại đó
3. Về hồ sơ cá nhân: người xem thấy một người cấu hình DocType, không thấy
   một người thiết kế hệ thống

**Nhưng lấy phần tốt của chúng:** cấu trúc module theo nghiệp vụ (xem dưới).

### Không tự viết những thứ này

Auth, component UI, query/cache/retry, form + validate, migration, bảng
sort/filter, gửi email, logging lỗi. Đều có thư viện tốt hơn thứ mình viết
trong một tuần.

Riêng CRUD back-office (màn hình quản trị): cân nhắc Refine ở GĐ 4 — nó
headless nên không ép giao diện. Không cần trước GĐ 4.

---

## Kiến trúc: modular monolith

Một deploy. Chia module theo **nghiệp vụ**, không theo lớp kỹ thuật.
Không đụng microservice — một người làm.

```
src/
  modules/
    identity/     # studio, user, vai trò
    roster/       # học viên, lớp, ghi danh
    attendance/   # buổi học, bản ghi điểm danh
    credits/      # gói buổi, hạn thẻ    ← để trống đến GĐ3
    notify/       # render template tin nhắn
    reporting/    # sắp hết hạn, vắng nhiều
  lib/            # db, auth, trpc, dexie
  app/            # routes
  components/ui/  # shadcn
```

### Ba quy tắc bắt buộc

1. **Module chỉ gọi nhau qua `index.ts`.** Cấm import xuyên vào file bên
   trong. Cài `eslint-plugin-boundaries` để ép — đừng dựa vào kỷ luật.

2. **`studio_id` có mặt trong mọi bảng ngay từ migration đầu tiên**, kể cả
   khi mới có một studio. Thêm sau đau gấp mười.

3. **Mọi truy vấn đi qua một hàm bọc sẵn `studio_id`.** Rò rỉ dữ liệu giữa
   hai studio là loại lỗi giết chết sản phẩm.

---

## Offline-first — chỉ cần nếu làm kịch bản A

Nếu sản phẩm xoay quanh gia hạn (kịch bản B) thì bỏ qua toàn bộ phần này.
Nhắc gia hạn không cần offline.

### Nguyên tắc
Dexie là nguồn sự thật. Server là bản sao lưu và cầu nối giữa thiết bị.
UI không bao giờ đợi mạng.

### Outbox pattern
```
Bấm Lưu
  → ghi Dexie (dữ liệu)
  → ghi Dexie (outbox)
  → UI cập nhật ngay
  → sync engine chạy nền
  → thành công thì xoá khỏi outbox
```

### Yêu cầu
- **Idempotency:** mỗi mutation có UUID sinh phía client. Server upsert theo
  khoá tự nhiên. Gửi lại N lần ra cùng kết quả.
- **Kích hoạt:** `window.online`, `document.visibilitychange`, và retry
  backoff 2s/4s/8s… trần 60s
- **Xung đột:** last-write-wins, nhưng ghi audit log kèm `device_id` và
  `client_timestamp`
- **Chỉ báo:** một chấm xám nhỏ khi outbox chưa rỗng. Cấm banner đỏ
  "mất kết nối" — làm người dùng hoảng
- **Test bắt buộc:** retry, idempotency, mất mạng giữa chừng

Sync engine viết tách riêng trong `src/lib/sync/`.

---

## Deploy

- Vercel region `sin1`, cấu hình trong `vercel.json`
- Neon region Singapore, bật connection pooling
- Ba môi trường: production (main) / preview (mỗi PR) / local
- Migration chạy trong GitHub Actions **trước** khi deploy, không chạy lúc
  app khởi động
- Backup: GitHub Action chạy `pg_dump` hằng đêm, đẩy file mã hoá lên
  object storage. Đừng tin hoàn toàn vào free tier
- Tên miền riêng ngay từ đầu (~300k/năm)

Không cần Docker cho hướng Next.js.

---

## Cấu hình theo studio

**Quy tắc phân biệt:**
- **Tham số** (giá trị) → được vào settings
- **Hành vi** (logic) → phải là code

Kiểm tra nhanh: nếu file settings xuất hiện `if`, `when`, `>`, hay một chuỗi
công thức → đã vượt ranh giới.

```ts
// src/config/studio-settings.ts
export const studioSettingsSchema = z.object({
  version: z.literal(1),
  studentNoun: z.enum(['bé','học viên','võ sinh','bạn nhỏ']).default('bé'),
  creditPolicy: z.enum([
    'per_session',   // thẻ theo buổi — nhảy, bơi
    'monthly',       // gói tháng — yoga, gym
    'fixed_course',  // khoá N tuần — võ, tiếng Anh
    'hourly',        // theo giờ 1-1 — gia sư
  ]).default('per_session'),
  lowCreditThreshold: z.number().int().min(0).max(20).default(3),
  expiryWarningDays: z.number().int().min(0).max(60).default(7),
  messageTemplate: z.string().max(1000),
})
```

Ba chi tiết: **enum không phải string tự do** (giới hạn số nhánh),
**`version`** (đổi cấu trúc sau này không vỡ dữ liệu cũ), **default cho mọi
trường** (studio mới với `{}` vẫn chạy).

### Năm cái phanh

1. Settings chứa giá trị, không chứa logic
2. Mọi setting có default chạy được
3. **Một setting chỉ được vào schema khi có HAI studio thật khác nhau ở điểm
   đó.** Chưa đủ hai thì hardcode
4. Tối đa ~10 settings. Vượt quá là dấu hiệu đang làm cho người không tồn tại
5. Không bao giờ `if (studioId === 'pato')`

Quy tắc 3 là quan trọng nhất vì nó kiểm chứng được.

---

## Ghi quyết định

Mọi quyết định kỹ thuật đáng kể ghi thành một ADR trong `docs/adr/`.
Mẫu ở 08-nhat-ky.md.

Ba tháng nữa bạn sẽ không nhớ vì sao chọn Dexie thay vì localStorage. ADR
là thứ trả lời giùm.
