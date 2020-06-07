package com.suren.controller;

import com.suren.entities.CommonResult;
import com.suren.entities.User;
import com.suren.service.AdduserInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description:
 * @Author: 00suren
 * @Date: 2020/6/7 11:03
 **/
@RestController
@Slf4j
public class AdduserInfoController {

    @Autowired
    AdduserInfoService adduserInfoService;

    @PostMapping("/user")
    public CommonResult<User> addUserInfo(@RequestBody User user){
        return adduserInfoService.addUserInfo(user);
    }
}
