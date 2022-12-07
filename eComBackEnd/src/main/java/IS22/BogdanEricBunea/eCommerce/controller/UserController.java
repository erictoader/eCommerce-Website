package IS22.BogdanEricBunea.eCommerce.controller;

import IS22.BogdanEricBunea.eCommerce.model.User;
import IS22.BogdanEricBunea.eCommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("user")
@RestController
public class UserController {

    @Autowired
    private UserService service;

    // GET
    @GetMapping("/getAll")
    public List<User> getUsers() {
        return service.getUsers();
    }

    @GetMapping("/getById/{id}")
    public User getUserById(@PathVariable int id) {
        return service.getUserById(id);
    }

    @GetMapping("/getByUsername/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return service.getUserByUsername(username);
    }

    // POST
    @PostMapping("/add")
    public User saveUser(@RequestBody User user) {
        return service.saveProduct(user);
    }

    @PostMapping("/addAll")
    public List<User> saveUsers(@RequestBody List<User> users) {
        return service.saveProducts(users);
    }

    // DELETE
    @DeleteMapping("/delete")
    public void deleteUserById(@RequestParam int id) {
        service.deleteUserById(id);
    }

    // UPDATE
    @PutMapping("/update")
    public User updateUser(@RequestBody User updated) {
        return service.updateUser(updated);
    }
}
