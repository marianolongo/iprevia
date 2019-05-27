package lab1.app.service;


import lab1.app.model.Event;
import lab1.app.model.User;
import lab1.app.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.*;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserService userService;

    @Autowired
    public EventService(EventRepository eventRepository, UserService userService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
    }

    public List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        eventRepository.findAll().forEach(events::add);
        return events;
    }

    public List<Event> getAllEventsFromUser(String name) {
        return eventRepository.findByHost_Name(name);
    }

    public Event getEvent(Long id) {
        return eventRepository.findById(id);
    }

    public void addEvent(Event event) {
        eventRepository.save(event);
    }

    public void updateEvent(Event event) {
        eventRepository.save(event);
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }

    public void addGuest(Long id, String guestName) {
        Event event = eventRepository.findById(id);
        User user = userService.getUserByName(guestName);
        if (event.getUsers().contains(user) || event.getHost().getId().equals(user.getId())) {
            return; //TODO fijarse que hacer con usuario que ya esta o si es host
        }
        if (event.getPrivate()) {
            sendSimpleMessage(event.getHost().getEmail(), "hola", "hola");
        } else {
            List<User> users = event.getUsers();
            users.add(user);
            event.setUsers(users);
            eventRepository.save(event);
        }
    }

    @Autowired
    public JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public List<Event> getAllEventsContaining(String inputText) {
        return eventRepository.findAllByNameContaining(inputText);
    }

    public List<Event> getAllPublicEvents() {
        return eventRepository.findAllByIsPrivateFalse();
    }

    public List<Event> getAllEventsAfterNow() {
        return eventRepository.findAllByDateAfter(new Date());
    }

    public boolean checkIfFinished(Long id) {
        return eventRepository.findById(id).didFinish();
    }
}
