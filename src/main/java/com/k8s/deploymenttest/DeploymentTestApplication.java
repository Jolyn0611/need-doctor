package com.k8s.deploymenttest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class DeploymentTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(DeploymentTestApplication.class, args);
    }

    @GetMapping("/hello")
    public  String hello(){
        return  "Hello,World";
    }
}
