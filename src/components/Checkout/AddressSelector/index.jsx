"use client";

import { useState, useEffect } from "react";
import { getProvinces, getDistricts, getWards } from "vietnam-provinces";
import styles from "./AddressSelector.module.scss";

export default function AddressSelector({ onAddressSelect, errors }) {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  // Lấy danh sách tỉnh/thành
  useEffect(() => {
    const provinces = getProvinces();
    setProvinceList(provinces);
  }, []);

  // Lấy danh sách quận/huyện khi tỉnh/thành thay đổi
  useEffect(() => {
    if (province) {
      const districts = getDistricts(province);
      setDistrictList(districts);
      setDistrict("");
      setWard("");
    } else {
      setDistrictList([]);
      setWardList([]);
    }
  }, [province]);

  // Lấy danh sách phường/xã khi quận/huyện thay đổi
  useEffect(() => {
    if (district) {
      const wards = getWards(district);
      setWardList(wards);
      setWard("");
    } else {
      setWardList([]);
    }
  }, [district]);

  // Gọi callback khi địa chỉ thay đổi
  useEffect(() => {
    if (onAddressSelect) {
      const selectedProvince = provinceList.find((p) => p.code === province);
      const selectedDistrict = districtList.find((d) => d.code === district);
      const selectedWard = wardList.find((w) => w.code === ward);

      onAddressSelect({
        province: province,
        district: district,
        ward: ward,
        provinceName: selectedProvince ? selectedProvince.name : "",
        districtName: selectedDistrict ? selectedDistrict.name : "",
        wardName: selectedWard ? selectedWard.name : "",
      });
    }
  }, [
    province,
    district,
    ward,
    provinceList,
    districtList,
    wardList,
    onAddressSelect,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.selectGroup}>
        <label className={styles.label}>Tỉnh / Thành</label>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className={`${styles.select} ${errors?.province ? styles.error : ""}`}
        >
          <option value="">Chọn tỉnh / thành</option>
          {provinceList.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
        {errors?.province && (
          <span className={styles.errorMessage}>{errors.province.message}</span>
        )}
      </div>

      <div className={styles.selectGroup}>
        <label className={styles.label}>Quận / Huyện</label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          disabled={!province}
          className={`${styles.select} ${errors?.district ? styles.error : ""}`}
        >
          <option value="">Chọn quận / huyện</option>
          {districtList.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
        {errors?.district && (
          <span className={styles.errorMessage}>{errors.district.message}</span>
        )}
      </div>

      <div className={styles.selectGroup}>
        <label className={styles.label}>Phường / Xã</label>
        <select
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          disabled={!district}
          className={`${styles.select} ${errors?.ward ? styles.error : ""}`}
        >
          <option value="">Chọn phường / xã</option>
          {wardList.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
        {errors?.ward && (
          <span className={styles.errorMessage}>{errors.ward.message}</span>
        )}
      </div>
    </div>
  );
}
