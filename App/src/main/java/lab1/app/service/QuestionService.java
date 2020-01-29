package lab1.app.service;

import lab1.app.model.Question;
import lab1.app.model.User;
import lab1.app.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    private final UserService userService;
    @Autowired
    public QuestionService(QuestionRepository questionRepository, UserService userService) {
        this.questionRepository = questionRepository;
        this.userService = userService;
    }


    public Question addQuestion(Question question, Long id, String author) {
        User user = userService.getUserByName(author);
        question.setEventId(id);
        question.setAuthor(user);
        question.setDate(new Date().getTime());
        return questionRepository.save(question);
    }

    public List<Question> getAllQuestionsFromEvent(Long id) {
        return questionRepository.findAllByEventId(id);
    }
}
