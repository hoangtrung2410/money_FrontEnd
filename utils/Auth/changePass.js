// this function is used to send OTP code typed by user

import { resetPassword } from "../../api/auth";

export const changePass = async (data) => {
    try {
        const response = await resetPassword(data);

        switch (response.statusCode) {
            case 400:
                // Bad request in body
                return { status: 'failed', message: 'Mật khẩu không đúng định dạng' };
            case 200:
                // success
                return { status: 'success', message: 'Đổi mật khẩu thành công' };
            case 500:
                // internal server error
                return { status: 'failed', message: 'Máy chủ đang bận, vui lòng thử lại sau!' };
            default:
                // null/500/300
                return { status: 'failed', message: 'Lỗi bất định!' };
        }
    } catch (error) {
        console.error(error, "(catch in function changePass)");
        return { status: 'failed', message: 'Lỗi kết nối!' };
    }
}