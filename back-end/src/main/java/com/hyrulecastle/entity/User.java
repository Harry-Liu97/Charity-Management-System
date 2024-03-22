package com.hyrulecastle.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.util.List;

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
@ApiModel(value="User Object", description="")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "Primary Key")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "Account Number")
    private String no;

    @ApiModelProperty(value = "Password")
    private String password;

    @ApiModelProperty(value = "0: Admin, 1: Charity, 2: Sponsor")
    private Integer role;
}
