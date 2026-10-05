package test.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner init(NumberRepository numRepo) {
        return args -> {
            Stream.of("Waa", "Woo").forEach(number -> {
                Number num = new Number(number);
                numRepo.save(num);
            });
            numRepo.findAll().forEach(System.out::println);
        };
    }
}