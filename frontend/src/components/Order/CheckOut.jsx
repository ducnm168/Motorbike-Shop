import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../contexts/OrderContext';
import axios from 'axios';

function CheckoutPage() {
    const { order, setOrder } = useContext(OrderContext);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setOrder(prev => ({
            ...prev,
            thongTinNguoiMua: {
                ...prev.thongTinNguoiMua,
                [name]: value
            },
        }));
        // console.log(order)
    };

    const handlePaymentChange = (e) => {
        const { value } = e.target;

        setOrder(prev => ({
            ...prev,
            thanhToan: {
                ...prev.thanhToan,
                hinhThuc: value
            }
        }));
    };


    const handleSubmit = async () => {
        try {
            const updatedOrder = {
                ...order,
                trangThai: order.thanhToan.hinhThuc === 'Chuyển khoản ngân hàng' ? 'Chờ thanh toán' : 'Chờ xử lý'
            }
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/order/checkout`, updatedOrder);
            alert('Đặt hàng thành công!');
            navigate('/account/orders/motorcycle')
            localStorage.removeItem('order');
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            alert('Đặt hàng thất bại!');
        }
    };

    return (
        <div className="relative font-vietnam z-10 min-h-screen overflow-hidden m-auto pt-36 pb-20 w-1/3">
            <h2 className='text-center uppercase text-[#de0000]'>Xác nhận đơn hàng</h2>
            <div className='py-3'>
                <h4 className=''>1. Thông tin xe</h4>
                <div className='flex'>
                    <div className="w-56">
                        <img className='w-full' src={`${process.env.REACT_APP_API_BASE_URL.replace('/api/v1', '')}/uploads/${order.imgXe}`} alt="" />
                    </div>
                    <div className="pl-6">
                        <p className='font-semibold'>{order.tenSanPham}</p>
                        <p>Phiên bản: <span className='font-semibold'>{order.phienBan}</span></p>
                        <p>Màu sắc: <span className='font-semibold'>{order.mauSac}</span></p>
                        <p className='text-[#de0000]'>Giá: <span className='font-semibold'>{order.tongTien.toLocaleString('vi-VN')} đ</span></p>
                    </div>
                </div>
            </div>
            <div className='py-3'>
                <h4 className=''>2. Thông tin người nhận</h4>
                <div className='flex w-full'>
                    <label className='min-w-36'>Họ và tên: </label>
                    <input
                        type="text"
                        name='hoTen'
                        value={order.thongTinNguoiMua.hoTen}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full mb-2 max-w-xs"
                    />
                </div>
                <div className='flex w-full'>
                    <label className='min-w-36'>Số điện thoại: </label>
                    <input
                        type="text"
                        name='soDienThoai'
                        value={order.thongTinNguoiMua.soDienThoai}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full mb-2 max-w-xs"
                    />
                </div>
                <div className='flex w-full'>
                    <label className='min-w-36'>Địa chỉ: </label>
                    <input
                        type="text"
                        name='diaChi'
                        value={order.thongTinNguoiMua.diaChi}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full max-w-xs"
                    />
                </div>
            </div>
            <div className='py-3'>
                <h4 className=''>3. Hình thức thanh toán</h4>
                <div className="py-1">
                    <input
                        type="radio"
                        id="COD"
                        name="payment-method"
                        value="COD"
                        checked={order.thanhToan.hinhThuc === 'COD'}
                        onChange={handlePaymentChange}
                    />
                    <label className='pl-2' htmlFor="COD">Thanh toán khi nhận hàng</label>
                </div>
                <div className="py-1">
                    <input
                        type="radio"
                        id="Chuyển khoản ngân hàng"
                        name="payment-method"
                        value="Chuyển khoản ngân hàng"
                        checked={order.thanhToan.hinhThuc === 'Chuyển khoản ngân hàng'}
                        onChange={handlePaymentChange}
                    />
                    <label className='pl-2' htmlFor="Chuyển khoản ngân hàng">Chuyển khoản ngân hàng</label>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button onClick={handleSubmit} className="px-4 py-2 bg-[#de0000] text-white rounded-sm">Xác nhận</button>
            </div>
        </div>
    );
}

export default CheckoutPage;
