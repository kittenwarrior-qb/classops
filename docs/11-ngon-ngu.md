# 11 — Ngôn ngữ và i18n

> Nguyên tắc: **dựng hạ tầng i18n từ đầu, chỉ ship tiếng Việt.**
>
> Hạ tầng rẻ khi làm sớm, đắt khi gắn vào sau. Ship ngôn ngữ thứ hai thì
> tốn công liên tục mà chưa có người dùng cần.

---

## Quyết định

| Việc | Làm không |
|---|---|
| Không hardcode chuỗi, gom vào một file | **Có** |
| Hàm `t()` có kiểu, tự động bắt lỗi khi thiếu key | **Có** |
| Định dạng ngày/giờ/số theo chuẩn Việt | **Có** |
| Sắp xếp và tìm kiếm đúng tiếng Việt | **Có** |
| Dịch sang tiếng Anh | Chưa |
| Prefix locale trong URL (`/vi/`, `/en/`) | Chưa |
| Thư viện next-intl / react-i18next | Chưa cần |

Lợi ích lớn nhất ở giai đoạn này **không phải** đa ngôn ngữ, mà là giọng
văn nằm gọn một file — sửa một chỗ là cả app đổi giọng. Xem `05-thiet-ke.md`.

---

## Vì sao chưa dùng next-intl

Với một ngôn ngữ, next-intl kéo theo prefix locale trong URL, middleware
routing, và cấu hình build — phức tạp mà không đổi lấy gì.

Dùng từ điển TypeScript có kiểu: khoảng 30 dòng, không dependency, và cấu
trúc giống next-intl đủ để sau này chuyển sang mà không phải viết lại chuỗi.

**Điều kiện chuyển sang next-intl:** khi có người dùng thật cần ngôn ngữ
thứ hai. Không phải khi mình nghĩ là "sau này chắc cần".

---

## Cấu trúc

```
apps/web/src/i18n/
  vi.ts        từ điển — nguồn sự thật của mọi chuỗi
  index.ts     hàm t() có kiểu
  format.ts    ngày, giờ, số, tiền
  vietnamese.ts sắp xếp tên, tìm kiếm không dấu
```

### `vi.ts`

```ts
export const vi = {
  common: {
    save: 'Lưu',
    cancel: 'Bỏ qua',
    done: 'Xong rồi',
    retry: 'Thử lại',
  },
  attendance: {
    hint: 'Cả lớp đang có mặt. Chạm vào {noun} nghỉ.',
    save: 'Xong · {count} {noun} có mặt',
    absentReported: 'nghỉ hôm nay · đã báo',
    absentUnreported: 'nghỉ hôm nay',
    empty: 'Chưa có buổi nào',
  },
  credits: {
    lowWarning: 'còn {count} buổi nữa là hết thẻ',
    expiringSoon: 'hết hạn {date}',
    expired: 'đã hết hạn {date}',
  },
  sync: {
    pending: 'Đang gửi',
    failed: 'Chưa gửi được, đang thử lại',
  },
} as const
```

### `index.ts`

```ts
type Leaves<T> = T extends string
  ? ''
  : { [K in keyof T]: `${K & string}${Leaves<T[K]> extends '' ? '' : `.${Leaves<T[K]>}`}` }[keyof T]

export type MessageKey = Leaves<typeof vi>

export function t(
  key: MessageKey,
  vars?: Record<string, string | number>
): string {
  const raw = key.split('.').reduce<any>((o, k) => o?.[k], vi)
  if (typeof raw !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`Thiếu chuỗi: ${key}`)
    }
    return key
  }
  if (!vars) return raw
  return raw.replace(/\{(\w+)\}/g, (_, name) =>
    String(vars[name] ?? `{${name}}`)
  )
}
```

Kiểu `MessageKey` khiến gõ sai key là lỗi biên dịch, không phải lỗi lúc chạy.

### Quy tắc

- **Cấm chuỗi tiếng Việt hardcode trong component.** Thêm ESLint rule chặn
  ký tự có dấu trong JSX text
- Danh từ chỉ người học (`bé` / `học viên` / `võ sinh`) **luôn là biến
  `{noun}`**, lấy từ `settings.studentNoun`. Không bao giờ viết cứng
- Một chuỗi một key. Không ghép chuỗi bằng `+` để tạo câu

---

## Đặc thù tiếng Việt — phần quan trọng hơn i18n

### 1. Sắp xếp tên theo TÊN, không theo họ

Sổ điểm danh tiếng Việt sắp theo âm cuối. "Nguyễn Ý An" nằm ở vần A, không
phải vần N. Sắp theo họ là dấu hiệu rõ nhất của app do người không hiểu
tiếng Việt làm.

```ts
export function vietnameseNameKey(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 0) return ''
  const given = parts[parts.length - 1]
  return [given, ...parts.slice(0, -1)].join(' ')
}

export function sortByVietnameseName<T>(
  items: T[],
  getName: (item: T) => string
): T[] {
  const collator = new Intl.Collator('vi', { sensitivity: 'base' })
  return [...items].sort((a, b) =>
    collator.compare(vietnameseNameKey(getName(a)), vietnameseNameKey(getName(b)))
  )
}
```

### 2. Tìm kiếm không dấu

Người dùng gõ "hoc vien" phải ra "học viên". Bắt buộc, không phải tuỳ chọn.

**Bẫy kinh điển:** `normalize('NFD')` tách được hầu hết dấu nhưng **không
tách được `đ` → `d`**. Phải xử lý riêng, nếu không tìm "Dung" sẽ không ra
"Đung".

```ts
export function removeDiacritics(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}

export function matchesSearch(text: string, query: string): boolean {
  const n = (s: string) => removeDiacritics(s).toLowerCase().trim()
  return n(text).includes(n(query))
}
```

Nếu tìm kiếm phía server, cài `unaccent` trong Postgres và tạo index trên
`unaccent(lower(name))`.

### 3. Thứ trong tuần

`Intl.DateTimeFormat('vi-VN')` trả về "Thứ Hai". Giọng văn của app dùng
"thứ 2" — ngắn hơn, đúng cách người Việt viết tin nhắn. Tự map:

```ts
const WEEKDAYS = ['chủ nhật','thứ 2','thứ 3','thứ 4','thứ 5','thứ 6','thứ 7']
export const weekday = (d: Date) => WEEKDAYS[d.getDay()]
```

### 4. Ngày, giờ, tiền

- Ngày: `dd/mm/yyyy` — **không bao giờ** `mm/dd`
- Giờ: `18h30`, không phải `6:30 PM`
- Tiền: `3.000.000 ₫` — dấu chấm phân cách nghìn, dấu phẩy cho thập phân
- Lưu tiền bằng **integer VNĐ**, không dùng float

```ts
export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d)

export const formatMoney = (vnd: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(vnd)
```

### 5. Không có số nhiều

Tiếng Việt không biến đổi danh từ theo số: "1 học viên", "23 học viên".

Bỏ hẳn ICU plural rules. Đơn giản hơn tiếng Anh nhiều — nhưng nhớ điều này
nếu sau này thêm tiếng Anh, lúc đó mới cần.

### 6. Font và hiển thị dấu

**Be Vietnam Pro.** Phần lớn app Việt dùng Inter hoặc Roboto với dấu dựng
xấu — chọn đúng font đã là dấu ấn.

Kiểm tra bắt buộc ở mọi cỡ chữ: **Ẩ Ợ Ỹ Ễ Ằ Ự**. Chỗ hay lỗi nhất là trong
vòng tròn avatar, nơi `line-height` chặt làm dấu bị cắt mất phần trên.

Dữ liệu mẫu có sẵn `hv-029` với tên chứa toàn dấu khó để kiểm tra việc này.

### 7. Tên dài

Tên Việt đầy đủ có thể 5–6 âm tiết. Mọi bố cục phải chịu được.

Dữ liệu mẫu có `hv-028` với tên rất dài để kiểm tra.

---

## Danh sách kiểm tra

- [ ] Không có chuỗi tiếng Việt hardcode trong component
- [ ] ESLint chặn ký tự có dấu trong JSX text
- [ ] Danh từ chỉ người học luôn là biến `{noun}`
- [ ] Danh sách học viên sắp theo tên, không theo họ
- [ ] Tìm kiếm không dấu hoạt động, kể cả với `đ`
- [ ] Ngày hiển thị `dd/mm/yyyy`
- [ ] Giờ hiển thị `18h30`
- [ ] Thứ hiển thị `thứ 2`, không phải `Thứ Hai`
- [ ] Tiền lưu bằng integer, hiển thị `3.000.000 ₫`
- [ ] Dấu Ẩ Ợ Ỹ Ễ Ằ Ự không bị cắt ở mọi cỡ chữ
- [ ] Tên 6 âm tiết không vỡ bố cục
- [ ] `<html lang="vi">`

---

## Khi nào thêm ngôn ngữ thứ hai

Chỉ khi **có người dùng thật yêu cầu**. Không phải khi mình đoán là sẽ cần.

Lúc đó việc phải làm:
1. Tạo `en.ts` theo đúng cấu trúc `vi.ts` (kiểu `MessageKey` sẽ bắt lỗi
   thiếu key)
2. Chuyển sang next-intl nếu cần prefix locale trong URL
3. Thêm plural rules — lúc này mới cần
4. Kiểm tra lại bố cục: tiếng Anh thường dài hơn tiếng Việt 15–20%

Vì hạ tầng đã dựng sẵn, bước 1 là việc dịch thuần tuý, không phải việc
refactor.
