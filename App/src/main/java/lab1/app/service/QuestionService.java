package lab1.app.service;

import lab1.app.model.Question;
import lab1.app.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }


    public void addQuestion(Question question, Long id, String author) {
        question.setEventId(id);
        question.setAuthor(author);
        question.setDate(System.currentTimeMillis());
        questionRepository.save(question);
    }

    public List<Question> getAllQuestionsFromEvent(Long id) {
        return questionRepository.findAllByEventId(id);
    }
}
