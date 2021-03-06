package com.suren.entities;

import lombok.Data;

/**
 * @Description: 单词实体类
 * @Author: 00suren
 * @Date: 2020/5/15 21:18
 **/
@Data
public class Word {

    private String english;

    private Integer id;

    private String sent;

    private Integer level;

    private String chinese;

}
