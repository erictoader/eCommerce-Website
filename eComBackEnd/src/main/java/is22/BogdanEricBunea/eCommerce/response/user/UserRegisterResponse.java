package is22.BogdanEricBunea.eCommerce.response.user;

import is22.BogdanEricBunea.eCommerce.entity.User;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

import static is22.BogdanEricBunea.eCommerce.service.UserService.MINIMUM_PASSWORD_LENGTH;
import static is22.BogdanEricBunea.eCommerce.service.UserService.MINIMUM_USERNAME_LENGTH;

public class UserRegisterResponse extends BaseResponse {
    private User user;

    public UserRegisterResponse(Integer code, String message, User user) {
        super(code, message);
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public interface Codes {
        int SUCCESS = 200;
        int USERNAME_EXISTS = 201;
        int EMAIL_EXISTS = 202;
        int EMAIL_INVALID = 203;
        int PASSWORD_TOO_SHORT = 204;
        int PASSWORD_INVALID = 205;
        int USERNAME_TOO_SHORT = 206;
    }

    public interface Messages {
        String SUCCESS = "Register successful";
        String USERNAME_EXISTS = "Username is already in use";
        String EMAIL_EXISTS = "E-mail address already in use";
        String EMAIL_INVALID = "E-mail address is invalid";
        String PASSWORD_TOO_SHORT = "Password needs to be at least " +
                MINIMUM_PASSWORD_LENGTH + " characters long";
        String PASSWORD_INVALID = "Password must contain at least one number";
        String USERNAME_TOO_SHORT = "Username needs to be at least " +
                MINIMUM_USERNAME_LENGTH + " characters long";
    }
}
