package is22.BogdanEricBunea.eCommerce.response.user;

import is22.BogdanEricBunea.eCommerce.entity.User;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

import java.util.List;

public class UserGetAllResponse extends BaseResponse {
    private List<User> users;

    public UserGetAllResponse(Integer code, String message, List<User> users) {
        super(code, message);
        this.users = users;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public interface Codes {
        int SUCCESS = 200;
    }

    public interface Messages {
        String SUCCESS = "Request successful";
    }
}


