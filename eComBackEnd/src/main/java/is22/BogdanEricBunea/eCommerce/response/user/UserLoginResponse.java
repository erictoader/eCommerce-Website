package is22.BogdanEricBunea.eCommerce.response.user;

import is22.BogdanEricBunea.eCommerce.entity.User;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

public class UserLoginResponse extends BaseResponse {
    private User user;

    public UserLoginResponse(Integer code, String message, User user) {
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
        int NOT_FOUND = 201;
        int INCORRECT_PASSWORD = 202;
    }

    public interface Messages {
        String SUCCESS = "Login successful";
        String NOT_FOUND = "Username does not belong to any user";
        String INCORRECT_PASSWORD = "Provided password is incorrect";
    }
}
