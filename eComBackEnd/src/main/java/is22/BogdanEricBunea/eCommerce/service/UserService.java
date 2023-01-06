package is22.BogdanEricBunea.eCommerce.service;

import is22.BogdanEricBunea.eCommerce.entity.User;
import is22.BogdanEricBunea.eCommerce.repo.UserRepo;
import is22.BogdanEricBunea.eCommerce.request.user.UserLoginRequest;
import is22.BogdanEricBunea.eCommerce.request.user.UserRegisterRequest;
import is22.BogdanEricBunea.eCommerce.request.user.UserUpdateRequest;
import is22.BogdanEricBunea.eCommerce.response.user.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    public static final int MINIMUM_USERNAME_LENGTH = 6;
    public static final int MINIMUM_PASSWORD_LENGTH = 8;
    private static final String PASSWORD_REGEX = ".*\\d.*";
    private static final String EMAIL_REGEX = "^[A-Za-z](.*)([@])(.+)(\\.)(.+)";

    // GET
    public UserGetAllResponse getUsers() {
        List<User> users = repo.findAll();
        return new UserGetAllResponse(
                UserGetAllResponse.Codes.SUCCESS,
                UserGetAllResponse.Messages.SUCCESS,
                users
        );
    }

    public UserGetByUsernameResponse getUserByUsername(String name) {
        User user = repo.findByUsername(name);
        if (user == null) return new UserGetByUsernameResponse(
                UserGetByUsernameResponse.Codes.NOT_FOUND,
                UserGetByUsernameResponse.Messages.NOT_FOUND,
                null
        );
        else return new UserGetByUsernameResponse(
                UserGetByUsernameResponse.Codes.SUCCESS,
                UserGetByUsernameResponse.Messages.SUCCESS,
                user
        );
    }

    public UserLoginResponse attemptLogin(UserLoginRequest request) {
        User user = repo.findByUsernameAndPassword(request.getUsername(), request.getPassword());
        if (user == null) {
            User userByUsername = repo.findByUsername(request.getUsername());
            if (userByUsername == null) return new UserLoginResponse(
                    UserLoginResponse.Codes.NOT_FOUND,
                    UserLoginResponse.Messages.NOT_FOUND,
                    null
            );
            else return new UserLoginResponse(
                    UserLoginResponse.Codes.INCORRECT_PASSWORD,
                    UserLoginResponse.Messages.INCORRECT_PASSWORD,
                    null
            );
        } else return new UserLoginResponse(
                UserLoginResponse.Codes.SUCCESS,
                UserLoginResponse.Messages.SUCCESS,
                user
        );
    }

    // POST
    public UserRegisterResponse registerUser(UserRegisterRequest request) {
        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getUsername(),
                request.getPassword()
        );
        User userByUsername = repo.findByUsername(user.getUsername());
        if (userByUsername != null) return new UserRegisterResponse(
                UserRegisterResponse.Codes.USERNAME_EXISTS,
                UserRegisterResponse.Messages.USERNAME_EXISTS,
                null
        );
        User userByEmail = repo.findByEmail(user.getEmail());
        if (userByEmail != null) return new UserRegisterResponse(
                UserRegisterResponse.Codes.EMAIL_EXISTS,
                UserRegisterResponse.Messages.EMAIL_EXISTS,
                null
        );
        if (!request.getEmail().matches(EMAIL_REGEX)) return new UserRegisterResponse(
                UserRegisterResponse.Codes.EMAIL_INVALID,
                UserRegisterResponse.Messages.EMAIL_INVALID,
                null
        );
        if (request.getPassword().length() < MINIMUM_PASSWORD_LENGTH) return new UserRegisterResponse(
                UserRegisterResponse.Codes.PASSWORD_TOO_SHORT,
                UserRegisterResponse.Messages.PASSWORD_TOO_SHORT,
                null
        );
        if (!request.getPassword().matches(PASSWORD_REGEX)) return new UserRegisterResponse(
                UserRegisterResponse.Codes.PASSWORD_INVALID,
                UserRegisterResponse.Messages.PASSWORD_INVALID,
                null
        );
        if (request.getUsername().length() < MINIMUM_USERNAME_LENGTH) return new UserRegisterResponse(
                UserRegisterResponse.Codes.USERNAME_TOO_SHORT,
                UserRegisterResponse.Messages.USERNAME_TOO_SHORT,
                null
        );

        User newUser = repo.save(user);
        return new UserRegisterResponse(
                UserRegisterResponse.Codes.SUCCESS,
                UserRegisterResponse.Messages.SUCCESS,
                newUser
        );
    }

    // DELETE
    public UserDeleteResponse deleteUserById(int id) {
        User user = repo.findById(id).orElse(null);
        if (user == null) return new UserDeleteResponse(
                UserDeleteResponse.Codes.NO_EFFECT,
                UserDeleteResponse.Messages.NO_EFFECT
        );
        repo.deleteById(id);
        return new UserDeleteResponse(
                UserDeleteResponse.Codes.SUCCESS,
                UserDeleteResponse.Messages.SUCCESS
        );
    }

    // UPDATE
    public UserUpdateResponse updateUser(@NotNull UserUpdateRequest request) {
        User existing = repo.findById(request.getId()).orElse(null);
        if (existing == null) return new UserUpdateResponse(
                UserUpdateResponse.Codes.USER_DOES_NOT_EXIST,
                UserUpdateResponse.Messages.USER_DOES_NOT_EXIST,
                null
        );
        if (!existing.getEmail().equals(request.getEmail())) {
            User userByEmail = repo.findByEmail(request.getEmail());
            if (userByEmail != null) return new UserUpdateResponse(
                    UserUpdateResponse.Codes.EMAIL_IN_USE,
                    UserUpdateResponse.Messages.EMAIL_IN_USE,
                    null
            );
        }
        if (request.getPassword().length() < MINIMUM_PASSWORD_LENGTH)
            return new UserUpdateResponse(
                    UserUpdateResponse.Codes.PASSWORD_TOO_SHORT,
                    UserUpdateResponse.Messages.PASSWORD_TOO_SHORT,
                    null
            );
        if (!request.getPassword().matches(PASSWORD_REGEX))
            return new UserUpdateResponse(
                    UserUpdateResponse.Codes.PASSWORD_NO_NUMBER,
                    UserUpdateResponse.Messages.PASSWORD_NO_NUMBER,
                    null
            );
        if (!request.getEmail().matches(EMAIL_REGEX))
            return new UserUpdateResponse(
                    UserUpdateResponse.Codes.EMAIL_INVALID,
                    UserUpdateResponse.Messages.EMAIL_INVALID,
                    null
            );

        existing.setName(request.getName());
        existing.setEmail(request.getEmail());
        existing.setPassword(request.getPassword());
        existing.setProfilePicture(request.getProfilePicture());
        User user = repo.save(existing);

        return new UserUpdateResponse(
                UserUpdateResponse.Codes.SUCCESS,
                UserUpdateResponse.Messages.SUCCESS,
                user
        );
    }
}
