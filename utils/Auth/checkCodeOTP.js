// this function is used to send OTP code typed by user

import { checkCode } from "../../api/auth";

export const checkCodeOTP = async (data) => {
    try {

        const response = await checkCode(data);
        switch (response.statusCode) {
            case 400:
                // Bad request in body
                return { status: 'failed', message: 'Code không chính xác' };
            case 200:
                // success
                return { status: 'success', message: 'Xác thực thành công' };
            case 500:
                // internal server error
                return { status: 'failed', message: 'Máy chủ đang bận, vui lòng thử lại sau!' };
            default:
                // null/500/300
                return { status: 'failed', message: 'Lỗi bất định!' };
        }
    } catch (error) {
        console.error(error, "(catch in function checkCodeOTP)");
        return { status: 'failed', message: 'Lỗi kết nối!' };
    }
}