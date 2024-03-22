package com.hyrulecastle.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Honggang Zhang
 * @since 2023-07-24
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="Record对象", description="")
public class Record implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "Primary Key")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "Account Number")
    private String no;

    @ApiModelProperty(value = "Prize Name")
    private String prize;

    @ApiModelProperty(value = "Quantity")
    private Integer count;

    @ApiModelProperty(value = "Operating time")
    private LocalDateTime time;


}
