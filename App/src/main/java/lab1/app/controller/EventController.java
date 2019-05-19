package lab1.app.controller;



import lab1.app.model.Event;
import lab1.app.service.EventService;
import lab1.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping("/events/{name}")
    public Optional<Event> getEvent(@PathVariable String name){
        return eventService.getEvent(name);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/events")
    public void addEvent(Authentication authentication, @RequestBody Event event){
        OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) authentication;
        event.setHost(userService.getUserByName((String) oAuth2Authentication.getUserAuthentication().getPrincipal()));
        event.setPrivate(false);
        eventService.addEvent(event);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{userId}/events/{id}")
    public void updateEvent(@RequestBody Event event, @PathVariable Long userId){
        eventService.updateEvent(event);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{userId}/events/{id}")
    public void deleteEvent(@PathVariable String id){
        eventService.deleteEvent(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/events/{id}/addGuest/{guestId}")
    public void addGuest(@PathVariable Long id, @PathVariable Long guestId){
        eventService.addGuest(id, guestId);
    }
}
