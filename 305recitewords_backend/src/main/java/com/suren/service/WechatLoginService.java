package com.suren.service;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.suren.config.ConfigBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name ="mm",url = "https://api.weixin.qq.com",configuration = ConfigBean.class)
public interface WechatLoginService {

    @GetMapping("/sns/jscode2session?appid={APPID}&secret={SECRET}&js_code={JSCODE}&grant_type={authorization_code}")
    @ResponseBody
    Object getLoginInfo(@PathVariable("APPID") String APPID,
                        @PathVariable("SECRET")String SECRET,
                        @PathVariable("JSCODE")String JSCODE,
                        @PathVariable("authorization_code")String authorization_code);
}
