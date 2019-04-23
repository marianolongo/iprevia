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

    @RequestMapping("/users/{name}")
    public Optional<User> getUser(@PathVariable String name){
        return userService.getUser(name);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/users")
    public void addUser(@RequestBody User user){
        userService.addUser(user);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{name}")
    public void updateUser(@RequestBody User user, @PathVariable String name){
        userService.updateUser(user);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{name}")
    public void deleteUser(@PathVariable String name){
        userService.deleteUser(name);
    }

    @RequestMapping("/validate")
    public boolean validate(){
        return true;
    }
}
