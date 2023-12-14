//统一调用，提示正在开发中
function toDevelop(vueObject) {
    vueObject.$message('正在开发中,请耐心等待······');
}

//返回上一页
const goBack = () => {
    history.back();
}

/**
 * 通用请求封装
 * @param url
 * @param date
 * @returns {Promise<unknown>}
 */
function getPostData(url, data) {
    return new Promise(((resolve, reject) => {
        fetch(postUrl + url, {
            method: "post",
            headers: {
                'Content-type': 'application/json',
                'token': localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        }).then(json => {
            if (json.code == 0) {
                resolve(json.data);
            } else if (json.code == 401) {
                location.href = '../pages/index.html';
            } else {
                reject(json.msg);
            }
        })
    }))
}

/**
 * 获取跳转页面传递过来的参数
 * variable 为想要获取到的参数 与上一个页面相同
 * 返回值为相应的参数值
 * 如果传递的参数带有中文 需要使用decodeURI方法获取
 * */
function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}

/**
 * 获取时间戳
 * @param time
 * @returns {number}
 */
function getTimestamp(time) {
    return (new Date(time)).getTime();
}

