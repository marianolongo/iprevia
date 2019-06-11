package lab1.app.service;

import lab1.app.model.Question;
import lab1.app.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }


    public void addQuestion(Question question) {
        questionRepository.save(question);
    }
}
