package is22.BogdanEricBunea.eCommerce.response.user;

import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

public class UserDeleteResponse extends BaseResponse {

    public UserDeleteResponse(Integer code, String message) {
        super(code, message);
    }

    public interface Codes {
        int SUCCESS = 200;
        int NO_EFFECT = 201;
    }

    public interface Messages {
        String SUCCESS = "Delete request successful";
        String NO_EFFECT = "No rows affected by delete";
    }
}
