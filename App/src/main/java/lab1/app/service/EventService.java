package lab1.app.service;


import lab1.app.model.Event;
import lab1.app.model.User;
import lab1.app.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

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
            //sendEmail(id, guestId);
            String[] to = {user.getEmail()};
            //sendFromGMail("matias.miodosky@ing.austral.edu.ar", "marianesuncapo123", to, "Invitacion", "bla bla");
            sendSimpleMessage(user.getEmail(), "hola", "hola");
        }
        else {
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

//    private void sendEmail(Long id, Long userToId) {
//        String from = "iprevia.no.reply@gmail.com";
//        String password = "Qwerty12.";
//        String mailto = userService.getUserById(userToId).getEmail();
//        Properties props = System.getProperties();
//        String host = "smtp.gmail.com";
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.smtp.host", host);
//        props.put("mail.smtp.user", from);
//        props.put("mail.smtp.password", password);
//        props.put("mail.smtp.port", "465");
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
//    }


}
