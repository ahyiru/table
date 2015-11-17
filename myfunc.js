/* myfunc */
$(function(){

	$.get('data.json').then(function(data){
		mytable(data.myData);
	},function(err){
		console.log(err);
	});

	var mytable=function(d){
		var thv=''
		var trl=d.length,trv='';
		for(var i=0;i<trl;i++){
			var td=ota(d[i])[0],tdl=td.length,tdv='';
			for(var j=0;j<tdl;j++){
				if(i==0){
					thv+='<th>'+ota(d[i])[0][j]+'</th>';
				}
				tdv+='<td>'+ota(d[i])[1][j]+'</td>'
			}
			trv+='<tr>'+tdv+'</tr>'
		}

		var search='<div id="mysch"><input type="text" placeholder="search..."></div>'
		var tab=search+'<table class="table table-striped table-hover table-bordered"><thead><tr>'+thv+'</tr></thead><tbody>'+trv+'</tbody></table>';
		$('.mytable').append(tab);
		mysch();
	}

	var ota=function(obj){
		var keys=[],values=[];
		for(var i in obj){
			keys.push(i);
			values.push(obj[i]);
		}
		return [keys,values];
	}

	var myfilter=function(val,str){
		var reg=new RegExp(val,'i');
		return reg.test(str);
	}

	var mysch=function(){
		$('#mysch>input').on('input',function(){
			var that=$(this);
			setTimeout(tt,300);
			function tt(){
				var val=$.trim(that.val());
				$('.mytable tbody>tr').each(function(){
					var f=true;
					$(this).find('>td').each(function(){
						var str=$.trim($(this).text());
						if(myfilter(val,str)){
							f=true;
							return false;
						}
						else{
							f=false;
						}
					})
					if(f) $(this).show();
					else $(this).hide();
				})
			}
		})
	}
})