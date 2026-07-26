import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  components: {
    schemas: {
      ErrorResponse: {
        properties: {
          errors: {
            items: {
              properties: {
                field: { type: "string" },
                message: { type: "string" },
              },
              type: "object",
            },
            type: "array",
          },
          message: { type: "string" },
        },
        type: "object",
      },
      SignupInput: {
        properties: {
          email: {
            example: "nguyenvana@example.com",
            format: "email",
            type: "string",
          },
          name: {
            description:
              "Họ và tên (2-100 ký tự, chỉ chứa chữ cái, dấu nháy, gạch nối, khoảng trắng)",
            example: "Nguyễn Văn A",
            type: "string",
          },
          password: {
            description:
              "Mật khẩu (8-64 ký tự, gồm chữ hoa, chữ thường, số, ký tự đặc biệt, không khoảng trắng)",
            example: "Abc@1234",
            format: "password",
            type: "string",
          },
        },
        required: ["name", "email", "password"],
        type: "object",
      },
      SignupResponse: {
        properties: {
          message: {
            example: "Đăng ký thành công. Vui lòng kiểm tra email để xác thực.",
            type: "string",
          },
          user: {
            properties: {
              _id: { example: "665a1b2c3d4e5f6a7b8c9d0e", type: "string" },
              createdAt: { format: "date-time", type: "string" },
              email: { example: "nguyenvana@example.com", type: "string" },
              isVerified: { example: false, type: "boolean" },
              lastLogin: { format: "date-time", type: "string" },
              name: { example: "Nguyễn Văn A", type: "string" },
              updatedAt: { format: "date-time", type: "string" },
            },
            type: "object",
          },
        },
        type: "object",
      },
    },
  },
  info: {
    description: "API xác thực người dùng nâng cao với MERN Stack",
    title: "MERN Advanced Auth System API",
    version: "1.0.0",
  },
  openapi: "3.0.0",
  servers: [
    {
      description: "Development server",
      url: "http://localhost:5000",
    },
  ],
  tags: [
    {
      description: "Xác thực người dùng",
      name: "Auth",
    },
  ],
};

const options = {
  apis: ["./src/routes/*.js"],
  swaggerDefinition,
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
