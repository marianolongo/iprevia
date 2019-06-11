package lab1.app.controller;

import lab1.app.model.Answer;
import lab1.app.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", methods = {
        RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.GET, RequestMethod.OPTIONS})
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/answers/add")
    public void addAnswer(@RequestBody Answer answer){
        answerService.addAnswer(answer);
    }
}
