package lab1.app.controller;


import lab1.app.model.Question;
import lab1.app.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {
        RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.GET, RequestMethod.OPTIONS})
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/questions/{id}/addQuestion")
    public Question addQuestion(Authentication authentication, @RequestBody Question question, @PathVariable Long id){
        OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) authentication;
        String author = (String) oAuth2Authentication.getUserAuthentication().getPrincipal();
        return questionService.addQuestion(question, id, author);
    }

    @RequestMapping("/questions/{id}/getAllQuestionsFromEvent")
    public List<Question> getAllQuestionsFromEvent(@PathVariable Long id){
        return questionService.getAllQuestionsFromEvent(id);
    }
}
