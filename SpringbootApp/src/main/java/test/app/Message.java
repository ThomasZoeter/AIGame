package test.app;

import org.jetbrains.annotations.NotNull;

import javax.persistence.*;

@Entity
@Table
public class Message {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String message;

    public Message( String Message) {
        this.message = Message;
    }

    public Message() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @NotNull
    public String getMessage() {
        return message;
    }

    public String toString() {
        return this.id + ", " + this.message;
    }
}
