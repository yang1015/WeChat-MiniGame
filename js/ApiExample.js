


export class ApiExample{

    httpExample() {
        wx.request({
            url: 'https://www.baidu.com',
            method: 'GET',
            success: function (response) {
                console.log(response);
                //这里可以根据服务器的指示来做相应的动作
            }
        });
    }
}
