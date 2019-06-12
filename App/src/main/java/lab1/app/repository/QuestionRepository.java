package lab1.app.repository;

import lab1.app.model.Question;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface QuestionRepository extends CrudRepository<Question, Long> {

    List<Question> findAllByEventId(Long eventId);
}
