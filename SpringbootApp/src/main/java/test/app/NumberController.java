package test.app;

import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/numbers")
    public void addNumber(@RequestBody Number number) {
        System.out.println("backend: " + number.getNumber());
        numRepo.save(number);
    }

    @DeleteMapping("/numbers/{id}")
    public void delete(@PathVariable Long id) {
        numRepo.deleteById(id);
    }
}
