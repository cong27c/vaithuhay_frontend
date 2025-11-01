import voucherService from "@/Services/voucherAdminService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  // CREATE Voucher
  const createVoucher = async (voucherData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await voucherService.createVoucher(voucherData);
      toast.success("Tạo voucher thành công");
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Lỗi khi tạo voucher";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // GET ALL Vouchers
  const fetchVouchers = async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const result = await voucherService.getAllVouchers(params);
      setVouchers(result.vouchers || []);
      setPagination(result.pagination || {});
      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Lỗi khi tải danh sách voucher";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // GET Voucher by ID
  const getVoucher = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const result = await voucherService.getVoucherById(id);
      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Lỗi khi tải thông tin voucher";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // UPDATE Voucher
  const updateVoucher = async (id, voucherData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await voucherService.updateVoucher(id, voucherData);
      toast.success("Cập nhật voucher thành công");
      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Lỗi khi cập nhật voucher";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // DELETE Voucher
  const deleteVoucher = async (id) => {
    setLoading(true);
    setError(null);

    try {
      console.log(deleteVoucher, "id");
      const result = await voucherService.deleteVoucher(id);
      setVouchers((prev) => prev.filter((voucher) => voucher.id !== id));
      toast.success("Xóa voucher thành công");
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Lỗi khi xóa voucher";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // UPDATE Voucher Status
  const updateStatus = async (id, status) => {
    setLoading(true);
    setError(null);

    try {
      const result = await voucherService.updateVoucherStatus(id, status);

      // Update local state
      setVouchers((prev) =>
        prev.map((voucher) =>
          voucher.id === id ? { ...voucher, status } : voucher,
        ),
      );

      toast.success("Cập nhật trạng thái thành công");
      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Lỗi khi cập nhật trạng thái";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // VALIDATE Voucher
  const validateVoucher = async (code, userId, orderData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await voucherService.validateVoucher(
        code,
        userId,
        orderData,
      );
      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Voucher không hợp lệ";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  return {
    vouchers,
    loading,
    error,
    pagination,
    createVoucher,
    fetchVouchers,
    getVoucher,
    updateVoucher,
    deleteVoucher,
    updateStatus,
    validateVoucher,
    clearError,
  };
};

export default useVoucher;
