package com.hyrulecastle.service;

import com.hyrulecastle.entity.Point;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @author Honggang Zhang
 * @since 2023-07-24
 */
public interface PointService extends IService<Point> {

    List<Point> rank();
}
