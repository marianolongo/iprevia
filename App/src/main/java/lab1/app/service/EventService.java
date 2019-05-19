package lab1.app.service;


import lab1.app.model.Event;
import lab1.app.model.User;
import lab1.app.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

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

    public Optional<Event> getEvent(String name) {
        return eventRepository.findByName(name);
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

    public void addGuest(Long id, Long guestId) {
        Event event = eventRepository.findById(id);
        User user = userService.getUserById(guestId);
        if(event.getPrivate()){
            sendEmail(id, guestId);
        }
        else {
            List<User> users = event.getUser();
            users.add(user);
            event.setUser(users);
            eventRepository.save(event);
        }
    }

    private void sendEmail(Long id, Long userToId) {
//        String from = "iprevia.no.reply";
//        String password = "Qwerty12.";
//        String mailto = userService.getUserById(userToId).getEmail();
//        Properties props = System.getProperties();
//        String host = "smtp.gmail.com";
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.smtp.host", host);
//        props.put("mail.smtp.user", from);
//        props.put("mail.smtp.password", password);
//        props.put("mail.smtp.port", "587");
//        props.put("mail.smtp.auth", "true");
//
//        Session session = Session.getDefaultInstance(props);
//        MimeMessage message = new MimeMessage(session);
//
//        try {
//            message.setFrom(new InternetAddress(from));
//            InternetAddress toAddress = new InternetAddress(mailto);
//            message.setSender(toAddress);
//            message.setSubject("Test Subject");
//
//            String msg = "This is my first email using JavaMailer";
//
//            MimeBodyPart mimeBodyPart = new MimeBodyPart();
//            mimeBodyPart.setContent(msg, "text/html");
//
//            Multipart multipart = new MimeMultipart();
//            multipart.addBodyPart(mimeBodyPart);
//
//            message.setContent(multipart);
//
//            Transport transport = session.getTransport("smtp");
//            transport.connect(host, from, password);
//            transport.sendMessage(message, message.getAllRecipients());
//            transport.close();
//        }
//        catch (AddressException ae) {
//            ae.printStackTrace();
//        }
//        catch (MessagingException me) {
//            me.printStackTrace();
//        }
    }
}
