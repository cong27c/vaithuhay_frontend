Prompt: Thiết kế giao diện Admin (React + SCSS + Modular Architecture)

Mục tiêu:
Thiết kế giao diện quản trị (Admin Dashboard) hiện đại, màu chủ đạo vàng – đen, có bố cục rõ ràng, dễ mở rộng, dùng cho hệ thống quản lý bán hàng.

src/
├── layouts/
│ └── AdminLayout/
│ ├── index.jsx
│ ├── Sidebar.jsx
│ ├── Header.jsx
│ └── AdminLayout.module.scss
│
├── pages/
│ └── Admin/
│ ├── Dashboard/
│ │ ├── index.jsx
│ │ └── Dashboard.module.scss
│ ├── Users/
│ │ ├── index.jsx
│ │ └── Users.module.scss
│ ├── Products/
│ │ ├── index.jsx
│ │ └── Products.module.scss
│ ├── Orders/
│ │ ├── index.jsx
│ │ └── Orders.module.scss
│ ├── Vouchers/
│ │ ├── index.jsx
│ │ └── Vouchers.module.scss
│ ├── Payments/
│ │ ├── index.jsx
│ │ └── Payments.module.scss
│ ├── Reviews/
│ │ ├── index.jsx
│ │ └── Reviews.module.scss
│ └── Analytics/
│ ├── index.jsx
│ └── Analytics.module.scss
│
├── components/
│ └── Admin/
│ └── ui/
│ ├── Button.jsx
│ ├── Card.jsx
│ ├── Input.jsx
│ ├── Dropdown.jsx
│ └── Modal.jsx
│
└── routes/
└── config.js

// src/routes/config.js
export const config = {
routes: {
admin: "/admin",
},
adminRoutes: {
dashboard: "/admin",
users: "/admin/users",
products: "/admin/products",
orders: "/admin/orders",
vouchers: "/admin/vouchers",
payments: "/admin/payments",
reviews: "/admin/reviews",
analytics: "/admin/analytics",
},
};

// Example Route
{
path: config.routes.admin,
component: Admin,
layout: AdminLayout,
children: [
{ path: config.adminRoutes.dashboard, component: Dashboard },
{ path: config.adminRoutes.users, component: Users },
{ path: config.adminRoutes.products, component: Products },
{ path: config.adminRoutes.orders, component: Orders },
{ path: config.adminRoutes.vouchers, component: Vouchers },
{ path: config.adminRoutes.payments, component: Payments },
{ path: config.adminRoutes.reviews, component: Reviews },
{ path: config.adminRoutes.analytics, component: Analytics },
],
}

🧱 Yêu cầu UI tổng thể

AdminLayout:

Dùng <Outlet /> để render các page con.

Chia bố cục:

Sidebar trái: menu điều hướng có icon (Dashboard, Users, Products, Orders, Vouchers, Payments, Reviews, Analytics)

Header trên: gồm:

Ô tìm kiếm

Icon chuông (thông báo)

Avatar admin + menu dropdown

Nút toggle Dark/Light mode

Responsive: ẩn Sidebar khi mobile, hiện menu toggle.

📊 Dashboard Page

4–5 thẻ thống kê (Card): Doanh thu, Đơn hàng, Người dùng mới, Tồn kho, Lượt truy cập

Line chart: doanh thu theo tháng

Pie chart: tỷ lệ đơn hàng theo trạng thái

Bảng “Top sản phẩm bán chạy”

🧍 Các trang module khác (Users, Products, Orders, Vouchers, Payments, Reviews, Analytics)

Bảng dữ liệu (table)

Thanh tìm kiếm + filter

Nút Add / Edit / Delete / Export Excel

Modal CRUD (tạo, sửa, xem chi tiết)

Layout đồng nhất với Dashboard

Pagination ở cuối bảng

Animation nhẹ khi hover, mở modal, chuyển tab

🎨 Style hướng dẫn

Tone màu chủ đạo: vàng (#FFD700), đen (#121212), xám (#2A2A2A)

Font: Inter / Roboto / Poppins

Layout: sử dụng Grid & Flexbox

SCSS: module hóa từng page (VD: Dashboard.module.scss)

Hiệu ứng: hover card mờ, sidebar mở trượt mượt, modal fade-in

Card & Button: góc bo tròn lớn (border-radius: 16px), shadow nhẹ

Theme: Dark mode là mặc định, có thể toggle sang Light mode

✅ Tóm tắt đầu ra mong muốn
Tạo bộ giao diện Admin hoàn chỉnh với layout chuẩn, có sidebar, header, dashboard, và các trang con CRUD đầy đủ — code React (JSX + module.scss), có component UI tái sử dụng, màu vàng – đen, phong cách modern, minimal, clean, responsive.

💡 Yêu cầu thêm
Có thể dùng thư viện:
Recharts cho biểu đồ
Lucide-react hoặc react-icons cho icon
Framer Motion cho animation
UI thống nhất, dễ tái sử dụng (Button, Card, Input, Dropdown, Modal)
Tối ưu cho màn hình desktop và tablet
