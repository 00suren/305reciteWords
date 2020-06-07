package com.suren.config;


import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.util.ArrayList;
import java.util.List;

/**
 * @Description: 配置httpMessageConverter使其支持text/html
 * @Author: 00suren
 * @Date: 2020/6/1 15:24
 **/
public class WxMappingJackson2HttpMessageConverter extends MappingJackson2HttpMessageConverter {

    public WxMappingJackson2HttpMessageConverter() {
        List<MediaType> mediaTypes = new ArrayList<>();
        mediaTypes.add(MediaType.TEXT_PLAIN);//加入text/plain类型的支持
        mediaTypes.add(MediaType.TEXT_HTML);//加入text/html类型的支持
        setSupportedMediaTypes(mediaTypes);// tag6
    }

}

