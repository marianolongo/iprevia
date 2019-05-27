package lab1.app.controller;

import lab1.app.model.User;
import lab1.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @RequestMapping("/getUser")
    public User getUser(Authentication authentication){
        OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) authentication;
        String name = (String) oAuth2Authentication.getUserAuthentication().getPrincipal();
        return userService.getUser(name);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/users")
    public void addUser(@RequestBody User user){
        user.setRating(0L);
        user.setRatingAmount(0L);
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

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{id}/incrementScore")
    public void incrementScore(@PathVariable Long id){
        userService.incrementScore(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{id}/decreaseScore")
    public void decreaseScore(@PathVariable Long id){
        userService.decreaseScore(id);
    }

    @RequestMapping("/users/containing/{inputText}")
    public List<User> getAllUsersContaining(@PathVariable String inputText){
        return userService.getAllUsersContaining(inputText);
    }

    @RequestMapping("/users/userByName/{name}")
    public User getUserByName(@PathVariable String name){
        return userService.getUserByName(name);
    }
}
