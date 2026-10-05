package test.app;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NumberController {

    private final NumberRepository numRepo;

    public NumberController(NumberRepository numRepo) {
        this.numRepo = numRepo;
    }

    @GetMapping("/numbers")
    public List<Number> getNumbers() {
        return (List<Number>) numRepo.findAll();
    }
}
