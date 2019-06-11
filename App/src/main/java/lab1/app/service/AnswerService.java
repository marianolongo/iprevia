package lab1.app.service;

import lab1.app.model.Answer;
import lab1.app.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public void addAnswer(Answer answer) {
        answerRepository.save(answer);
    }
}
