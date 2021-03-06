package lab1.app.controller;



import lab1.app.model.Event;
import lab1.app.model.User;
import lab1.app.service.EventService;
import lab1.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

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

    @RequestMapping("/events/fromUser/{name}")
    public List<Event> getAllEventsFromUser(@PathVariable String name){
        return eventService.getAllEventsFromUser(name);
    }

    @RequestMapping("/events/{id}")
    public Event getEvent(@PathVariable Long id){
        return eventService.getEvent(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/events")
    public Event addEvent(Authentication authentication, @RequestBody Event event){
        OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) authentication;
        event.setHost(userService.getUserByName((String) oAuth2Authentication.getUserAuthentication().getPrincipal()));
        event.setDateCreated(new Date().getTime());
        eventService.addEvent(event);
        return event;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/events/{id}")
    public void updateEvent(@RequestBody Event event, @PathVariable Long id){
        Event oldEvent = getEvent(id);
        oldEvent.setDate(event.getDate());
        oldEvent.setName(event.getName());
        oldEvent.setDescription(event.getDescription());
        oldEvent.setIsPrivate(event.getPrivate());
        oldEvent.setLatitude(event.getLatitude());
        oldEvent.setLongitude(event.getLongitude());
        eventService.updateEvent(oldEvent);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/events/{id}/addGuest")
    public String addGuest(Authentication authentication, @PathVariable Long id) throws MessagingException {
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String guest = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.addGuest(id, guest);
    }

    @RequestMapping("/events/containing/{inputText}")
    public List<Event> getAllEventsContaining(@PathVariable String inputText){
        return eventService.getAllEventsContaining(inputText);
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

    @RequestMapping("/events/notFromActiveUser")
    public List<Event> getAllEventsNotFromActiveUser(Authentication authentication){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String host = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.getAllEventsNotFromActiveUser(host);
    }

    @RequestMapping("/events/{id}/checkDidFinished")
    public boolean checkIfFinished(@PathVariable Long id){
        return eventService.checkIfFinished(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/events/{id}/addVote/{rating}")
    public boolean addVote(Authentication authentication,@PathVariable Long id, @PathVariable Long rating){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String voterName = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.addVote(id, voterName, rating);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/events/addUserViaConfirmation/{id}/{guestName}")
    public RedirectView addUserWithMail(@PathVariable Long id, @PathVariable String guestName){
        Event event = eventService.addUserWithMail(id, guestName);
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:3000/confirmation/" + event.getName() + "/" + guestName);
        return redirectView;
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

    @RequestMapping("/events/getNearEvents/{latitude}/{longitude}/{distance}")
    public List<Event> getNearEvents(@PathVariable Double latitude, @PathVariable Double longitude, @PathVariable Double distance){
        return eventService.getNearEvents(latitude, longitude, distance);
    }

    @RequestMapping("/events/{id}/checkIfAvailabilityToVote")
    public boolean checkIfAvailabilityToVote(@PathVariable Long id, Authentication authentication){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String name = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.checkIfAvailabilityToVote(id, name);
    }
    @RequestMapping("/events/{id}/userDidVote")
    public boolean userDidVote(@PathVariable Long id, Authentication authentication){
        OAuth2Authentication auth2Authentication = (OAuth2Authentication) authentication;
        String name = (String) auth2Authentication.getUserAuthentication().getPrincipal();
        return eventService.userDidVote(id, name);
    }
}
