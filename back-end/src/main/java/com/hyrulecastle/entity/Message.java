package com.hyrulecastle.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Honggang Zhang
 * @since 2023-07-17
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="Message对象", description="")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "Primary Key")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "Sender")
    private String sender;

    @ApiModelProperty(value = "Receiver")
    private String receiver;

    @ApiModelProperty(value = "Message Content")
    private String comment;

    @ApiModelProperty(value = "0: In progress, 1: Agree, 2: Reject")
    private Integer status;

    @ApiModelProperty(value = "Target")
    private String target;
}
