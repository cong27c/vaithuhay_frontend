export const userSchema = {
  first_name: {
    required: "Họ là bắt buộc",
    minLength: {
      value: 2,
      message: "Họ phải có ít nhất 2 ký tự",
    },
  },

  last_name: {
    required: "Tên là bắt buộc",
    minLength: {
      value: 2,
      message: "Tên phải có ít nhất 2 ký tự",
    },
  },

  username: {
    required: "Username là bắt buộc",
    minLength: {
      value: 3,
      message: "Username phải có ít nhất 3 ký tự",
    },
  },

  email: {
    required: "Email là bắt buộc",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Email không hợp lệ",
    },
  },

  phone: {
    pattern: {
      value: /^[0-9]{10,11}$/,
      message: "Số điện thoại không hợp lệ",
    },
  },

  password: {
    required: "Mật khẩu là bắt buộc",
    minLength: {
      value: 8,
      message: "Mật khẩu phải có ít nhất 8 ký tự",
    },
  },

  role: {
    required: "Vai trò là bắt buộc",
  },

  status: {
    required: "Trạng thái là bắt buộc",
  },
};
