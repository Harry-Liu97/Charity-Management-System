package com.hyrulecastle.controller;


import com.hyrulecastle.config.Result;
import com.hyrulecastle.entity.Info;
import com.hyrulecastle.entity.Point;
import com.hyrulecastle.entity.User;
import com.hyrulecastle.service.InfoService;
import com.hyrulecastle.service.PointService;
import com.hyrulecastle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ClassName: UserController
 * Package: com.hyrulecastle.controller
 * Description:
 * User Controller
 *
 * @author Honggang Zhang
 * @since 2023-06-26
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private InfoService infoService;

    @Autowired
    private PointService pointService;

    /**
     * User login.
     * @param user
     * @return Result
     */
    @PostMapping("/login")
    public Result login(@RequestBody User user) {
        List list = userService.lambdaQuery().eq(User::getNo, user.getNo()).eq(User::getPassword, user.getPassword()).list();
        return list.size() > 0 ? Result.success(list.get(0)) : Result.fail();
    }

    /**
     * User register
     * @param user
     * @return Result
     */
    @PostMapping("/register")
    public Result register(@RequestBody User user) {
        Info info = new Info();
        info.setNo(user.getNo());
        info.setRole(user.getRole());
        Point point = new Point();
        point.setNo(user.getNo());
        point.setRole(user.getRole());
        point.setSuccess(0);
        point.setPoints(0);
        if (userService.save(user)) {
            return (infoService.save(info) && pointService.save(point)) ? Result.success() : Result.fail();
        } else {
            return Result.fail();
        }
    }

    /**
     * Query user based on user account.
     * @param no: no in user table
     * @return
     */
    @GetMapping("/findByNo")
    public Result findByNo(@RequestParam String no) {
        List<User> list = userService.lambdaQuery().eq(User::getNo, no).list();
        return list.size() > 0 ? Result.success(list) : Result.fail();
    }

    /**
     * Delete user
     * @param uid: id in user table
     * @param iid: id in info table
     * @param pid: id in point table
     * @return Result
     */
    @GetMapping("/del")
    public Result del(@RequestParam String uid, String iid, String pid) {
        if (userService.removeById(uid)) {
            return (infoService.removeById(iid) && pointService.removeById(pid)) ? Result.success() : Result.fail();
        } else {
            return Result.fail();
        }
    }

    /**
     * Update user based on id.
     * @param user
     * @return Result
     */
    @PostMapping("/update")
    public Result update(@RequestBody User user) {
        return userService.updateById(user) ? Result.success() : Result.fail();
    }
}
