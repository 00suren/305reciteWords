package com.suren.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.omg.CosNaming.NamingContextExtPackage.StringNameHelper;

/**
 * @Description: 笔记实体
 * @Author: 00suren
 * @Date: 2020/5/22 17:36
 **/
@Data
public class Note {

    private Integer wordid;
    private String wxid;
    private Integer noteid;
    private String notecontent;

}
