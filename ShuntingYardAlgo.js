let TYPE_OP = 'o';
let TYPE_CONST ='c';
let TYPE_FUNC = 'f';
let TYPE_ELSE = 'e';
let TYPE_LEFTPAREN = '(';
let TYPE_RIGHTPAREN = ')';


function genFunc(eval, type = TYPE_FUNC, prec = 0, left=true){
    return{
        eval:eval,
        t:type,
        prec:prec,
        left:left
    };
}

function genNode(val, func = true, unary = true){
    return{
        val: val,
        func: func,
        unary: unary,
        right: null,
        left: null,
        name: ''
    };
}

let constants = {
    pi:Math.PI,
    e: Math.E
};

let constant_names = Object.keys(constants);

let unary_functions = {
    sin:genFunc((x) => Math.sin(x)),
    cos:genFunc((x) => Math.cos(x)),
    tan:genFunc((x) => Math.tan(x)),
    ln:genFunc((x) => Math.log(x)),
    log:genFunc((x) => Math.log10(x)),
    sqrt:genFunc((x) => Math.sqrt(x))
};

let binary_functions = {
    '+':genFunc((x,y) => x + y, TYPE_OP, 2),
    '-':genFunc((x,y) => x - y, TYPE_OP, 2),
    '*':genFunc((x,y) => x * y, TYPE_OP, 3),
    '/':genFunc((x,y) => x / y, TYPE_OP, 3),
    '%':genFunc((x,y) => x % y, TYPE_OP, 3),
    '^':genFunc((x,y) => Math.pow(x,y),TYPE_OP,4,false),
    max:genFunc((x,y) => Math.max(x,y)),
    min:genFunc((x,y) => Math.min(x,y))
};

let functions = Object.keys(unary_functions).concat(Object.keys(binary_functions));
let operators = '+-*/%^';
let left_brackets = '({[';
let right_brackets = ')}]';

function isNumber(c){
    if (typeof c === 'number') {
        return true;
    }
        return !isNaN(c) || constant_names.includes(c) || c === '.';
}

function getVal(c){
    if (typeof c === 'number') {
        return c;
    } else if(constant_names.includes(c)){
        return constants[c];
    } else{
        return parseFloat(c);
    }
}


function isFunc(c){
    return functions.includes(c);
}

function findElement(i,eqn,list){
    for(var j=0,len=list.length; j<len;j++){
        var n = list[j].length;
        if(eqn.substring(i,i+n)===list[j]){
            return [true,list[j],n];
        }
    }
    return[false,'',1];
}

function getPrecedence(op){
    if (Object.keys(binary_functions).includes(op)) {
        return binary_functions[op].prec;
    }
    return 0; //default value
}
function isLeftAssoc(op){
    if(Object.keys(binary_functions).includes(op)){
        return binary_functions[op].left;
    } 
    return true; //
}

function RPN(eqn){
    let queue = []; //for digits to be operated 
    let stack = []; //for operators

    let object = '';
    let type ='';

    for (var i = 0, eq_len = eqn.length; i < eq_len; i++) {
        let t = eqn[i];

        if (t === ' ' || t === ',') {
            continue;//skip spaces and commas
        }
        // determine what token is
        if (isNumber(t)) {
            type = TYPE_CONST;
            object = t;
            if (i<eq_len -1) {
                //get entire number
                while (isNumber(eqn[i+1])) {
                    object += eqn[i+1];
                    i++;
                    if (i>=eq_len -1) {
                        break;
                    }
                }
            }
            object = getVal(object);
        } else {
            let data = findElement(i, eqn, functions);
            let found = data[0];
            object = data[1];
            let n = data[2];
            if (found) {
                type = operators.includes(object) ? TYPE_OP : TYPE_FUNC;
            }else{
                data = findElement(i,eqn,constant_names);
                found = data[0];
                object = data[1];
                n = data[2];
                if (found) {
                    type = TYPE_CONST;
                } else{
                    if (left_brackets.includes(t)) {
                        type = TYPE_LEFTPAREN;
                    } else if(right_brackets.includes(t)){
                        type = TYPE_RIGHTPAREN;
                    } else{
                        type = TYPE_ELSE;
                    }
                }
            }
            i+= n-1;
        }
        //do something with token
        let last_stackElement = stack[stack.length-1];
        switch (type) {
            case TYPE_CONST:
                queue.push(object);
                break;
        
            case TYPE_FUNC:
                stack.push(object);
                break;

            case TYPE_OP:
                if (stack.length != 0) {
                    //weird conditions
                    while(
                        ((functions.includes(last_stackElement)&&!operators.includes(last_stackElement)) || getPrecedence(last_stackElement) > getPrecedence(object)||(getPrecedence(last_stackElement) === getPrecedence(object) && isLeftAssoc(last_stackElement))) && !left_brackets.includes(last_stackElement)
                    ){
                        queue.push(stack.pop());
                        if(stack.length=== 0){
                            break;
                        }
                        last_stackElement = stack[stack.length-1];
                    }
                }
                stack.push(object);
                break;
            case TYPE_LEFTPAREN:
                stack.push('(');
                break;
            case TYPE_RIGHTPAREN:
                while (last_stackElement !== '(') {
                    queue.push(stack.pop()); //only use ')' when valid
                    last_stackElement = stack[stack.length-1];
                }
                stack.pop();
                break;
            default:
                return null;
        }
    }
    while (stack.length > 0) {
        queue.push(stack.pop());
    }
    return queue;
}

function parse(rpn) {
    let stack = [];
    Array.from(rpn).forEach((t) => {
        let tree = null;
        if (isNumber(t)) {
            tree = genNode(t, false);
        } else{
            if (Object.keys(binary_functions).includes(t)) {
                tree = genNode(binary_functions[t],true,false);
                
                let a = stack.pop();
                let b = stack.pop();

                if (typeof a === 'number') {
                    tree.right = genNode(a,false);

                } else{
                    tree.right = a;
                }
                if (typeof b === 'number') {
                    tree.left = genNode(b,false);

                } else{
                    tree.left = b;
                }
            } else if (Object.keys(unary_functions).includes(t)){
                tree = genNode(unary_functions[t]);

                a = stack.pop();

                if (typeof a === 'number') {
                    tree.left = genNode(a, false);
                } else{
                    tree.left = a;
                }
            }
        }
        tree.name = t;
        stack.push(tree);
    });
    return stack.pop();
}

function eval(tree) {
    if(tree.func){
        if (tree.unary) {
            return tree.val.eval(eval(tree.left));
        }else{
            return tree.val.eval(eval(tree.left), eval(tree.right));
        }
    } else{
        if (constant_names.includes(tree.val)) {
            return constants[tree.val];
        } else{
            return tree.val;
        }
    }
}
function toggleSign() {
    let input = document.getElementById('input');
    let currentValue = input.value;
    let cursorPos = input.selectionStart; // Get cursor position
    let beforeCursor = currentValue.substring(0, cursorPos);
    let afterCursor = currentValue.substring(cursorPos);
    
    // Regular expression to find the number at the cursor position
    let match = /(-?\d+(\.\d*)?)(?!\d|\.)/.exec(beforeCursor.split(/[\+\-\*\/\(\)\s]/).pop());
    
    if (match) {
        let number = match[0];
        let signToggled = number.startsWith('-') ? number.substring(1) : '-' + number;
        let updatedBeforeCursor = beforeCursor.slice(0, beforeCursor.lastIndexOf(number)) + signToggled;
        
        // Update the input value with the sign toggled number
        input.value = updatedBeforeCursor + afterCursor;
        input.setSelectionRange(cursorPos, cursorPos); // Restore cursor position
    }
}

function evaluateExpression(){
    // let reset = '';
    document.querySelector('#display').value = ''; //reset result display for new input
    let eqn = document.querySelector('#input').value;
    let rpn = RPN(eqn);
    var val = 'invalid input';
    if (rpn) {
        let tree = parse(rpn);
        val = eval(tree);
    }
    document.querySelector('#display').value = val;   
}

// document.querySelector('#btn').addEventListener('click', (e) => {
//     //e.preventDefault(); 
//     let eqn = document.querySelector('#input').value;
//     let rpn = RPN(eqn);
//     var val = 'invalid input';

//     if(rpn){
//     let tree = parse(rpn);
//     val = eval(tree);
//     console.log(rpn);
//     console.log(tree);
//     console.log(val);
//     }
//     document.querySelector('#display').value = val;   
// });

