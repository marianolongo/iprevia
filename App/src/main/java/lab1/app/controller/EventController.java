package lab1.app.controller;



import lab1.app.model.Event;
import lab1.app.service.EventService;
import lab1.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
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

    @RequestMapping("/users/{id}/events")
    public List<Event> getAllEventsFromUser(@PathVariable Long id){
        return eventService.getAllEventsFromUser(id);
    }

    @RequestMapping("/users/{userId}/events/{id}")
    public Optional<Event> getEvent(@PathVariable String id){
        return eventService.getEvent(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/users/{userId}/events")
    public void addEvent(@RequestBody Event event, @PathVariable Long userId){
        event.setUser(userService.getUserById(userId));
        eventService.addEvent(event);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{userId}/events/{id}")
    public void updateEvent(@RequestBody Event event, @PathVariable Long userId){
        event.setUser(userService.getUserById(userId));
        eventService.updateEvent(event);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{userId}/events/{id}")
    public void deleteEvent(@PathVariable String id){
        eventService.deleteEvent(id);
    }
}
