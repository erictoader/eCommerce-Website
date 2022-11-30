package IS22.BogdanEricBunea.eCommerce.service;

import IS22.BogdanEricBunea.eCommerce.model.User;
import IS22.BogdanEricBunea.eCommerce.repo.UserRepo;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    // GET
    public List<User> getUsers() {
        return repo.findAll();
    }

    public User getUserById(int id) {
        return repo.findById(id)
                .orElse(null);
    }

    public User getUserByUsername(String name) {
        return repo.findByUsername(name);
    }

    // POST
    public User saveProduct(User user) {
        return repo.save(user);
    }

    public List<User> saveProducts(List<User> users) {
        return repo.saveAll(users);
    }

    // DELETE
    public void deleteUserById(int id) {
        repo.deleteById(id);
        System.out.println("Removed user with ID: " + id);
    }

    // UPDATE
    public User updateUser(@NotNull User updated) {
        User existing = repo.findById(updated.getId()).orElse(null);
        if (existing == null) return null;
        return repo.save(updated);
    }

}
