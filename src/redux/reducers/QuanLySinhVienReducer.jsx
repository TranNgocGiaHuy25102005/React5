import { THEM_SINH_VIEN, XOA_SINH_VIEN, CHI_TIET_SINH_VIEN, CAP_NHAT_SINH_VIEN, TIM_KIEM_SINH_VIEN } from '../types/QuanLySinhVienTypes';

const stateDefault = {
    mangSinhVien: [
        { maSV: '1', hoTen: 'Nguyễn Văn A', soDienThoai: '0938111111', email: 'nguyenvana@gmail.com' },
        { maSV: '2', hoTen: 'Nguyễn Văn B', soDienThoai: '0938222222', email: 'nguyenvanb@gmail.com' }
    ],
    sinhVienSua: {
        maSV: '', hoTen: '', soDienThoai: '', email: ''
    },
    searchKey: ''
}

export const QuanLySinhVienReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case THEM_SINH_VIEN: {
            let mangSVUpdate = [...state.mangSinhVien];
            let index = mangSVUpdate.findIndex(sv => sv.maSV === action.sinhVien.maSV);
            if (index !== -1) {
                alert('Mã sinh viên đã tồn tại!');
                return { ...state };
            }
            mangSVUpdate.push(action.sinhVien);
            state.mangSinhVien = mangSVUpdate;
            return { ...state };
        }
        case XOA_SINH_VIEN: {
            let mangSVUpdate = state.mangSinhVien.filter(sv => sv.maSV !== action.maSV);
            state.mangSinhVien = mangSVUpdate;
            return { ...state };
        }
        case CHI_TIET_SINH_VIEN: {
            state.sinhVienSua = action.sinhVien;
            return { ...state };
        }
        case CAP_NHAT_SINH_VIEN: {
            let mangSVUpdate = [...state.mangSinhVien];
            let index = mangSVUpdate.findIndex(sv => sv.maSV === action.sinhVien.maSV);
            if (index !== -1) {
                mangSVUpdate[index] = action.sinhVien;
            }
            state.mangSinhVien = mangSVUpdate;
            state.sinhVienSua = { maSV: '', hoTen: '', soDienThoai: '', email: '' };
            return { ...state };
        }
        case TIM_KIEM_SINH_VIEN: {
            state.searchKey = action.keyword;
            return { ...state };
        }
        default: return { ...state }
    }
}