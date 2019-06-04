package lab1.app.service;

import lab1.app.model.Event;
import lab1.app.model.User;
import lab1.app.repository.EventRepository;
import lab1.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    @Autowired
    public UserService(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public User getUser(String name) {
        return userRepository.findByName(name);
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User getUserById(Long id) {
        return userRepository.getUsersById(id);
    }

    public User getUserByName(String name){
        return userRepository.findByName(name);
    }

    public void incrementScore(Long id, Long input) {
        User user = getUserById(id);
        Long rating = user.getRating();
        if (rating == null) rating = 0L;
        Long ratingAmount = user.getRatingAmount();
        if (ratingAmount == null) ratingAmount = 0L;
        user.setRating(rating + input);
        user.setRatingAmount(ratingAmount + 1);
        userRepository.save(user);
    }

    public void decreaseScore(Long id) {
        User user = getUserById(id);
        Long score = user.getRating();
        user.setRating(score - 1);
        userRepository.save(user);
    }

    public List<User> getAllUsersContaining(String inputText) {
        return userRepository.findAllByNameContaining(inputText);
    }

    public void saveUser(User user){
        userRepository.save(user);
    }

    public List<User> findAllUsersOrderedByRating(){
        List<User> users = getAllUsers();
        users.sort((o1, o2) -> (int) (o2.getRating() - o1.getRating()));
        return users;
    }

    public List<User> getAllUsersFromEvent(Long id) {
        Event event = eventRepository.findById(id).get();
        return userRepository.findAllByEventsAssistedContaining(event);
    }
}
