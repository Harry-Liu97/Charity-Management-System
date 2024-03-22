package com.hyrulecastle.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Honggang Zhang
 * @since 2023-06-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value = "Info Object", description = "")
public class Info implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "Primary Key")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "Account Number")
    private String no;

    @ApiModelProperty(value = "Name")
    private String name;

    @ApiModelProperty(value = "Phone Number")
    private String phone;

    @ApiModelProperty(value = "Email")
    private String email;

    @ApiModelProperty(value = "Description")
    private String description;

    @ApiModelProperty(value = "0: Admin, 1: Charity, 2: Sponsor")
    private Integer role;

    @ApiModelProperty(value = "Provides or Needs")
    private String target;

    @ApiModelProperty(value = "Image")
    private String image;

}
