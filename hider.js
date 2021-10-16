window.addEventListener('DOMContentLoaded',function(){
    let status_page = window.sessionStorage.getItem('status');
    let html,body;
    html = document.querySelector('html');
    if(status_page == '1'){
        html.style.opacity    = '1';
        html.style.visibility = 'visible';
    }else{
        html.style.opacity    = '0';
        html.style.visibility = 'hidden';
        reqcheck('deny');
    }
});
            
window.addEventListener("keydown", function(event) {

    if (event.keyCode == 13 & event.shiftKey) {
        if(window.sessionStorage.getItem('status') != '1'){
            if(document.querySelector('.pwd-require-box') == null){
                document.querySelector('body').style.background = 'rgba(0,0,0,.6)';
                var div = document.createElement('div');
                div.className      = 'pwd-require-box';
                div.style.position = 'absolute';
                div.style.top = '50%';
                div.style.left = '50%';
                div.style.transform = 'translate(-50%,-50%)';
                div.style.background = '#fff';
                div.style.textAlign = 'center';
                div.style.fontFamily = 'montserrat';
                div.style.borderRadius = '10px';
                div.style.padding = '15px';
                div.style.boxSizing = 'border-box';
                div.style.maxWidth = '300px';
                div.style.width = '300px';
                div.style.boxShadow = '0 25px 25px -30px #000';
        
                var h4 = document.createElement('h4');
                h4.style.paddingBottom = '10px';
                h4.style.borderBottom = '1px solid #eee';
                h4.innerText = 'Password required';
                var form = document.createElement('form');
                form.method = 'post';
                form.setAttribute('onsubmit','event.preventDefault();');
        
                
                var input = document.createElement('input');
                input.type = 'password';
                input.style.width = '230px';
                input.style.height = '30px';
        
                form.appendChild(input);
        
        
                var button = document.createElement('button');
                button.setAttribute('onclick','pwd_require();');
                button.style.marginTop = '10px';
                button.style.height = '45px';
                button.style.fontWeight = 'bold';
                button.style.background = 'linear-gradient(to left,#5286f7,#7aa4ff)';
                button.style.color = '#fff';
                button.style.border = 'none';
                button.style.borderRadius = '10px';
                button.style.width = '230px';
                button.style.cursor = 'pointer';
                button.innerText = 'Enter';
        
                form.appendChild(button);
        
                var span = document.createElement('span');
                span.style.marginTop = '10px';
                span.style.fontSize = '13px';
                span.style.display = 'none';
                span.style.color = '#777';
                div.appendChild(h4);
                div.appendChild(form);
                div.appendChild(span);
                
                document.body.appendChild(div);
        
            }else{
                let x = document.querySelector('.pwd-require-box');
                x.parentNode.removeChild(x);
                document.body.style.removeProperty('background');
            }
        }
      
        
    }
                
});

function reqcheck(status,extra){
    let postf = new FormData();
    
 
	let post_path = get_current_path();
	postf.append('status',status);
	postf.append('full_src',post_path[1]);
    if(extra !== undefined){
        postf.append('extra',extra);
    }
	
    let xhr = new XMLHttpRequest();
    xhr.open('post',post_path[0]+'hidemypage.php',true);
    xhr.responseType = 'json';
    what = xhr.onload = function(){
        if(xhr.readyState == 4){
            let jp = JSON.parse(JSON.stringify(this.response));
            if(jp.status == 'deny'){
                document.write(jp.html);
            }else if(jp.status == 'invalid_pwd'){
                let span = document.querySelector('.pwd-require-box span');
                span.style.display = 'block';
                span.innerText     = 'Invalid password!';
            }else if(jp.status == 'logged_in'){
                window.sessionStorage.setItem('status',1);
                window.location.reload();
            }
        }
    }
    xhr.send(postf);
}
function get_current_path(){
	let script   = document.getElementById('hidemypage');
	let path     = script.getAttribute('src');
	let fullpath = path;
	let realpath = '';
	if(path.indexOf('/') !== -1){
		let pathArr = path.split('/');
		pathArr.forEach(function(el){
			if(el.indexOf('.js') === -1){
				realpath += el+'/';
			}
		});
		
		return [realpath,fullpath];
    }else{
        return ['',fullpath];
    }
}
function pwd_require(){
    let div_box = document.querySelector('.pwd-require-box');
    let pwd     = div_box.querySelector('input');
    if(pwd.value !== ""){
        login = reqcheck('login',pwd.value);

    }else{
        div_box.querySelector('span').innerText = 'Enter a password!';
        div_box.querySelector('span').style.display = 'block';
    }
}