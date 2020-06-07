package com.suren.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.suren.entities.WechatLoginInfo;
import com.suren.service.WechatLoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Description: 微信登录，需要使用feign调用微信的接口获取openid
 * @Author: 00suren
 * @Date: 2020/6/1 12:18
 **/
@RestController
@Slf4j
public class WeChatLoginController {

    @Autowired
    private WechatLoginService wechatLoginService;

    @PostMapping("/login")
    public Object getLoginInfo(@RequestBody WechatLoginInfo wechatLoginInfo){
        Object jsonpObject =  wechatLoginService.getLoginInfo(wechatLoginInfo.getAppid(),wechatLoginInfo.getSecret(),wechatLoginInfo.getJs_code(),wechatLoginInfo.getGrant_type());

        return jsonpObject;
    }
}
