# ADR-0009: Chuyển từ Next.js sang Vite + NestJS

**Ngày:** 2026-07-23
**Trạng thái:** Đã chấp nhận

## Bối cảnh

Bản prototype dùng Next.js App Router nhưng sản phẩm là công cụ nội bộ, không
cần SSR hay SEO. Người dùng cần hệ thống dễ kiểm thử, backend có boundary rõ,
và có thể vận hành độc lập với frontend.

## Các lựa chọn đã cân nhắc

1. Giữ Next.js fullstack.
2. Vite + React ở frontend, NestJS REST ở backend.
3. Vite + React và một Express API tự tổ chức.

## Quyết định

Chọn Vite + React + TypeScript cho frontend và NestJS + REST/OpenAPI cho
backend. Dùng pnpm workspace, Prisma và PostgreSQL.

## Lý do

- Vite phù hợp SPA nội bộ và không kéo theo runtime server cho frontend.
- NestJS cung cấp module, dependency injection, guard, validation và test
  boundary rõ ràng.
- REST/OpenAPI dễ kiểm tra và bàn giao hơn khi frontend/backend tách riêng.
- PostgreSQL không bị gắn chặt vào một nền tảng frontend.

## Đánh đổi chấp nhận

- Có hai app và hai pipeline deploy.
- Cần quản lý API contract và auth boundary rõ hơn.
- Không có SSR nếu sau này sản phẩm cần SEO.

## Điều kiện xem lại

Chỉ xem lại nếu xuất hiện nhu cầu public SEO, server-rendered content, hoặc
frontend/backend tách riêng tạo ra chi phí vận hành lớn hơn giá trị nhận được.
