package com.hyrulecastle.mapper;

import com.hyrulecastle.entity.Point;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author Honggang Zhang
 * @since 2023-07-24
 */

@Mapper
public interface PointMapper extends BaseMapper<Point> {
    List<Point> rank();

}
