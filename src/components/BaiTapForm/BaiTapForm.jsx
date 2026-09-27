import React from 'react'
import FormSinhVien from './FormSinhVien'
import TableSinhVien from './TableSinhVien'

export default function BaiTapForm() {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">React Form - Validation</h2>
            <FormSinhVien />
            <TableSinhVien />
        </div>
    )
}