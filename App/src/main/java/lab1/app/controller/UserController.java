package lab1.app.controller;

import lab1.app.model.User;
import lab1.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", methods = {
        RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.GET, RequestMethod.OPTIONS})
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @RequestMapping("/users/{id}")
    public Optional<User> getUser(@PathVariable Long id){
        return userService.getUser(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/users")
    public void addUser(@RequestBody User user){
        userService.addUser(user);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{id}")
    public void updateUser(@RequestBody User user, @PathVariable String name){
        userService.updateUser(user);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

    @RequestMapping("/validate")
    public boolean validate(){
        return true;
    }
}
