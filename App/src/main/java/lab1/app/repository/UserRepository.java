package lab1.app.repository;

import lab1.app.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findById(Long id);

    void deleteById(Long id);

    User getUsersById(Long id);

    User getUsersByName(String name);

    User findByName(String name);
}
