package com.k8s.deploymenttest.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HelloWorld {

    @GetMapping("login")
    public String login(){
        return "login";
    }
}
