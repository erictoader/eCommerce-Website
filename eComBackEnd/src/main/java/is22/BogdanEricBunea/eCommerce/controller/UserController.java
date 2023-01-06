package is22.BogdanEricBunea.eCommerce.controller;

import is22.BogdanEricBunea.eCommerce.request.user.UserLoginRequest;
import is22.BogdanEricBunea.eCommerce.request.user.UserRegisterRequest;
import is22.BogdanEricBunea.eCommerce.request.user.UserUpdateRequest;
import is22.BogdanEricBunea.eCommerce.response.user.*;
import is22.BogdanEricBunea.eCommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("user")
@RestController
public class UserController {

    @Autowired
    private UserService service;

    // GET
    @GetMapping("/getAll")
    public UserGetAllResponse getUsers() {
        return service.getUsers();
    }

    @GetMapping("/getByUsername/{username}")
    public UserGetByUsernameResponse getUserByUsername(@PathVariable String username) {
        return service.getUserByUsername(username);
    }

    @PostMapping("/login")
    public UserLoginResponse getUserByUsernameAndPassword(@RequestBody UserLoginRequest request) {
        return service.attemptLogin(request);
    }

    // POST
    @PostMapping("/register")
    public UserRegisterResponse saveUser(@RequestBody UserRegisterRequest request) {
        return service.registerUser(request);
    }

    // DELETE
    @DeleteMapping("/delete")
    public UserDeleteResponse deleteUserById(@RequestParam int id) {
        return service.deleteUserById(id);
    }

    // UPDATE
    @PutMapping("/update")
    public UserUpdateResponse updateUser(@RequestBody UserUpdateRequest request) {
        return service.updateUser(request);
    }
}
