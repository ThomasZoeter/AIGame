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

    @GetMapping("/numbers/{id}")
    public Number getNumber(@PathVariable Long id) {
        return numRepo.findById(id).orElseThrow();
    }

    @PostMapping("/numbers")
    public void addNumber(@RequestBody Number number) {
        numRepo.save(number);
    }

    @PutMapping("/numbers/{id}")
    public void updateNumber(@PathVariable Long id, @RequestBody Number numberBody) {
        Number numToChange = numRepo.findById(id).orElseThrow();
        numToChange.setNumber(numberBody.getNumber());
        numRepo.save(numToChange);
    }

    @DeleteMapping("/numbers/{id}")
    public void delete(@PathVariable Long id) {
        numRepo.deleteById(id);
    }
}
