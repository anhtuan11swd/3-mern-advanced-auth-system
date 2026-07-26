# MERN Advanced Auth System

[![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-ISC-blue)](LICENSE)

Hệ thống xác thực người dùng nâng cao được xây dựng trên **MERN Stack** (MongoDB, Express, React, Node.js) với đầy đủ các tính năng bảo mật hiện đại: đăng ký, đăng nhập, xác thực email qua OTP, quên/đặt lại mật khẩu và quản lý phiên bằng JWT.

---

## Mục lục

- [Tổng quan](#tổng-quan)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt](#cài-đặt)
- [Cấu hình môi trường](#cấu-hình-môi-trường)
- [Sử dụng](#sử-dụng)
- [API Endpoints](#api-endpoints)
- [Kiểm thử](#kiểm-thử)
- [Đóng góp](#đóng-góp)
- [Giấy phép](#giấy-phép)
- [Tác giả](#tác-giả)

---

## Tổng quan

**MERN Advanced Auth System** là một giải pháp xác thực toàn diện dành cho các ứng dụng web hiện đại. Dự án cung cấp một luồng xác thực hoàn chỉnh bao gồm đăng ký với xác thực email qua OTP, đăng nhập an toàn với JWT (HTTP-only cookie), quên/đặt lại mật khẩu qua email, và các biện pháp bảo vệ route phía client.

Dự án được thiết kế với:

- **Backend**: RESTful API với Express 5, Mongoose ODM, xác thực JWT, validation đầu vào bằng Zod, tài liệu API tự động với Swagger.
- **Frontend**: React 19 với Vite, state management bằng Zustand, UI với Tailwind CSS v4 và Framer Motion, validation form đồng bộ client-server.
- **Email**: Tích hợp Mailtrap để gửi email xác thực và thông báo trong môi trường phát triển.

---

## Tính năng

### Xác thực & Bảo mật

- **Đăng ký tài khoản** — Tạo tài khoản mới với validation chặt chẽ (tên Unicode, mật khẩu mạnh).
- **Xác thực email bằng OTP** — Gửi mã 6 chữ số qua email, mã có hiệu lực trong 10 phút.
- **Đăng nhập** — Xác thực bằng email & mật khẩu, yêu cầu tài khoản đã xác thực.
- **Đăng xuất** — Xóa HTTP-only cookie JWT.
- **Quên mật khẩu** — Gửi link đặt lại mật khẩu qua email (token có hiệu lực 1 giờ).
- **Đặt lại mật khẩu** — Đặt mật khẩu mới bằng token an toàn.
- **Kiểm tra phiên** — API kiểm tra token và trả về thông tin người dùng hiện tại.

### Giao diện người dùng

- **Form đăng ký** với kiểm tra độ mạnh mật khẩu real-time.
- **Form đăng nhập** với liên kết quên mật khẩu.
- **Xác thực email** với OTP 6 ô, hỗ trợ paste, auto-submit.
- **Dashboard** hiển thị thông tin người dùng (email, ngày tham gia, lần đăng nhập cuối, trạng thái).
- **Protected routes** — Tự động chuyển hướng nếu chưa đăng nhập hoặc chưa xác thực email.
- **RedirectAuthenticatedUser** — Chuyển hướng người dùng đã xác thực tránh truy cập lại trang auth.
- **Giao diện tối (dark theme)** với background blur, hiệu ứng floating shapes và animation mượt mà.

### Validation

- **Đồng bộ client-server** — Cùng bộ luật validation (Zod) chạy ở cả frontend và backend.
- **Tên**: 2-100 ký tự, hỗ trợ Unicode (tiếng Việt, dấu nháy, gạch nối).
- **Mật khẩu**: 8-64 ký tự, yêu cầu chữ hoa, chữ thường, số, ký tự đặc biệt, không khoảng trắng.

---

## Công nghệ sử dụng

### Backend

| Công nghệ                                                   | Mục đích                      |
| ----------------------------------------------------------- | ----------------------------- |
| [Node.js](https://nodejs.org)                               | Runtime JavaScript            |
| [Express 5](https://expressjs.com)                          | Web framework                 |
| [MongoDB Atlas](https://www.mongodb.com)                    | Cơ sở dữ liệu NoSQL           |
| [Mongoose 9](https://mongoosejs.com)                        | ODM cho MongoDB               |
| [JWT](https://jwt.io)                                       | Xác thực token                |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js)            | Mã hóa mật khẩu               |
| [Zod](https://zod.dev)                                      | Validation dữ liệu            |
| [Mailtrap](https://mailtrap.io)                             | Gửi email thử nghiệm          |
| [Swagger](https://swagger.io)                               | Tài liệu API tự động          |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | Xử lý cookie                  |
| [cors](https://github.com/expressjs/cors)                   | Cross-Origin Resource Sharing |

### Frontend

| Công nghệ                                      | Mục đích          |
| ---------------------------------------------- | ----------------- |
| [React 19](https://react.dev)                  | UI library        |
| [Vite 8](https://vite.dev)                     | Build tool        |
| [Tailwind CSS v4](https://tailwindcss.com)     | Utility-first CSS |
| [Framer Motion](https://motion.dev)            | Animation         |
| [Zustand](https://github.com/pmndrs/zustand)   | State management  |
| [React Router v7](https://reactrouter.com)     | Điều hướng        |
| [Axios](https://axios-http.com)                | HTTP client       |
| [React Hot Toast](https://react-hot-toast.com) | Thông báo         |
| [Lucide React](https://lucide.dev)             | Icon              |
| [Zod](https://zod.dev)                         | Validation form   |

### DevOps & Tooling

| Công nghệ                                                | Mục đích               |
| -------------------------------------------------------- | ---------------------- |
| [Biome](https://biomejs.dev)                             | Format & lint          |
| [ESLint](https://eslint.org)                             | Linting                |
| [Nodemon](https://nodemon.io)                            | Tự động restart server |
| [kill-port](https://github.com/tiaanduplessis/kill-port) | Giải phóng cổng        |

---

## Cấu trúc dự án

```
3-mern-advanced-auth-system/
├── backend/
│   ├── mailtrap/                    # Email templates & gửi email
│   │   ├── email.js                 # Hàm gửi email (xác thực, chào mừng, reset password)
│   │   └── emailTemplates.js        # Template HTML cho email
│   └── src/
│       ├── config/
│       │   ├── db.js                # Kết nối MongoDB
│       │   ├── mailtrap.config.js   # Cấu hình Mailtrap client
│       │   └── swagger.js           # Cấu hình Swagger/OpenAPI
│       ├── controllers/
│       │   └── auth.controller.js   # Xử lý logic xác thực
│       ├── middleware/
│       │   ├── validate.js          # Middleware validation với Zod
│       │   └── verifyToken.js       # Middleware xác thực JWT
│       ├── models/
│       │   └── user.model.js        # Mongoose User Schema
│       ├── routes/
│       │   └── auth.route.js        # Định tuyến auth + Swagger docs
│       ├── utils/
│       │   ├── generateTokenAndSetCookie.js  # JWT token + cookie
│       │   └── generateVerificationCode.js   # Sinh mã OTP 6 số
│       ├── validators/
│       │   └── auth.validator.js   # Zod schemas cho auth
│       └── server.js               # Entry point
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   └── src/
│       ├── assets/                 # Ảnh tĩnh
│       ├── components/
│       │   ├── FloatingShape.jsx    # Hiệu ứng nền động
│       │   ├── Input.jsx            # Input component có icon, toggle password
│       │   ├── LoadingSpinner.jsx   # Spinner loading
│       │   ├── PasswordStrengthMeter.jsx # Đo độ mạnh mật khẩu
│       │   ├── ProtectedRoute.jsx   # Route bảo vệ (yêu cầu đăng nhập + verified)
│       │   └── RedirectAuthenticatedUser.jsx # Chuyển hướng nếu đã đăng nhập
│       ├── lib/
│       │   ├── axios.js            # Axios instance (withCredentials)
│       │   └── validations.js      # Zod schemas client-side
│       ├── pages/
│       │   ├── DashboardPage.jsx    # Trang chính sau đăng nhập
│       │   ├── EmailVerificationPage.jsx # Trang xác thực OTP
│       │   ├── ForgotPasswordPage.jsx    # Trang quên mật khẩu
│       │   ├── LoginPage.jsx        # Trang đăng nhập
│       │   ├── ResetPasswordPage.jsx # Trang đặt lại mật khẩu
│       │   └── SignupPage.jsx       # Trang đăng ký
│       ├── store/
│       │   └── authStore.js        # Zustand store (auth state)
│       ├── App.jsx                 # Root component + routing
│       ├── index.css               # Tailwind CSS imports
│       └── main.jsx                # Entry point
├── package.json                    # Root scripts (build, start, dev)
└── README.md
```

---

## Yêu cầu hệ thống

- [Node.js](https://nodejs.org) **>= 18**
- [npm](https://www.npmjs.com) (đi kèm với Node.js)
- Tài khoản [MongoDB Atlas](https://www.mongodb.com/atlas) (hoặc MongoDB local)
- Tài khoản [Mailtrap](https://mailtrap.io) (để gửi email thử nghiệm)

---

## Cài đặt

### 1. Clone dự án

```bash
git clone https://github.com/<your-username>/3-mern-advanced-auth-system.git
cd 3-mern-advanced-auth-system
```

### 2. Cài đặt dependencies

Sử dụng script build ở root (cài cả backend và frontend):

```bash
npm run build
```

Hoặc cài thủ công từng phần:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` trong thư mục `backend/` (tham khảo `backend/.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://<db_user>:<db_password>@<host>/auth_db
JWT_SECRET=your_jwt_secret_key_here
MAILTRAP_TOKEN=your_mailtrap_api_token
MAILTRAP_ENDPOINT=https://send.api.mailtrap.io/
CLIENT_URL=http://localhost:5173
```

Tạo file `.env` trong thư mục `frontend/` (tham khảo `frontend/.env.example`):

```env
VITE_API_URL=http://localhost:5000/
```

### 4. Khởi động

**Chế độ phát triển:**

```bash
# Chạy backend (có nodemon, tự động restart)
npm run dev

# Riêng backend
cd backend && npm run dev

# Riêng frontend
cd frontend && npm run dev
```

**Production:**

```bash
npm run build   # Build frontend + cài dependencies
npm start       # Chạy server (phục vụ cả frontend từ backend)
```

---

## Cấu hình môi trường

### Backend (`backend/.env`)

| Biến                | Mô tả                 | Mặc định                        |
| ------------------- | --------------------- | ------------------------------- |
| `PORT`              | Cổng chạy server      | `5000`                          |
| `MONGO_URI`         | Chuỗi kết nối MongoDB | —                               |
| `JWT_SECRET`        | Khóa bí mật cho JWT   | —                               |
| `MAILTRAP_TOKEN`    | API token Mailtrap    | —                               |
| `MAILTRAP_ENDPOINT` | Endpoint Mailtrap API | `https://send.api.mailtrap.io/` |
| `CLIENT_URL`        | URL frontend (CORS)   | `http://localhost:5173`         |

### Frontend (`frontend/.env`)

| Biến           | Mô tả                    | Mặc định                 |
| -------------- | ------------------------ | ------------------------ |
| `VITE_API_URL` | Base URL của backend API | `http://localhost:5000/` |

### Email templates

Các email template HTML nằm trong `backend/mailtrap/emailTemplates.js`:

- **Xác thực email** — Gradient tím, mã OTP 6 số, hiệu lực 10 phút.
- **Chào mừng** — Gradient xanh lá, nút "Đăng nhập ngay".
- **Yêu cầu đặt lại mật khẩu** — Gradient hồng, nút "Đặt lại mật khẩu", hiệu lực 1 giờ.
- **Xác nhận đặt lại mật khẩu** — Gradient xanh lá, thông báo thành công.

---

## Sử dụng

### Luồng xác thực

1. **Đăng ký** → Điền email, tên, mật khẩu. Hệ thống kiểm tra validation, tạo tài khoản, gửi OTP qua email, tự động đăng nhập và chuyển đến trang xác thực.
2. **Xác thực email** → Nhập mã 6 số từ email (hoặc paste). Tự động submit khi đủ 6 số. Sau khi xác thực, nhận email chào mừng và chuyển đến Dashboard.
3. **Đăng nhập** → Yêu cầu tài khoản đã xác thực. JWT được lưu trong HTTP-only cookie.
4. **Quên mật khẩu** → Nhập email, nhận link đặt lại qua email.
5. **Đặt lại mật khẩu** → Nhập mật khẩu mới + xác nhận. Có thanh đo độ mạnh mật khẩu.

### Routes

| Đường dẫn                | Mô tả            | Yêu cầu                 |
| ------------------------ | ---------------- | ----------------------- |
| `/`                      | Dashboard        | Đã đăng nhập & verified |
| `/login`                 | Đăng nhập        | Chưa đăng nhập          |
| `/signup`                | Đăng ký          | Chưa đăng nhập          |
| `/verify-email`          | Xác thực OTP     | Chưa đăng nhập          |
| `/forgot-password`       | Quên mật khẩu    | Không yêu cầu           |
| `/reset-password/:token` | Đặt lại mật khẩu | Không yêu cầu           |

### Tài liệu API

Swagger UI có sẵn tại:

```
http://localhost:5000/api/v1/docs
```

---

## API Endpoints

Tất cả API được tiền tố với `/api/v1/auth`.

### `POST /api/v1/auth/signup`

Đăng ký tài khoản mới.

**Body:**

```json
{
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "password": "Abc@1234"
}
```

**Response (201):**

```json
{
  "message": "Đăng ký thành công. Vui lòng kiểm tra email để xác thực.",
  "user": {
    "_id": "...",
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "isVerified": false,
    "lastLogin": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### `POST /api/v1/auth/verify-email`

Xác thực email bằng mã OTP.

**Body:**

```json
{
  "code": "483217"
}
```

### `POST /api/v1/auth/login`

Đăng nhập.

**Body:**

```json
{
  "email": "nguyenvana@example.com",
  "password": "Abc@1234"
}
```

### `POST /api/v1/auth/logout`

Đăng xuất (xóa cookie).

### `POST /api/v1/auth/forgot-password`

Gửi email đặt lại mật khẩu.

**Body:**

```json
{
  "email": "nguyenvana@example.com"
}
```

### `POST /api/v1/auth/reset-password/:token`

Đặt lại mật khẩu bằng token.

**Body:**

```json
{
  "password": "NewPass@123"
}
```

### `GET /api/v1/auth/check-auth`

Kiểm tra phiên đăng nhập (yêu cầu JWT cookie).

### `GET /api/health`

Kiểm tra health server.

---

## Kiểm thử

Dự án chưa có test suite tự động. Bạn có thể kiểm thử thủ công bằng:

- **Swagger UI**: `http://localhost:5000/api/v1/docs`
- **Frontend**: Chạy giao diện và test toàn bộ luồng xác thực
- **Mailtrap Dashboard**: Xem email gửi đi tại https://mailtrap.io

### Chạy linter

```bash
# Backend
cd backend
npm run lint          # ESLint
npm run biome:check   # Biome check

# Frontend
cd frontend
npm run lint
npm run biome:check
```

---

## Đóng góp

Đóng góp luôn được chào đón! Vui lòng làm theo các bước:

1. Fork dự án
2. Tạo nhánh feature (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên nhánh (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

Vui lòng đảm bảo code pass linter (`npm run biome:check`) trước khi tạo PR.

---

## Giấy phép

Dự án được phân phối dưới giấy phép **ISC**. Xem file `LICENSE` để biết thêm chi tiết.

---

## Tác giả

**Trần Anh Tuấn**

- GitHub: [@anhtuan11swd](https://github.com/anhtuan11swd)

---

## Tài liệu tham khảo

- [Express 5 Documentation](https://expressjs.com/en/5x/api.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [React Documentation](https://react.dev)
- [Zod Documentation](https://zod.dev)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Mailtrap Documentation](https://docs.mailtrap.io)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)
