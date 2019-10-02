var personArr = [
    { name: '王港', src: './logo1.jpg', des: '颈椎不好', sex: 'm' },
    { name: '刘莹', src: './logo2.jpg', des: '我是谁', sex: 'f' },
    { name: '王秀莹', src: './logo3.jpg', des: '我很好看', sex: 'f' },
    { name: '刘金累', src: './logo4.jpg', des: '你没见过陌生的脸', sex: 'm' },
    { name: '刘飞翔', src: './logo1.jpg', des: '瓜皮刘', sex: 'm' }
];

var oUl = document.getElementsByTagName('ul')[0];
var oSearch = document.getElementsByClassName('search-box')[0];
var Op = document.getElementsByTagName('p')[0];
// 渲染传入的arr
function renderList(arr) {
    var str = '';
    arr.forEach(function (ele, index) {
        str += '<li>\
                    <img src='+ ele.src + '>\
                    <p class="username">'+ ele.name + '</p>\
                    <p class="des">'+ ele.des + '</p>\
                </li>';
    });
    oUl.innerHTML = str;
}
renderList(personArr);




var state = {
    text: '',
    sex: 'a',
}

// var aa = 'abc';
// console.log(aa.indexOf('b'))  // 搜索字符串中是否含有这个字母 如果有就把字母的位置返回 没有返回-1
oSearch.oninput = function () {
    state.text = this.value;
    renderList(lastFilterFunc(personArr));
}
// 根据name刷选数组
function filiterText(text, arr) {
    return arr.filter(function (ele, index) {
        // if(ele.name.indexOf(text) != -1) {
        //     return true;
        // }else{
        //     return false;
        // }
        return ele.name.indexOf(text) != -1 ? true : false;
    })
}

Op.addEventListener('click', function (e) {
    console.log(e.target.nodeName);
    if (e.target.nodeName == 'SPAN') {
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        state.sex = e.target.getAttribute('sex');
        renderList(lastFilterFunc(personArr));
    }
})
// 根据性别刷选
function filiterSex(sex, arr) {
    if (sex == 'a') {
        return arr;
    } else {
        return arr.filter(function (ele, index) {
            // if(ele.sex == sex) {
            //     return true;
            // }
            return ele.sex == sex;
        })
    }
}




// 合并刷选条件
function unionFilterFunc(obj) {
    return function (arr) {
        var lastArr = arr;
        for (var prop in obj) {
            lastArr = obj[prop](state[prop], lastArr);
        }
        return lastArr;
    }
}
var lastFilterFunc = unionFilterFunc({ text: filiterText, sex: filiterSex });
