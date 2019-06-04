package lab1.app.controller;



import lab1.app.model.Event;
import lab1.app.model.User;
import lab1.app.service.EventService;
import lab1.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.Date;
import java.util.List;

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
    public void updateEvent(@RequestBody Event event, @PathVariable Long id){
        Event oldEvent = getEvent(id);
        oldEvent.setDate(event.getDate());
        oldEvent.setName(event.getName());
        oldEvent.setDescription(event.getDescription());
        oldEvent.setIsPrivate(event.getPrivate());
        eventService.updateEvent(oldEvent);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/events/{id}/addGuest")
    public ResponseEntity addGuest(Authentication authentication, @PathVariable Long id) throws MessagingException {
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String guest = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        eventService.addGuest(id, guest);
        return ResponseEntity.ok().build();
    }

    @RequestMapping("/events/containing/{inputText}")
    public List<Event> getAllEventsContaining(@PathVariable String inputText, Authentication authentication){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String host = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.getAllEventsContaining(inputText, host);
    }

    @RequestMapping("/events/getPublicEvents")
    public List<Event> getAllPublicEvents(Authentication authentication){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String host = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.getAllPublicEvents(host);
    }

    @RequestMapping("/events/getPrivateEvents")
    public List<Event> getAllPrivateEvents(Authentication authentication){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String host = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.getAllPrivateEvents(host);
    }

    @RequestMapping("/events/afterNow")
    public List<Event> getAllEventsAfterNow(Authentication authentication){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String host = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.getAllEventsAfterNow(host);
    }

    @RequestMapping("/events/{id}/checkDidFinished")
    public boolean checkIfFinished(@PathVariable Long id){
        return eventService.checkIfFinished(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/events/{id}/addVote")
    public boolean addVote(Authentication authentication,@PathVariable Long id, Long rating){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String voterName = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.addVote(id, voterName, rating);
    }

//    @RequestMapping("/events/sendMail")
//    public void sendMail() throws MessagingException {
//        eventService.sendSimpleMessage("mariano.longo@ing.austral.edu.ar","Inscripcion", "test", (long) 3, "Mariano");
//    }

    @RequestMapping(method = RequestMethod.PUT, value = "/events/addUserViaConfirmation/{id}/{guestName}")
    public void addUserWithMail(@PathVariable Long id, @PathVariable String guestName){
        eventService.addUserWithMail(id, guestName);
    }

    @RequestMapping("/events/getPastEvents")
    public List<Event> getAllPastEvents(Authentication authentication){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String host = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.getAllPastEvents(host);
    }

    @RequestMapping("/events/{id}/getHost")
    public User getHost(@PathVariable Long id){
        return eventService.getHost(id);
    }

    @RequestMapping("/events/getAllEventsIfUserIsGuest")
    public List<Event> getAllEventsIfUserIsGuest(Authentication authentication){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String name = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.getAllEventsIfUserIsGuest(name);
    }

    @RequestMapping("/events/getAllEventsIfUserIsGuest/{name}")
    public List<Event> getAllEventsIfUserIsGuest(@PathVariable String name){
        return eventService.getAllEventsIfUserIsGuest(name);
    }
}
