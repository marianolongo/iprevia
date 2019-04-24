package lab1.app.repository;

import lab1.app.model.Event;
import lab1.app.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends CrudRepository<Event, String> {

    List<Event> findByUserId(Long userId);

    List<Event> findByUser_Name(String user_name);
    Optional<Event> findByName(String name);
}
