import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { THEM_SINH_VIEN, CAP_NHAT_SINH_VIEN } from '../../redux/types/QuanLySinhVienTypes';

export default function FormSinhVien() {
    const dispatch = useDispatch();
    const { sinhVienSua } = useSelector(state => state.QuanLySinhVienReducer);

    const [values, setValues] = useState({
        maSV: '', hoTen: '', soDienThoai: '', email: ''
    });

    const [errors, setErrors] = useState({
        maSV: '', hoTen: '', soDienThoai: '', email: ''
    });

    useEffect(() => {
        setValues(sinhVienSua);
    }, [sinhVienSua]);

    const handleChange = (e) => {
        let { name, value, type, pattern } = e.target;
        
        let newValues = { ...values, [name]: value };

        let errorMessage = '';
        if (value.trim() === '') {
            errorMessage = name + ' không được bỏ trống!';
        } else {
            if (type === 'email') {
                const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!regexEmail.test(value)) {
                    errorMessage = name + ' không đúng định dạng!';
                }
            }
            if (name === 'soDienThoai') {
                const regexNumber = /^[0-9]+$/;
                if (!regexNumber.test(value)) {
                    errorMessage = name + ' chỉ được chứa số!';
                }
            }
        }

        let newErrors = { ...errors, [name]: errorMessage };

        setValues(newValues);
        setErrors(newErrors);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let isValid = true;
        for (let key in errors) {
            if (errors[key] !== '') {
                isValid = false; break;
            }
        }
        for (let key in values) {
            if (values[key] === '') {
                isValid = false; break;
            }
        }

        if (!isValid) {
            alert('Dữ liệu không hợp lệ!');
            return;
        }

        if (sinhVienSua.maSV !== '') {
            dispatch({ type: CAP_NHAT_SINH_VIEN, sinhVien: values });
        } else {
            dispatch({ type: THEM_SINH_VIEN, sinhVien: values });
        }
        
        setValues({ maSV: '', hoTen: '', soDienThoai: '', email: '' });
    }

    return (
        <div className="card mb-5">
            <div className="card-header bg-dark text-white font-weight-bold">
                Thông tin sinh viên
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Mã SV</label>
                                <input 
                                    disabled={sinhVienSua.maSV !== ''}
                                    type="text" className="form-control" name="maSV" 
                                    value={values.maSV} onChange={handleChange} 
                                />
                                <span className="text-danger">{errors.maSV}</span>
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input 
                                    type="text" className="form-control" name="soDienThoai" 
                                    value={values.soDienThoai} onChange={handleChange} 
                                />
                                <span className="text-danger">{errors.soDienThoai}</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Họ tên</label>
                                <input 
                                    type="text" className="form-control" name="hoTen" 
                                    value={values.hoTen} onChange={handleChange} 
                                />
                                <span className="text-danger">{errors.hoTen}</span>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input 
                                    type="email" className="form-control" name="email" 
                                    value={values.email} onChange={handleChange} 
                                />
                                <span className="text-danger">{errors.email}</span>
                            </div>
                        </div>
                    </div>
                    {sinhVienSua.maSV === '' ? (
                        <button type="submit" className="btn btn-success">Thêm sinh viên</button>
                    ) : (
                        <button type="submit" className="btn btn-primary">Cập nhật</button>
                    )}
                </form>
            </div>
        </div>
    )
}