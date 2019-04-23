package lab1.app.repository;

import lab1.app.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByName(String name);

    User getUsersById(Long id);

}
