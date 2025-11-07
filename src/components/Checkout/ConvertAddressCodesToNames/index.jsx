import { getProvinces, getDistricts, getWards } from "vietnam-provinces";

// Hàm quy đổi mã số thành tên địa chỉ
export const convertAddressCodesToNames = (address) => {
  try {
    console.log("convertAddressCodesToNames", address);
    // Lấy danh sách tỉnh/thành phố
    const provinces = getProvinces();
    const districts = getDistricts(address.province);
    const wards = getWards(address.district);

    // Tìm tên tỉnh/thành phố
    const provinceObj = provinces.find((p) => p.code === address.province);
    const provinceName = provinceObj ? provinceObj.name : address.province;

    // Tìm tên quận/huyện
    const districtObj = districts.find((d) => d.code === address.district);
    const districtName = districtObj ? districtObj.name : address.district;

    // Tìm tên phường/xã
    const wardObj = wards.find((w) => w.code === address.ward);
    const wardName = wardObj ? wardObj.name : address.ward;

    return {
      ...address,
      provinceName,
      districtName,
      wardName,
      // Tạo chuỗi địa chỉ đầy đủ
      fullAddress: `${address.street_address}, ${wardName}, ${districtName}, ${provinceName}`,
    };
  } catch (error) {
    console.error("Error converting address codes:", error);
    return {
      ...address,
      provinceName: address.province,
      districtName: address.district,
      wardName: address.ward,
      fullAddress: `${address.street_address}, ${address.ward}, ${address.district}, ${address.province}`,
    };
  }
};

// Hàm quy đổi toàn bộ mảng addresses
export const convertAllAddressesToNames = (addresses) => {
  return addresses?.map((address) => convertAddressCodesToNames(address));
};
