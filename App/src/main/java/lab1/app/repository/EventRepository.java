package lab1.app.repository;

import lab1.app.model.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends CrudRepository<Event, String> {

    List<Event> findByUserId(Long userId);
    Optional<Event> findByName(String name);
}
