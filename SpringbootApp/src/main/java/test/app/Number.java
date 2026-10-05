package test.app;

import org.jetbrains.annotations.NotNull;

import javax.persistence.*;

@Entity
@Table
public class Number {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String number;

    public Number( String number) {
        this.number = number;
    }

    public Number() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    @NotNull
    public String getNumber() {
        return number;
    }

    public String toString() {
        return this.id + ", " + this.number;
    }
}
