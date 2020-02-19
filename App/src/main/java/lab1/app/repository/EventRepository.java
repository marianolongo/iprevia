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

    List<Event> findAllByNameContainingAndHostNot(String name, User host);

    List<Event> findAllByIsPrivateFalseAndDateAfterAndHostNotOrderByDate(Long date, User host);

    List<Event> findAllByIsPrivateTrueAndDateAfterAndHostNotOrderByDate(Long date, User host);

    List<Event> findAllByDateAfter(Long date);

    List<Event> findAllByDateBeforeAndHostNot(Long date, User host);

    List<Event> findAllByDateAfterAndHostNotOrderByDate(Long date, User host);

    List<Event> findAllByUsersContaining(User user);

    List<Event> findAllByHostIsNot(User host);

    Optional<Event> findByIdAndUsersContaining(Long id, User user);

    Optional<Event> findByIdAndUsersVotedContaining(Long id, User user);
}
