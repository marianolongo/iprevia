package lab1.app.controller;



import lab1.app.model.Event;
import lab1.app.service.EventService;
import lab1.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", methods = {
        RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.GET, RequestMethod.OPTIONS})
public class EventController {


    private final EventService eventService;

    private final UserService userService;

    @Autowired
    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }

    @RequestMapping("/events")
    public List<Event> getAllEvents(){
        return eventService.getAllEvents();
    }

    @RequestMapping("/events/fromUser")
    public List<Event> getAllEventsFromUser(Authentication authentication){
        OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) authentication;
        return eventService.getAllEventsFromUser((String) oAuth2Authentication.getUserAuthentication().getPrincipal());
    }

    @RequestMapping("/events/{id}")
    public Event getEvent(@PathVariable Long id){
        return eventService.getEvent(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/events")
    public void addEvent(Authentication authentication, @RequestBody Event event){
        OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) authentication;
        event.setHost(userService.getUserByName((String) oAuth2Authentication.getUserAuthentication().getPrincipal()));
        event.setDateCreated(new Date());
        eventService.addEvent(event);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/events/{userId}/events/{id}")
    public void updateEvent(@RequestBody Event event, @PathVariable Long userId){
        eventService.updateEvent(event);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/events/{userId}/events/{id}")
    public void deleteEvent(@PathVariable String id){
        eventService.deleteEvent(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/events/{id}/addGuest")
    public ResponseEntity addGuest(Authentication authentication, @PathVariable Long id){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String guest = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        try {
            eventService.addGuest(id, guest);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().build();
    }

    @RequestMapping("/events/containing/{inputText}")
    public List<Event> getAllEventsContaining(@PathVariable String inputText){
        return eventService.getAllEventsContaining(inputText);
    }

    @RequestMapping("/events/getPublicEvents")
    public List<Event> getAllPublicEvents(){
        return eventService.getAllPublicEvents();
    }

    @RequestMapping("/events/afterNow")
    public List<Event> getAllEventsAfterNow(){
        return eventService.getAllEventsAfterNow();
    }

    @RequestMapping("/events/{id}/checkDidFinished")
    public boolean checkIfFinished(@PathVariable Long id){
        return eventService.checkIfFinished(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/events/{id}/addVote")
    public boolean addVote(Authentication authentication,@PathVariable Long id){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String voterName = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.addVote(id, voterName);
    }

    @RequestMapping("/events/sendMail")
    public void sendMail() throws MessagingException {
        eventService.sendSimpleMessage("mariano.longo@ing.austral.edu.ar","Test", "Test");
    }
}
