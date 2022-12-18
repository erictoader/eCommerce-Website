package IS22.BogdanEricBunea.eCommerce.model;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String username;
    private String password;
    @Column(name = "user_type")
    private int userType;
    @Column(name = "profile_picture")
    private byte[] profilePicture;
    @Column(name = "registration_date")
    private long registrationDate;

    public User(int id, String name, String username, String password, int userType, byte[] profilePicture, long registrationDate) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.userType = userType;
        this.profilePicture = profilePicture;
        this.registrationDate = registrationDate;
    }

    public User(String name, String username, String password, int userType, byte[] profilePicture, long registrationDate) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.userType = userType;
        this.profilePicture = profilePicture;
        this.registrationDate = registrationDate;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public long getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(long registrationDate) {
        this.registrationDate = registrationDate;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", userType=" + userType +
                ", profilePicture=" + Arrays.toString(profilePicture) +
                ", registrationDate=" + registrationDate +
                '}';
    }
}
