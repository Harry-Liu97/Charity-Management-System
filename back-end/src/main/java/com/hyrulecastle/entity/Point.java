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
 * @since 2023-07-24
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="Point对象", description="")
public class Point implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "Primary Key")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "Account Number")
    private String no;

    @ApiModelProperty(value = "0: Admin, 1: Charity, 2: Sponsor")
    private Integer role;

    @ApiModelProperty(value = "The number of successful connections")
    private Integer success;

    @ApiModelProperty(value = "Points")
    private Integer points;


}
