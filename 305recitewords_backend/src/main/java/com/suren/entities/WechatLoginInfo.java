package com.suren.entities;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @Description: 微信登录信息实体
 * @Author: 00suren
 * @Date: 2020/6/1 15:51
 **/
@Data
public class WechatLoginInfo {
    private String appid;
    private String secret;
    private String js_code;
    private String grant_type;
}
