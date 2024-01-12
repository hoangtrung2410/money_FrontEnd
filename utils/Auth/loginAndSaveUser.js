// this function is used to login and save user in local storage
import { login } from "../../api/auth";

/*
    Function làm việc với API và AsyncStorage
*/
export const loginAndSaveUser = async (data) => {
    try {
        const response = await login(data);
        switch (response.statusCode) {
            case 400:
                // Bad request
                return { status: 'failed', message: 'Email sai định dạng, vui lòng kiểm tra lại!' };
            case 401:
                // Unauthorized
                console.log(response)
                return { status: 'failed', message: response.error};
            case 200:
                // success
                // this works as a filter to pass only the token to saveUserToLocal and return it to _signIn
                return { 
                    status: 'success', 
                    message: "Đăng nhập thành công!",
                    userData: {
                        username: String(response.text.userData.name),
                        userId: String(response.text.userData.id),
                        token: String(response.text.accessToken)
                    }    
                };
            default:
                // null/500/300
                return { status: 'failed', message: 'Unknown error' };
        }
    } catch (error) {
        console.error(error, "(catch in function loginAndSaveUser)");
        return { status: 'failed', message: 'Unknown error' };
    }
}