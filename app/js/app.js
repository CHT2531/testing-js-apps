function hasPassed(mark)
{
	if(mark>40){
		return true;
	}
	return false;
}

function processResult()
{
	var mark = parseInt(document.getElementById('mark').value);
	var feedback = document.getElementById('feedback');
	if(hasPassed(mark)){
		feedback.innerHTML="Well done you've passed";
	}else{
		feedback.innerHTML="Sorry not passed";
	}
}


var btn = document.getElementById("btn");
btn.addEventListener("click", processResult,false);