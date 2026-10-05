plugins {
    war
    id("org.openjfx.javafxplugin") version "0.1.0"
    id("org.springframework.boot") version "2.7.10"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
    kotlin("jvm")
}

// We all have Java 11 installed on our computers at Keylane, so we can use this language version.
java {
}

// Use repositories that are also used by the outside world (Keylane Artifactory isn't configured right now).
repositories {
    gradlePluginPortal()
    mavenCentral()
}

dependencies {
    // HINT: you need this dependency. Don't worry about why it is not added as implementation but as compile only.
    compileOnly("javax.servlet:javax.servlet-api:4.0.1")
    testImplementation("javax.servlet:javax.servlet-api:4.0.1")
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("com.rabbitmq:amqp-client")

    implementation("com.h2database:h2:2.1.214")
    implementation("javax.servlet:jstl:1.2")
    implementation("org.json:json:20240303")
    implementation("com.google.code.gson:gson:2.11.0")
    implementation(kotlin("stdlib-jdk8"))
    implementation(kotlin("script-runtime"))

}

// Required to make JUnit Jupiter work.
tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(21)
}