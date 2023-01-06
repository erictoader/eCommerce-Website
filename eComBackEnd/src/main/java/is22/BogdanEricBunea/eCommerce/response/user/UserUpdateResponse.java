package is22.BogdanEricBunea.eCommerce.response.user;

import is22.BogdanEricBunea.eCommerce.entity.User;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

import static is22.BogdanEricBunea.eCommerce.service.UserService.MINIMUM_PASSWORD_LENGTH;

public class UserUpdateResponse extends BaseResponse {
    private User user;

    public UserUpdateResponse(Integer code, String message, User user) {
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
        int USER_DOES_NOT_EXIST = 201;
        int EMAIL_IN_USE = 202;
        int PASSWORD_TOO_SHORT = 203;
        int PASSWORD_NO_NUMBER = 204;
        int EMAIL_INVALID = 205;
    }

    public interface Messages {
        String SUCCESS = "Update successful";
        String USER_DOES_NOT_EXIST = "User does not exist therefore cannot be modified";
        String EMAIL_IN_USE = "New E-mail address is already in use";
        String PASSWORD_TOO_SHORT = "New password is not long enough. Passwords need to be at least " +
                MINIMUM_PASSWORD_LENGTH + " characters long";
        String PASSWORD_NO_NUMBER = "New password does not contain a number. Passwords must contain at least one number";
        String EMAIL_INVALID = "Invalid E-mail address";
    }
}
