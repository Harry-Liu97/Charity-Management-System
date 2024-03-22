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
@ApiModel(value="Reward对象", description="")
public class Reward implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "Primary Key")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "Prize Name")
    private String name;

    @ApiModelProperty(value = "Redeem required points")
    private Integer point;

    @ApiModelProperty(value = "Quantity of prizes")
    private Integer store;

    @ApiModelProperty(value = "Image")
    private String image;


}
