import * as httpRequest from "@/utils/httpRequest";

const voucherService = {
  // CREATE - Tạo voucher mới
  async createVoucher(data) {
    const response = await httpRequest.post("/vouchers", data);
    return response.data;
  },

  // READ - Lấy danh sách vouchers với phân trang
  async getAllVouchers(params = {}) {
    const response = await httpRequest.get("/vouchers", { params });
    return response.data;
  },

  // READ - Lấy voucher theo ID
  async getVoucherById(id) {
    const response = await httpRequest.get(`/vouchers/${id}`);
    return response.data;
  },

  // READ - Lấy voucher theo mã
  async getVoucherByCode(code) {
    const response = await httpRequest.get(`/vouchers/code/${code}`);
    return response.data;
  },

  // UPDATE - Cập nhật voucher
  async updateVoucher(id, data) {
    const response = await httpRequest.put(`/vouchers/${id}`, data);
    return response.data;
  },

  // DELETE - Xóa voucher
  async deleteVoucher(id) {
    const response = await httpRequest.delete(`/vouchers/${id}`);
    return response.data;
  },

  // UPDATE STATUS - Cập nhật trạng thái voucher
  async updateVoucherStatus(id, status) {
    const response = await httpRequest.patch(`/vouchers/${id}/status`, {
      status,
    });
    return response.data;
  },

  // VALIDATE - Validate voucher cho checkout
  async validateVoucher(code, userId, orderData) {
    const response = await httpRequest.post(`/vouchers/validate/${code}`, {
      user_id: userId,
      order_data: orderData,
    });
    return response.data;
  },

  // VOUCHER CONDITIONS - Quản lý điều kiện

  // Thêm điều kiện cho voucher
  async createCondition(voucherId, conditionData) {
    const response = await httpRequest.post(
      `/vouchers/${voucherId}/conditions`,
      conditionData,
    );
    return response.data;
  },

  // Lấy danh sách điều kiện của voucher
  async getVoucherConditions(voucherId) {
    const response = await httpRequest.get(`/vouchers/${voucherId}/conditions`);
    return response.data;
  },

  // Cập nhật điều kiện
  async updateCondition(conditionId, conditionData) {
    const response = await httpRequest.put(
      `/vouchers/conditions/${conditionId}`,
      conditionData,
    );
    return response.data;
  },

  // Xóa điều kiện
  async deleteCondition(conditionId) {
    const response = await httpRequest.delete(
      `/vouchers/conditions/${conditionId}`,
    );
    return response.data;
  },

  // Bulk update conditions
  async bulkUpdateConditions(voucherId, conditions) {
    const response = await httpRequest.put(
      `/vouchers/${voucherId}/conditions/bulk`,
      { conditions },
    );
    return response.data;
  },
};

export default voucherService;
