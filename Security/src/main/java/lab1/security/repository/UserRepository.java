package lab1.security.repository;

import lab1.security.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByName(String name);

    User getUsersById(Long id);

}
