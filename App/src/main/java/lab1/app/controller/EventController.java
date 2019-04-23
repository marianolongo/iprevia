package lab1.app.controller;



import lab1.app.model.Event;
import lab1.app.service.EventService;
import lab1.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping("/users/{name}/events")
    public List<Event> getAllEventsFromUser(@PathVariable String name){
        return eventService.getAllEventsFromUser(name);
    }

    @RequestMapping("/users/{name}/events/{id}")
    public Optional<Event> getEvent(@PathVariable String id){
        return eventService.getEvent(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/users/{name}/events")
    public void addEvent(@RequestBody Event event, @PathVariable String name){
        event.setUser(userService.getUserByName(name));
        eventService.addEvent(event);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{name}/events/{id}")
    public void updateEvent(@RequestBody Event event, @PathVariable String name){
        event.setUser(userService.getUserByName(name));
        eventService.updateEvent(event);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{name}/events/{id}")
    public void deleteEvent(@PathVariable String id){
        eventService.deleteEvent(id);
    }
}
