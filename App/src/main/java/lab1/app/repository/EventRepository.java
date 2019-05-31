package lab1.app.repository;

import lab1.app.model.Event;
import lab1.app.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends CrudRepository<Event, Long> {

    List<Event> findByHostId(Long userId);

    List<Event> findByHost_Name(String user_name);

    Optional<Event> findByName(String name);

    Optional<Event> findById(Long id);

    List<Event> findAllByNameContaining(String name);

    List<Event> findAllByIsPrivateFalse();

    List<Event> findAllByIsPrivateTrue();

    List<Event> findAllByDateAfter(Date date);

    List<Event> findAllByDateBefore(Date date);

    List<Event> findAllByDateAfterOrderByDate(Date date);

//    @Query("select users_id from event_users where event_id = id")
//    List<Long> getAllUsersIdFromEvent(Long id);
}
