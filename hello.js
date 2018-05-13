function add(a, b) {
    if (Number(a).toString() == a && Number(b).toString() == b) return Number(a) + Number(b);
    var num1 = a.toString().split('');
    var num2 = b.toString().split('');
    var arr = [];
    // 往数组前部添加0使得两个数组长度一样
    while (num1.length > num2.length) {
        num2.unshift(0);
    }
    while (num2.length > num1.length) {
        num1.unshift(0);
    }
    // addFlag为进位标识， sum为各个位数之和
    var addFlag = 0;
    var sum = 0;
    for (var i = num1.length - 1; i >= 0; i--) {
        sum = Number(num1[i]) + Number(num2[i]) + addFlag;
        if (sum > 9) {
            addFlag = 1;
            sum = sum - 10;
        } else {
            addFlag = 0;
        }
        // 数组中推进sum，不断进位
        arr.unshift(sum);
        // 当最高位有进位时， 向前加一位
        if (i == 0 && addFlag == 1) {
            arr.unshift(1);
        }
    }
    return arr.join('');
}

function subtrate(a, b) {
    if (Number(a).toString() == a && Number(b).toString() == b) return Number(a) - Number(b);
    var num1 = a.toString().split('');
    var num2 = b.toString().split('');
    var arr = [];
    while (num1.length > num2.length) {
        num2.unshift(0);
    }
    while (num2.length > num1.length) {
        num1.unshift(0);
    }
    // subtrateFlag减法借位标识，differ为各位字符之差 
    var subtrateFlag = 0;
    var differ = 0;
    for (var i = num1.length - 1; i >= 0; i--) {
        differ = num1[i] - num2[i] - subtrateFlag;
        if (differ >= 0) {
            arr.unshift(differ);
            subtrateFlag = 0;
            // 当差值为负数， 且可以向前借位时
        } else if (i != 0) {
            differ = 10 + differ;
            arr.unshift(differ);
            subtrateFlag = 1
            // 否则，为最高位，无法借位时， 为负数，添加负号
        } else {
            differ = num2[i] - num1[i];
            arr.unshift(differ);
            arr.unshift('-');
        }
    }
    // 这里的步骤是去除前面的00000.。
    var answer = arr.join('');
    var reg = /[^0]/; //匹配非0开头的字符
    var start = answer.match(reg); //得到一个只含一个元素的数组
    console.log(start[0]);
    // 注意indexOf匹配为严格相等
    var num = arr.indexOf(Number(start[0]));
    answer = arr.slice(num).join('');
    return answer;
}

function mul(a, b) {
    var num1 = a.toString().split('');
    var num2 = b.toString().split('');
    var arr = [];
    var sum;
    var mul = 0;
    for (var i = num1.length - 1; i >= 0; i--) {
        for (var j = num2.length - 1; j >= 0; j--) {
            sum = Number(num1[i]) * Number(num2[j]) + mul;
            if (sum > 9) {
                // 两个for循环实现各个位数之间相乘，mul保存进位， sum为个位数
                mul = Math.floor(sum / 10);
                sum = sum % 10;
                arr.unshift(sum);
            } else {
                arr.unshift(sum);
                mul = 0;
            }
            // 用#分割，之后再相加
            if (mul > 0 && j == 0) {
                arr.unshift(mul);
                arr.unshift('#');
                mul = 0;
            } else if (j == 0) {
                arr.unshift('#');
            }
        }
    }
    arr = arr.join('').split('#');
    var total = 0
    for (var i = arr.length - 1; i >= 0; i--) {
        var j = arr.length - 1 - i;
        while (j) {
            arr[i] = arr[i] + '0';
            j--;
        }
        // 相加
        total = add(total, arr[i]);
    }
    return total;
}

function diverse(a, b) {
    var length = b.length;
    var aliquot = 0;
    var remainder = 0;
    var s = 0;
    var dividend;
    var result = [];
    if (a < b) return 0;
    if (a == b) return 1;
    // b为非大数， a为大数
    if (Number(b).toString() == b) {
        for (var i = 0; i < a.length; i++) {
            s = a.split('').slice(i, i + 1);
            var item = Number(a[i]);
            dividend = item + 10 * remainder;
            aliquot = Math.floor(dividend / b);

            if (aliquot > 0) {
                remainder = dividend - aliquot * b;
                result.push(aliquot);
            } else {
                remainder = dividend;
                result.push(0);
            }

        }

        var reg = /[^0]/;
        result = result.join('');
        var start = result.match(reg);
        var index = result.indexOf(start);
        var answer = {
            result: result.split('').slice(index).join(''),
            remainder: remainder
        }
        return answer;
        // 两个都是大数
    } else {
        let count = 0;
        while (subtrate(a, b) >= 0) {
            a = subtrate(a, b);
            count++;
        }
        // 返回商和余数
        var result = {
            count: count,
            remainder: a
        }
        return result;
    }

}