package test.app;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MessageController {

    private final MessageRepository msgRepo;

    public MessageController(MessageRepository msgRepo) {
        this.msgRepo = msgRepo;
    }

    @GetMapping("/messages")
    public List<Message> getMessages() {
        return (List<Message>) msgRepo.findAll();
    }

    @GetMapping("/messages/{id}")
    public Message getMessage(@PathVariable Long id) {
        return msgRepo.findById(id).orElseThrow();
    }

    @PostMapping("/messages")
    public void addMessage(@RequestBody Message Message) {
        msgRepo.save(Message);
    }

    @PutMapping("/messages/{id}")
    public void updateMessage(@PathVariable Long id, @RequestBody Message messageBody) {
        Message msgToChange = msgRepo.findById(id).orElseThrow();
        msgToChange.setMessage(messageBody.getMessage());
        msgRepo.save(msgToChange);
    }

    @DeleteMapping("/messages/{id}")
    public void delete(@PathVariable Long id) {
        msgRepo.deleteById(id);
    }
}
