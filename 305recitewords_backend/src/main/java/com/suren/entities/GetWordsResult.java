package com.suren.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Bean;

/**
 * @Description: 返回给前端使用的单词实体数据
 * @Author: 00suren
 * @Date: 2020/5/15 21:18
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetWordsResult {

    private int code;

    private String message;

    private Word word;
}
