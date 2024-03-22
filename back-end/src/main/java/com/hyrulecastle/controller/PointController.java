package com.hyrulecastle.controller;


import com.hyrulecastle.config.Result;
import com.hyrulecastle.entity.Point;
import com.hyrulecastle.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ClassName: PointController
 * Package: com.hyrulecastle.controller
 * Description:
 * Point Controller
 *
 * @author Honggang Zhang
 * @since 2023-07-24
 */
@RestController
@RequestMapping("/point")
public class PointController {
    @Autowired
    private PointService pointService;

    /**
     * Query by user account
     * @param no
     * @return Result
     */
    @GetMapping("/findByNo")
    public Result findByNo(@RequestParam String no) {
        List<Point> list = pointService.lambdaQuery().eq(Point::getNo, no).list();
        return list.size() > 0 ? Result.success(list.get(0)) : Result.fail();
    }

    /**
     * Update point based on id
     * @param point
     * @return Result
     */
    @PostMapping("/update")
    public Result update(@RequestBody Point point) {
        return pointService.updateById(point) ? Result.success() : Result.fail();
    }

    /**
     * The top 10 are obtained based on the number of successful connections
     * @return Result
     */
    @GetMapping("/rank")
    public Result rank() {
        return Result.success(pointService.rank());
    }

    /**
     * List all points.
     * @return
     */
    @GetMapping("/list")
    public Result list(){
        return Result.success(pointService.list());
    }
}
