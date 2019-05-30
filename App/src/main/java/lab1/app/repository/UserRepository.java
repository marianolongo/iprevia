package lab1.app.repository;

import lab1.app.model.Event;
import lab1.app.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findById(Long id);

    void deleteById(Long id);

    User getUsersById(Long id);

    User findByName(String name);

    List<User> findAllByNameContaining(String name);

    List<User> findAll();
}
