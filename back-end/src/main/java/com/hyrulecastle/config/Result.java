package com.hyrulecastle.config;

import lombok.Data;

/**
 * ClassName: Result
 * Package: com.hyrulecastle.config
 * Description:
 * Result data encapsulation
 *
 * @Author: Honggang Zhang
 * @Create: 22/6/2023 8:57 pm
 * @Version: 1.0
 */

@Data
public class Result {

    private int code;       // Code: 200/400
    private String msg;     // message: success/fail
    private Long total;     // Total number of records
    private Object data;    // Data

    private static Result result(int code, String msg, Long total, Object data) {
        Result res = new Result();
        res.setData(data);
        res.setMsg(msg);
        res.setCode(code);
        res.setTotal(total);
        return res;
    }

    // Operation failure
    public static Result fail(){
        return result(400, "fail", 0L, null);
    }

    // Operation success
    public static Result success(){
        return result(200, "success", 0L, null);
    }

    public static Result success(Object data){
        return result(200, "success", 0L, data);
    }

    public static Result success(Object data, Long total){
        return result(200, "success", total, data);
    }
}
