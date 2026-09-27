import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XOA_SINH_VIEN, CHI_TIET_SINH_VIEN, TIM_KIEM_SINH_VIEN } from '../../redux/types/QuanLySinhVienTypes';

export default function TableSinhVien() {
    const { mangSinhVien, searchKey } = useSelector(state => state.QuanLySinhVienReducer);
    const dispatch = useDispatch();

    let mangSinhVienRender = mangSinhVien.filter(sv => {
        return sv.hoTen.toLowerCase().trim().includes(searchKey.toLowerCase().trim());
    });

    return (
        <div>
            <div className="form-group mb-3 w-50">
                <input 
                    type="text" className="form-control" placeholder="Tìm kiếm theo họ tên..." 
                    onChange={(e) => {
                        dispatch({ type: TIM_KIEM_SINH_VIEN, keyword: e.target.value })
                    }}
                />
            </div>
            
            <table className="table table-bordered">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {mangSinhVienRender.map((sv, index) => {
                        return (
                            <tr key={index}>
                                <td>{sv.maSV}</td>
                                <td>{sv.hoTen}</td>
                                <td>{sv.soDienThoai}</td>
                                <td>{sv.email}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary mr-2"
                                        onClick={() => dispatch({ type: CHI_TIET_SINH_VIEN, sinhVien: sv })}
                                    >Sửa</button>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => dispatch({ type: XOA_SINH_VIEN, maSV: sv.maSV })}
                                    >Xóa</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}