# ADR-0010: Xây trước khi qua cửa khám phá

- Trạng thái: chấp nhận có điều kiện
- Ngày: 2026-07-23

## Bối cảnh

GĐ0 chưa có đủ bằng chứng để biết điểm danh hay nhắc gia hạn là vấn đề trung
tâm. Người dùng vẫn yêu cầu tiếp tục xây để đẩy nhanh tiến độ.

## Quyết định

Tiếp tục triển khai các nền tảng và luồng Nhóm A với dữ liệu tối thiểu, nhưng
ghi rõ mọi phần chưa được xác nhận. Không mở rộng sang các mô hình dữ liệu bị
hoãn hoặc các tính năng Nhóm E.

## Hệ quả

Có thể tiết kiệm thời gian setup, nhưng nguy cơ xây sai nhu cầu vẫn còn. Việc
đưa app cho người dùng thật phải chờ khi điều kiện qua cửa GĐ0 được trả lời.
